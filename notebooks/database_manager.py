import logging
import json
import os
from dotenv import load_dotenv
from llama_index.core import VectorStoreIndex, StorageContext, Document
from llama_index.embeddings.azure_openai import AzureOpenAIEmbedding
from llama_index.core import Settings
import qdrant_client
from qdrant_client.http.models import PointStruct, Filter, FieldCondition, Match
from llama_index.vector_stores.qdrant import QdrantVectorStore
from data_processor import llm
from datetime import datetime
from text_generator import TextGenerator

import numpy as np

from settings import settings

class IndexBuilder:
    def __init__(
        self,
        json_file_path=None,
        collection_name="news_feed",
        embedding_engine="text-embedding-3-large",
        api_version="2024-08-01-preview",
    ):
        load_dotenv()
        self.API_KEY = settings.AZURE_OPENAI_API_KEY
        self.AZURE_ENDPOINT = settings.AZURE_OPENAI_ENDPOINT
        self.QDRANT_HOST = settings.QDRANT_HOST
        self.QDRANT_PORT = settings.QDRANT_PORT
        self.QDRANT_API_KEY = settings.QDRANT_PORT

        self.json_file_path = json_file_path
        self.collection_name = collection_name
        self.embedding_engine = embedding_engine
        self.api_version = api_version

        self.embed_model = None
        self.client = None
        self.vector_store = None
        self.documents = []
        self.storage_context = None
        self.index = None

        self.initialize_embedding_model()
        self.initialize_qdrant_client()
        self.initialize_vector_store()

    def compute_similarity(self, embedding1, embedding2):
        embedding1 = np.array(embedding1)
        embedding2 = np.array(embedding2)
        dot_product = np.dot(embedding1, embedding2)
        norm1 = np.linalg.norm(embedding1)
        norm2 = np.linalg.norm(embedding2)
        if norm1 == 0 or norm2 == 0:
            return 0.0
        similarity = dot_product / (norm1 * norm2)
        return similarity

    def initialize_embedding_model(self):
        self.embed_model = AzureOpenAIEmbedding(
            engine=self.embedding_engine,
            api_key=self.API_KEY,
            azure_endpoint=self.AZURE_ENDPOINT,
            api_version=self.api_version,
        )
        Settings.embed_model = self.embed_model

    def initialize_qdrant_client(self):
        self.client = qdrant_client.QdrantClient(
            url=self.QDRANT_HOST,
            port=self.QDRANT_PORT,
            api_key=self.QDRANT_API_KEY,
        )

    def initialize_vector_store(self):
        self.vector_store = QdrantVectorStore(
            client=self.client, collection_name=self.collection_name
        )

    def load_data(self):
        with open(self.json_file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        if not isinstance(data, list):
            raise ValueError("JSON data must be a list of objects.")
        return data

    def process_documents(self, data):
        for idx, obj in enumerate(data):
            summary = obj.get("extracted_data", {}).get("summary", "")
            if not summary:
                print(
                    f"Object at index {idx} is missing 'extracted_data.summary'. Skipping."
                )
                continue

            doc = Document(
                text=summary,
                metadata={
                    "id": idx,
                    "full_object": obj,
                },
                excluded_llm_metadata_keys=["full_object", "id"],
                excluded_embed_metadata_keys=["full_object", "id"],
            )
            self.documents.append(doc)

        print(f"Processed {len(self.documents)} documents from JSON.")

    def build_storage_context(self):
        self.storage_context = StorageContext.from_defaults(
            vector_store=self.vector_store
        )

    def build_index(self):
        self.index = VectorStoreIndex.from_documents(
            self.documents, storage_context=self.storage_context
        )

    def get_retriever_engine(self, llm, similarity_top_k=20):
        retrieve_engine = self.index.as_retriever(
            llm=llm, similarity_top_k=similarity_top_k
        )
        return retrieve_engine


    def find_electric_cars_articles(self, n):
        # Get the embedding for the query "Electric car"
        query_embedding = self.embed_model.get_text_embedding("Electric car")

        # Search the vector store for the top n articles closest to the query_embedding
        search_results = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_embedding,
            limit=n
        )

        # Check if any results are returned
        if not search_results:
            raise ValueError("No articles related to 'Electric car' found.")

        return search_results


    def get_article_embedding(self, article_point):
        payload = article_point.payload
        if 'full_object' in payload:
            extracted_data = payload['full_object']['extracted_data']
            summary = extracted_data.get('summary')

            if not summary:
                raise ValueError("The article does not contain 'extracted_data.summary'.")

            article_embedding = self.embed_model.get_text_embedding(summary)

            return article_embedding, summary
        return None, None

    def find_nearest_documents(self, article_embedding, top_k=5):
        search_results = self.client.search(
            collection_name=self.collection_name,
            query_vector=article_embedding,
            limit=top_k
        )

        return search_results


    def remove_duplicate_points_by_title(self):
        title_to_point_id = {}
        points_to_delete = []

        all_points = self.client.scroll(
            collection_name=self.collection_name,
            scroll_filter=None,
            limit=1000
        )

        for point in all_points[0]:
            payload = point.payload
            full_object = payload.get('full_object')
            title = full_object.get('title') if full_object else None

            # If 'full_object' or 'title' is missing, mark the point for deletion
            if not full_object or title is None:
                points_to_delete.append(point.id)
                continue

            # Check for duplicates based on 'title'
            if title in title_to_point_id:
                points_to_delete.append(point.id)
            else:
                title_to_point_id[title] = point.id

        if points_to_delete:
            self.client.delete(
                collection_name=self.collection_name,
                points_selector=qdrant_client.http.models.PointIdsList(
                    points=points_to_delete
                )
            )
            print(
                f"Removed {len(points_to_delete)} points (including duplicates and invalid entries) from the vector store.")
        else:
            print("No duplicate or invalid points found in the vector store.")


    def find_top_m_popular_articles(self, n, k, m, electric_car_weight=1.0):
        electric_car_articles = self.find_electric_cars_articles(n)
        if not electric_car_articles:
            raise ValueError("No articles related to 'Electric car' found.")

        # Get the embedding for "Electric car" once to reuse
        electric_car_embedding = self.embed_model.get_text_embedding("Electric car")

        article_scores = []

        for idx, article_point in enumerate(electric_car_articles):
            try:
                article_embedding, summary = self.get_article_embedding(article_point)
            except ValueError as e:
                print(f"Skipping article at index {idx} due to error: {e}")
                continue

            if article_embedding is None:
                print(f"Article at index {idx} has no embedding. Skipping.")
                continue

            # Find nearest documents to the article
            search_results = self.find_nearest_documents(article_embedding, top_k=k)

            # Sum similarities to nearest neighbors
            sum_similarity = sum(hit.score for hit in search_results if hasattr(hit, 'score'))

            # Compute similarity to "Electric car"
            similarity_to_electric_car = self.compute_similarity(article_embedding, electric_car_embedding)

            # Compute total score with controllable weight
            total_score = sum_similarity + electric_car_weight * similarity_to_electric_car

            print(f"Article ID {article_point.id} - Sum of similarity scores: {sum_similarity}, "
                  f"Similarity to 'Electric car': {similarity_to_electric_car}, Total Score: {total_score}")

            article_payload = article_point.payload.get('full_object')
            if article_payload:
                article_scores.append({
                    'payload': article_payload,
                    'total_score': total_score
                })

        if not article_scores:
            raise ValueError("No articles with valid similarity scores found.")

        # Sort articles by total score
        sorted_articles = sorted(article_scores, key=lambda x: x['total_score'], reverse=True)

        top_m_articles = sorted_articles[:m]

        print(f"Top {m} popular articles determined based on total scores.")

        return [article['payload'] for article in top_m_articles]

    def retrieve_clusters_top_m_popular_articles(self, n, k, m, electric_car_weight=1.0):
        electric_car_weight = electric_car_weight * 2 * k
        top_m_popular_articles = self.find_top_m_popular_articles(n=n, k=k, m=m, electric_car_weight=electric_car_weight)
        if not top_m_popular_articles:
            raise ValueError("No popular articles found.")

        # Get the embedding for "Electric car" once to reuse
        electric_car_embedding = self.embed_model.get_text_embedding("Electric car")

        search_results = []

        for idx, article_payload in enumerate(top_m_popular_articles):
            try:
                summary = article_payload.get('extracted_data', {}).get('summary', '')
                if not summary:
                    print(f"Popular article at index {idx} is missing 'extracted_data.summary'. Skipping.")
                    continue

                article_embedding = self.embed_model.get_text_embedding(summary)
            except Exception as e:
                print(f"Skipping popular article at index {idx} due to error: {e}")
                continue

            if article_embedding is None:
                print(f"Popular article at index {idx} has no embedding. Skipping.")
                continue

            # Find nearest documents to the article
            search_results_raw = self.find_nearest_documents(article_embedding, top_k=k)

            adjusted_results = []
            for result in search_results_raw:
                result_payload = result.payload.get('full_object')
                if not result_payload:
                    continue

                result_summary = result_payload.get('extracted_data', {}).get('summary', '')
                if not result_summary:
                    continue

                try:
                    result_embedding = self.embed_model.get_text_embedding(result_summary)
                except Exception as e:
                    print(f"Skipping result due to error in embedding: {e}")
                    continue

                # Compute similarity to "Electric car"
                similarity_to_electric_car = self.compute_similarity(result_embedding, electric_car_embedding)

                # Adjust the score with the weight
                adjusted_score = result.score + electric_car_weight * similarity_to_electric_car

                adjusted_results.append((result, adjusted_score))

            # Sort the adjusted results
            adjusted_results.sort(key=lambda x: x[1], reverse=True)

            # Build the cluster
            cleaned_search_result = []
            cluster = {}
            for result, adjusted_score in adjusted_results:
                full_object = result.payload.get('full_object')
                if full_object:
                    cleaned_search_result.append(full_object)

            if not cleaned_search_result:
                continue

            cluster["cluster"] = cleaned_search_result

            titles = [element.get('title', 'Untitled') for element in cleaned_search_result]

            titles_list = "\n".join(f"- {title}" for title in titles)

            # Assuming 'llm' is defined or passed appropriately
            text_generator = TextGenerator(llm)

            input_data = TextGenerator.InputModel(
                system_prompt=(
                    "You are a creative assistant. Below is a list of titles grouped into a cluster:\n\n"
                    f"{titles_list}\n\n"
                    "Your task is to come up with a single, cohesive title that represents the entire cluster of titles."
                ),
                user_prompt="What is the most appropriate title for the cluster as a whole? Provide only the title."
            )
            print('title list:', titles_list)
            try:
                generated_text = text_generator.generate_text(input_data)
                cluster["title"] = generated_text.content.strip()
                print("cluster title:", cluster["title"])
            except Exception as e:
                print(f"Failed to generate title for cluster {idx}: {e}")
                cluster["title"] = "Untitled Cluster"

            # Get image from the first document
            first_document = cleaned_search_result[0]
            media_content = first_document.get("media_content", [])
            image_url = media_content[0].get("url", "") if media_content else ""
            cluster["image"] = image_url

            search_results.append(cluster)

        if not search_results:
            raise ValueError("No clusters were successfully retrieved.")

        print(f"Retrieved clusters for top {m} popular articles.")

        return search_results


