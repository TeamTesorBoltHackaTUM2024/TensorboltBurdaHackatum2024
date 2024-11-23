from typing import List, Optional
from dotenv import load_dotenv
import os
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    load_dotenv("../backend/app/.env")

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


# Exporting for use
settings = Settings()
