from typing import List
from pydantic import BaseModel
from llama_index.core import (
    VectorStoreIndex,
    SimpleDirectoryReader,
    ServiceContext,
    StorageContext,
    load_index_from_storage,
    Settings,
)
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.llms.openai import OpenAI
from llama_index.core.agent import ReActAgent
from llama_index.core.tools import FunctionTool
from llama_index.core.llms import ChatMessage
from llama_index.embeddings.azure_openai import AzureOpenAIEmbedding
from llama_index.llms.azure_openai import AzureOpenAI

# Import settings
from app.settings import settings

# Configure LLM settings based on the environment
if settings.USE_OLLAMA:
    Settings.llm = Ollama(
        base_url=settings.OLLAMA_ENDPOINT,
        model=settings.OLLAMA_MODEL
    )
    Settings.embed_model = OllamaEmbedding(
        base_url=settings.OLLAMA_ENDPOINT,
        model_name=settings.OLLAMA_MODEL
    )
else:
    Settings.llm = AzureOpenAI(
        model=settings.AZURE_OPENAI_MODEL,
        engine=settings.AZURE_OPENAI_ENGINE,
        azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
        api_version=settings.AZURE_OPENAI_API_VERSION,
        api_key=settings.AZURE_OPENAI_API_KEY
    )
    Settings.embed_model = AzureOpenAIEmbedding(
        model=settings.AZURE_OPENAI_EMBEDDING_MODEL,
        azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
        api_version=settings.AZURE_OPENAI_API_VERSION,
        api_key=settings.AZURE_OPENAI_API_KEY
    )

# Function to generate ideas from a prompt
def generate_ideas(prompt: str) -> List[str]:
    """
    Generate a list of ideas based on the input prompt.

    Args:
        prompt (str): The prompt to generate ideas from.

    Returns:
        list: A list of generated ideas.
    """
    try:
        article_ideas = [
            "The Evolution of MS Dhoni: From Ranchi Boy to Cricket Legend",
            "Captain Cool's Iconic Leadership Moments in Indian Cricket",
            "MS Dhoni's Best Finishes: A Masterclass in Chasing Targets",
            "The Helicopter Shot: How MS Dhoni Revolutionized Modern Batting",
            "A Tale of Calmness: Lessons in Composure from MS Dhoni",
            "MS Dhoni’s Role in Shaping the IPL and Chennai Super Kings' Legacy",
            "Behind the Stumps: Dhoni’s Genius as a Wicket-Keeper",
            "MS Dhoni’s Contributions to Indian Cricket Beyond the Field",
            "The Untold Stories: Anecdotes That Define Dhoni's Personality"
        ]

        return article_ideas

    except Exception as e:
        print(f"Error generating ideas: {e}")
        return []

# Function to filter and rank ideas
def filter_and_rank_ideas(ideas: list) -> list:
    """
    Filter and rank ideas based on their length (example ranking method).

    Args:
        ideas (list): A list of ideas to rank.

    Returns:
        list: Top 5 ranked ideas.
    """
    try:
        ranked_ideas = sorted(ideas, key=lambda idea: len(idea))  # Rank by length as an example
        return ranked_ideas[:5]  # Return top 5 ideas
    except Exception as e:
        print(f"Error filtering and ranking ideas: {e}")
        return []

# Function to synthesize an article from ideas
def synthesize_article(title: str, ideas: List[str]) -> str:
    """
    Synthesize a detailed article using a title and ideas.

    Args:
        title (str): The title of the article.
        ideas (list): A list of ideas to use in the article.

    Returns:
        str: The synthesized article.
    """
    try:
        content = "\n".join(ideas)
        response = Settings.llm.chat(
            [ChatMessage(role="user", content=f"Write a detailed article with the title '{title}' using the following ideas: {content}")]
        )
        return response
    except Exception as e:
        print(f"Error synthesizing article: {e}")
        return ""

# Wrap the functions as tools
generate_ideas_tool = FunctionTool.from_defaults(fn=generate_ideas)
filter_and_rank_tool = FunctionTool.from_defaults(fn=filter_and_rank_ideas)
synthesize_article_tool = FunctionTool.from_defaults(fn=synthesize_article)

# Define the system prompt for the agent
system_prompt = """
You are an intelligent assistant capable of generating ideas, filtering them, synthesizing articles, and analyzing misinformation.
Use the available tools to complete each task step by step. Provide clear, concise, and well-structured outputs.
"""

# Create the ReActAgent with tools and the defined system prompt
article_generation_react_agent = ReActAgent.from_tools(
    tools=[
        generate_ideas_tool,
        filter_and_rank_tool,
        synthesize_article_tool,

    ],
    verbose=True,
    system_prompt=system_prompt,
    max_iterations=20
)
