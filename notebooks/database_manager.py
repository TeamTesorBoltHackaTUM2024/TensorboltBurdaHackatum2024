import logging
import json
import os
from dotenv import load_dotenv
from llama_index.core import VectorStoreIndex, StorageContext, Document
from llama_index.embeddings.azure_openai import AzureOpenAIEmbedding
from llama_index.core import Settings
import qdrant_client
from llama_index.vector_stores.qdrant import QdrantVectorStore
from data_processor import llm
from datetime import datetime

class IndexBuilder:
    def __init__(
        self,
        json_file_path,
        collection_name,
        embedding_engine="text-embedding-3-small",
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
                logging.warning(
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

        logging.info(f"Processed {len(self.documents)} documents from JSON.")

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
        logging.info(
            "VectorStoreIndex has been successfully created and populated."
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

    # def find_similar_articles_to_newest(self, top_k=10):
    #     newest_article, newest_timestamp = self.find_newest_article()
    #     print(f"Newest article ID: {newest_article.id}, Published at: {newest_timestamp}")
    #
    #     article_embedding, summary = self.get_article_embedding(newest_article)
    #     print(f"Summary of the newest article:\n{summary}\n")
    #
    #     search_results = self.find_nearest_documents(
    #         article_embedding=article_embedding,
    #         exclude_id=newest_article.id,
    #         top_k=top_k
    #     )
    #
    #     print(f"Top {top_k} articles similar to the newest article:")
    #     for result in search_results:
    #         payload = result.payload
    #         score = result.score
    #         article_id = payload.get('id')
    #         title = payload.get('title', 'No Title')
    #         print(f"Score: {score:.4f}, Article ID: {article_id}, Title: {title}")
    #
    #     return search_results

    def retrieve_clusters_newest_articles(self, amount_of_newest_articles, amount_in_cluster):
        articles = self.find_newest_articles(amount_of_newest_articles)
        search_results = []
        for article in articles:
            article_embedding, summary = self.get_article_embedding(article[0])
            search_result = self.find_nearest_documents(article_embedding, top_k=amount_in_cluster)
            cleaned_search_result = []
            for result in search_result:
                cleaned_search_result.append(result.payload['full_object'])
            search_results.append(cleaned_search_result)
        return search_results

if __name__ == "__main__":
    json_file_path = "rss_feed_entries_1.json"
    collection_name = "news_feed"

    index_builder = IndexBuilder(
        json_file_path=json_file_path,
        collection_name=collection_name,
    )
    search_result = index_builder.retrieve_clusters_newest_articles(2, 5)
    print('search_result:', search_result)
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
