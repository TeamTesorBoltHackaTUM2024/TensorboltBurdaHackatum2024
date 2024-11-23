from dotenv import load_dotenv
import os

from newspaper.images import chunk_size

load_dotenv()

API_KEY = os.environ["AZURE_OPENAI_API_KEY"]
AZURE_ENDPOINT = os.environ["AZURE_OPENAI_ENDPOINT"]
QDRANT_HOST=os.environ["QDRANT_HOST"]
QDRANT_PORT=os.environ["QDRANT_PORT"]
QDRANT_API_KEY=os.environ["QDRANT_API_KEY"]


import feedparser
from typing import List, Dict
from newspaper import Article
import json
import nltk
nltk.download('punkt')

from pydantic import BaseModel, Field
from llama_index.program.openai import OpenAIPydanticProgram
from llama_index.core.prompts import ChatPromptTemplate, ChatMessage


from llama_index.llms.azure_openai import AzureOpenAI

llm = AzureOpenAI(
    engine="gpt-4o",
    model="gpt-4o",
    api_key=API_KEY,
    azure_endpoint=AZURE_ENDPOINT,
    api_version="2024-08-01-preview",
    temperature=0.0
)

class ArticleExtraction(BaseModel):
    """A model representing the extracted information from an article."""

    summary: str = Field(
        description=(
            "A concise summary capturing the main points of the article, focusing only on the most "
            "relevant information and filtering out unnecessary details."
        )
    )
    keywords: List[str] = Field(
        description=(
            "A list of the most important and relevant keywords or phrases that represent the main "
            "topics of the article. Exclude generic terms or overly broad concepts."
        )
    )
    facts: List[str] = Field(
        description=(
            "Key factual statements from the article that are essential for understanding its main points."
        )
    )
    important_dates: Dict[str, str] = Field(
        default_factory=dict,
        description=(
            "All significant dates mentioned in the article, with corresponding facts. The date format is flexible."
        )
    )

class RSSParser:
    def __init__(self, feed_url: str):
        self.feed_url = feed_url

        self.llm = llm

        schema = ArticleExtraction.schema_json(indent=2)

        self.prompt = ChatPromptTemplate(
            message_templates=[
                ChatMessage(
                    role="system",
                    content=(
                        "You are an expert assistant for extracting insights from articles in JSON format.\n"
                        "You extract data and return it in JSON format, according to the provided JSON schema, from the given article content.\n"
                        "REMEMBER to return extracted data only from the provided article content.\n\n"
                        "The JSON schema is:\n"
                        f"{schema}"
                    ),
                ),
                ChatMessage(
                    role="user",
                    content=(
                        "Article Content:\n"
                        "------\n"
                        "{article_content}\n"
                        "------"
                    ),
                ),
            ]
        )

        self.program = OpenAIPydanticProgram.from_defaults(
            output_cls=ArticleExtraction,
            llm=self.llm,
            prompt=self.prompt,
            verbose=True,
        )

    def fetch_feed(self) -> Dict:
        try:
            feed = feedparser.parse(self.feed_url)
            if feed.bozo:
                raise ValueError(f"Error parsing feed: {feed.bozo_exception}")
            return feed
        except Exception as e:
            raise RuntimeError(f"Failed to load or parse RSS feed: {e}")

    def extract_article_content(self, url: str) -> str:
        """
        Fetch the article from the URL and extract its main content.
        """
        try:
            article = Article(url)
            article.download()
            article.parse()
            return article.text
        except Exception as e:
            print(f"Failed to extract article content from {url}: {e}")
            return ""

    def extract_entries_with_content(self) -> List[Dict]:
        """
        Extract entries from the RSS feed, including the main content of each linked article.
        Enrich the content using LlamaIndex structured data extraction.
        """
        feed = self.fetch_feed()
        entries = []

        for entry in feed.entries:
            content = self.extract_article_content(entry.get("link", ""))
            if len(content) > 500:
                try:
                    # Use the program to extract data
                    response = self.program(article_content=content)
                    extraction_result = response  # Pydantic object
                    print('Extraction result:', extraction_result)
                except Exception as e:
                    print(f"Failed to extract structured data from content: {e}")
                    extraction_result = None

                item = {
                    "title": entry.get("title", "No title"),
                    "rss_summary": entry.get("summary", ""),
                    "link": entry.get("link", ""),
                    "id": entry.get("id", "No ID"),
                    "authors": entry.get("authors", []),
                    "published": entry.get("published", "Not specified"),
                    "published_parsed": entry.get("published_parsed", None),
                    "media_content": entry.get("media_content", []),
                    "content": content,
                    "extracted_data": extraction_result.dict() if extraction_result else {},
                }
                entries.append(item)
            else:
                print(f"Content too short or empty for URL {entry.get('link', '')}")
        return entries

    def get_feed_metadata(self) -> Dict:
        feed = self.fetch_feed()
        return {
            "title": feed.feed.get("title", "Not specified"),
            "link": feed.feed.get("link", ""),
            "description": feed.feed.get("description", "Not specified"),
            "published": feed.feed.get("published", "Not specified")
        }

def save_entries_to_json(entries: List[Dict], filename: str):
    """
    Save the list of entries to a JSON file.

    :param entries: List of entry dictionaries.
    :param filename: Name of the JSON file to save.
    """
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(entries, f, ensure_ascii=False, indent=4)
        print(f"Entries successfully saved to {filename}")
    except Exception as e:
        print(f"Failed to save entries to JSON file: {e}")


if __name__ == "__main__":
    # feed_url_1 = "https://rss.app/feeds/AY3gpY8fWOkfCCWR.xml"  # Replace with your feed URL
    # feed_url_2 = "https://www.autobild.de/rss/22590661.xml"
    # feed_url_3 = "https://rss.app/feeds/MLuDKqkwFtd2tuMr.xml"
    eng_feed_url_1 = "https://rss.app/feeds/u6rcvfy6PTSf9vQ4.xml"
    eng_feed_url_2 = "https://rss.feedspot.com/uk_car_rss_feeds/"
    parser = RSSParser(eng_feed_url_1)
    entries = parser.extract_entries_with_content()

    save_entries_to_json(entries, "./rss_feed_entries_1.json")
    save_entries_to_json(entries, "./rss_feed_entries_2.json")
