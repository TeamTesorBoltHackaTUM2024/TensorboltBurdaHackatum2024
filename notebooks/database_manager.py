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



class IndexBuilder:
    def __init__(
        self,
        json_file_path,
        collection_name,
        embedding_engine="text-embedding-3-large",
        api_version="2024-08-01-preview",
    ):
        """
        Initialize the IndexBuilder class with necessary configurations.

        Args:
            json_file_path (str): Path to the JSON file containing data.
            collection_name (str): Name of the Qdrant collection.
            embedding_engine (str): Name of the embedding engine.
            api_version (str): API version for Azure OpenAI.
        """
        # Load environment variables
        load_dotenv()
        self.API_KEY = os.environ["AZURE_OPENAI_API_KEY"]
        self.AZURE_ENDPOINT = os.environ["AZURE_OPENAI_ENDPOINT"]
        self.QDRANT_HOST = os.environ["QDRANT_HOST"]
        self.QDRANT_PORT = os.environ["QDRANT_PORT"]
        self.QDRANT_API_KEY = os.environ["QDRANT_API_KEY"]

        # Set class attributes
        self.json_file_path = json_file_path
        self.collection_name = collection_name
        self.embedding_engine = embedding_engine
        self.api_version = api_version

        # Initialize components
        self.embed_model = None
        self.client = None
        self.vector_store = None
        self.documents = []
        self.storage_context = None
        self.index = None

        # Set up the embedding model and vector store
        self.initialize_embedding_model()
        self.initialize_qdrant_client()
        self.initialize_vector_store()

    def initialize_embedding_model(self):
        """Initialize the embedding model using Azure OpenAI Embeddings."""
        self.embed_model = AzureOpenAIEmbedding(
            engine=self.embedding_engine,
            api_key=self.API_KEY,
            azure_endpoint=self.AZURE_ENDPOINT,
            api_version=self.api_version,
        )
        Settings.embed_model = self.embed_model

    def initialize_qdrant_client(self):
        """Initialize the Qdrant client."""
        self.client = qdrant_client.QdrantClient(
            url=self.QDRANT_HOST,
            port=self.QDRANT_PORT,
            api_key=self.QDRANT_API_KEY,
        )

    def initialize_vector_store(self):
        """Initialize the Qdrant vector store."""
        self.vector_store = QdrantVectorStore(
            client=self.client, collection_name=self.collection_name
        )

    def load_data(self):
        """
        Load data from a JSON file.

        Returns:
            list: List of data objects from the JSON file.
        """
        with open(self.json_file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        if not isinstance(data, list):
            raise ValueError("JSON data must be a list of objects.")
        return data

    def process_documents(self, data):
        """
        Process the loaded data into Document objects.

        Args:
            data (list): List of data objects.
        """
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
        """Build the storage context using the vector store."""
        self.storage_context = StorageContext.from_defaults(
            vector_store=self.vector_store
        )

    def build_index(self):
        """Build the vector store index from the processed documents."""
        self.index = VectorStoreIndex.from_documents(
            self.documents, storage_context=self.storage_context
        )

    def get_retriever_engine(self, llm, similarity_top_k=20):
        """
        Get the retriever engine for querying the index.

        Args:
            llm: The language model to use for retrieval.
            similarity_top_k (int): Number of top similar documents to retrieve.

        Returns:
            A retriever engine instance.
        """
        retrieve_engine = self.index.as_retriever(
            llm=llm, similarity_top_k=similarity_top_k
        )
        return retrieve_engine

    def find_newest_articles(self, n):
        all_points = self.client.scroll(
            collection_name=self.collection_name,
            scroll_filter=None,
        )

        articles_with_timestamps = []

        for point in all_points[0]:
            payload = point.payload
            if 'full_object' in payload and 'published_parsed' in payload['full_object']:
                published_parsed = payload['full_object']['published_parsed']
                if published_parsed:
                    published_datetime = datetime(*published_parsed[:6])
                    articles_with_timestamps.append((point, published_datetime))
            else:
                continue

        if not articles_with_timestamps:
            raise ValueError("No articles with 'published_parsed' found.")

        articles_with_timestamps.sort(key=lambda x: x[1], reverse=True)

        newest_articles = articles_with_timestamps[:n]

        return newest_articles

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
        """
        Remove duplicate points from the vector store based on the 'title' field.
        Also removes points where 'full_object' or 'title' is missing.
        """
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

    def find_top_m_popular_articles(self, n, k, m):
        """
        Find the top m most popular articles among the n most recent articles based on the sum of similarity scores
        of their k nearest documents.

        Args:
            n (int): Number of the most recent articles to consider.
            k (int): Number of nearest documents to retrieve for each article.
            m (int): Number of top popular articles to return.

        Returns:
            list: A list of the top m articles' full_object payloads sorted by popularity.

        Raises:
            ValueError: If no articles are found or no valid similarity scores are available.
        """
        newest_articles = self.find_newest_articles(n)
        if not newest_articles:
            raise ValueError("No newest articles found.")

        article_scores = []

        for idx, (article_point, published_datetime) in enumerate(newest_articles):
            try:
                article_embedding, summary = self.get_article_embedding(article_point)
            except ValueError as e:
                print(f"Skipping article at index {idx} due to error: {e}")
                continue

            if article_embedding is None:
                print(f"Article at index {idx} has no embedding. Skipping.")
                continue

            search_results = self.find_nearest_documents(article_embedding, top_k=k)

            sum_similarity = sum(hit.score for hit in search_results if hasattr(hit, 'score'))

            print(f"Article ID {article_point.id} - Sum of similarity scores: {sum_similarity}")

            article_payload = article_point.payload.get('full_object')
            if article_payload:
                article_scores.append({
                    'payload': article_payload,
                    'sum_similarity': sum_similarity
                })

        if not article_scores:
            raise ValueError("No articles with valid similarity scores found.")

        # Sort the articles based on sum_similarity in descending order
        sorted_articles = sorted(article_scores, key=lambda x: x['sum_similarity'], reverse=True)

        # Select the top m articles
        top_m_articles = sorted_articles[:m]

        print(f"Top {m} popular articles determined based on sum similarity scores.")

        # Extract and return the payloads
        return [article['payload'] for article in top_m_articles]


    def retrieve_clusters_top_m_popular_articles(self, n, k, m):
        """
        Retrieve clusters for the top m most popular articles among the n most recent articles.

        For each of the top m popular articles:
            1. Find the k nearest documents.
            2. Generate a cohesive title for the cluster.
            3. Collect an image from the first document in the cluster.

        Args:
            n (int): Number of the most recent articles to consider for popularity ranking.
            k (int): Number of nearest documents to retrieve for each popular article.
            m (int): Number of top popular articles to retrieve clusters for.

        Returns:
            list: A list of dictionaries, each containing:
                - 'cluster': List of full_object payloads of the k nearest documents.
                - 'title': Generated cohesive title for the cluster.
                - 'image': URL of the image from the first document in the cluster.

        Raises:
            ValueError: If no popular articles are found or no valid similarity scores are available.
        """
        top_m_popular_articles = self.find_top_m_popular_articles(n=n, k=k, m=m)
        if not top_m_popular_articles:
            raise ValueError("No popular articles found.")

        search_results = []

        for idx, article_payload in enumerate(top_m_popular_articles):
            try:
                summary = article_payload.get('extracted_data', {}).get('summary', '')
                if not summary:
                    logging.warning(f"Popular article at index {idx} is missing 'extracted_data.summary'. Skipping.")
                    continue

                article_embedding = self.embed_model.get_text_embedding(summary)
            except Exception as e:
                logging.warning(f"Skipping popular article at index {idx} due to error: {e}")
                continue

            if article_embedding is None:
                logging.warning(f"Popular article at index {idx} has no embedding. Skipping.")
                continue

            search_result = self.find_nearest_documents(article_embedding, top_k=k)

            cleaned_search_result = []
            cluster = {}
            for result in search_result:
                full_object = result.payload.get('full_object')
                if full_object:
                    cleaned_search_result.append(full_object)

            if not cleaned_search_result:
                continue

            cluster["cluster"] = cleaned_search_result

            titles = [element.get('title', 'Untitled') for element in cleaned_search_result]

            titles_list = "\n".join(f"- {title}" for title in titles)

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
                cluster["title"] = generated_text.content
                print("cluster title:", cluster["title"])
            except Exception as e:
                logging.warning(f"Failed to generate title for cluster {idx}: {e}")
                cluster["title"] = "Untitled Cluster"

            first_document = cleaned_search_result[0]
            image_url = first_document.get("media_content", [{}])[0].get("url", "")
            cluster["image"] = image_url

            search_results.append(cluster)

        if not search_results:
            raise ValueError("No clusters were successfully retrieved.")

        print(f"Retrieved clusters for top {m} popular articles.")

        return search_results

if __name__ == "__main__":
    json_file_path = "rss_feed_entries_4.json"
    collection_name = "news_feed"

    index_builder = IndexBuilder(
        json_file_path=json_file_path,
        collection_name=collection_name,
    )
    #index_builder.remove_duplicate_points_by_title()
    # import time
    # start = time.time()
    #articles = index_builder.find_top_m_popular_articles(10, 10, 3)
    #print('articles:', articles)
    clusters = index_builder.retrieve_clusters_top_m_popular_articles(10, 5, 3)
    print(clusters)
    # print('len clusters:', len(clusters))
    # print('cluster 0', clusters[0]['title'])
    #print('articles:', len(articles))
    #search_results = index_builder.retrieve_clusters_newest_articles(5, 5)
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
