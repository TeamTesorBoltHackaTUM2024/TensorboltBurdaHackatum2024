from datetime import datetime, timezone
from typing import List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.models.generate import GenArticle, GenerateArticleRequest
from app.services.generate import read_news_json_file, generate_article
from llama_index.llms.azure_openai import AzureOpenAI
from app.settings import settings

llm = AzureOpenAI(
    engine=settings.AZURE_OPENAI_ENGINE,
    model=settings.AZURE_OPENAI_MODEL,
    api_key=settings.AZURE_OPENAI_API_KEY,
    azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
    api_version=settings.AZURE_OPENAI_API_VERSION,
    temperature=0.2
)

router = APIRouter(
    prefix="/generate",
    tags=["Generate Article"],
    responses={404: {"description": "Not found"}},
)

@router.post("/article")
def generate(generate_req: GenerateArticleRequest) -> GenArticle:
    news_list = read_news_json_file("./rss_feed_entries_2.json")
    return generate_article(llm, generate_req.user_prefs, news_list)
    
