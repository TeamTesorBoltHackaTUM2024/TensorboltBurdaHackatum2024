from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.models.generate import QueryRequest
from app.services.generate import article_generation_react_agent

router = APIRouter(
    prefix="/generate",
    tags=["Generate Article"],
    responses={404: {"description": "Not found"}},
)

@router.post("/")
async def generate_articles(request: QueryRequest):
    try:
        # Use the existing multi-step agent for initial interaction
        response = article_generation_react_agent.chat(
            f"""
            1. Generate ideas for the topic: {request.query}.
            2. Filter and rank the generated ideas to choose the most relevant ones.
            3. Write an article with the title 'The Impact of AI on Modern Education' using the selected ideas.
            4. Analyze the article for potential misinformation.
            """)

        # Return all results as a structured response
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {e}")