def add_to_database(json_file_path):
    collection_name = "news_feed"

    index_builder = IndexBuilder(
        json_file_path=json_file_path,
        collection_name=collection_name,
    )

    data = index_builder.load_data()
    index_builder.process_documents(data)

    index_builder.build_storage_context()
    index_builder.build_index()
    index_builder.remove_duplicate_points_by_title()

def get_clusters():
    collection_name = "news_feed"

    index_builder = IndexBuilder(
        collection_name=collection_name,
    )
    clusters = index_builder.retrieve_clusters_top_m_popular_articles(10, 5, 3)
    return clusters


if __name__ == "__main__":
    json_file_path = "rss_feed_entries_4.json"
    collection_name = "news_feed"

    index_builder = IndexBuilder(
        json_file_path=json_file_path,
        collection_name=collection_name,
    )
    #index_builder.remove_duplicate_points_by_title()
    clusters = index_builder.retrieve_clusters_top_m_popular_articles(10, 5, 3)
    print(clusters)



    #index_builder.remove_duplicate_points_by_title()
    # import time
    # start = time.time()
    search_results = index_builder.retrieve_clusters_newest_articles(5, 5)
    # end = time.time()
    # print('time:', end - start)
    # # print(search_results[0]["title"])
    # # print(search_results[0]["image"])
    # print(search_results[0]["cluster"])
    # print(search_results[0]["title"])
    # print(search_results[0]["image"])
    # articles = index_builder.find_newest_articles(5)
    # print('newest_article:', articles[0][0])
    # print('newest_timestamp:', articles[0][1])
    # print('second_newest_article:', articles[1][0])
    # print('second_newest_timestamp:', articles[1][1])
    # article_embedding, summary = index_builder.get_article_embedding(articles[0][0])
    # print('article_embedding:', len(article_embedding))
    # print('summary:', summary)
    # print('type of article:', type(article_embedding))
    # search_results = index_builder.find_nearest_documents(article_embedding, top_k=5)
    # print('search_results:', len(search_results))
    # data = index_builder.load_data()
    # index_builder.process_documents(data)
    #
    # index_builder.build_storage_context()
    # index_builder.build_index()
    #
    # retriever = index_builder.get_retriever_engine(llm=llm, similarity_top_k=100)
    #
    # query = "The new BMW F 900 R and F 900 XR have received significant technical and visual upgrades"
    # response = retriever.retrieve(query)
    # print(len(response))

