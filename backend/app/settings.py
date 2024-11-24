from typing import List, Optional
from dotenv import load_dotenv
import os
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):

    # Modify to restrict to origin of your choice
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl | str] = [
        "*",
        # "http://localhost:3000"
    ]

    # Ollama API settings
    USE_OLLAMA: bool = os.getenv("USE_OLLAMA", True)
    OLLAMA_ENDPOINT: str = os.getenv("OLLAMA_ENDPOINT", "http://localhost:11434/")
    OLLAMA_MODEL: str = os.getenv("OLLAMA_MODEL", "llama3.2:3b")

    # OpenAI API settings
    AZURE_OPENAI_API_KEY: str = os.getenv("AZURE_OPENAI_API_KEY", "")
    AZURE_OPENAI_ENDPOINT: str = os.getenv("AZURE_OPENAI_ENDPOINT", "")
    AZURE_OPENAI_ENGINE: str = os.getenv("AZURE_OPENAI_ENGINE", "gpt-4o-mini")
    AZURE_OPENAI_MODEL: str = os.getenv("AZURE_OPENAI_MODEL", "gpt-4o-mini")
    AZURE_OPENAI_API_VERSION: str = os.getenv("AZURE_OPENAI_API_VERSION", "2024-08-01-preview")
    AZURE_OPENAI_EMBEDDING_MODEL: str = os.getenv("AZURE_OPENAI_EMBEDDING_MODEL", "text-embedding-3-small")

    # Postgres Database settings
    DB_CONNECTION_NAME: str = os.getenv("DB_CONNECTION_NAME", "")
    DB_USER: str = os.getenv("DB_USER", "user")
    DB_PASS: str = os.getenv("DB_PASS", "password")
    DB_HOST: str = os.getenv("DB_HOST", "localhost")
    DB_NAME: str = os.getenv("DB_NAME", "your_database")

    # QDrant Vector Database
    QDRANT_HOST: str = os.getenv("QDRANT_HOST", "")
    QDRANT_PORT: str = os.getenv("QDRANT_PORT", "")
    QDRANT_API_KEY: str = os.getenv("QDRANT_API_KEY", "")
    
    SERPER_API_KEY: str = os.getenv("SERPER_API_KEY", "")
# Exporting for use
settings = Settings()
