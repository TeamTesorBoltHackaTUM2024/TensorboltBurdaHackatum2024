from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Dict, List
import json
from llama_index.llms.azure_openai import AzureOpenAI
from app.settings import settings

router = APIRouter(
    prefix="/evaluate",
    tags=["Generate Article"],
    responses={404: {"description": "Not found"}},
)

# Azure OpenAI LLM Initialization
llm = AzureOpenAI(
    engine=settings.AZURE_OPENAI_ENGINE,
    model=settings.AZURE_OPENAI_MODEL,
    api_key=settings.AZURE_OPENAI_API_KEY,
    azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
    api_version=settings.AZURE_OPENAI_API_VERSION,
)

class TextInput(BaseModel):
    text: str

class ScoreExplanation(BaseModel):
    score: float = Field(..., description="The score value for the evaluation metric.")
    explanation: str = Field(..., description="A detailed explanation of the score.")

class EvaluationResponse(BaseModel):
    scores: Dict[str, ScoreExplanation]

@router.post("/", response_model=EvaluationResponse)
async def evaluate_text(input: TextInput):
    try:
        # Call the LLM to get scores for readability, SEO, engagement, originality, and coherence
        response = llm.invoke(f"Evaluate the following text: {input.text}")
        
        # Assuming the response is a JSON with scores and explanations for each category
        scores_data = json.loads(response)
        
        scores = {
            "readability": ScoreExplanation(
                score=scores_data.get("readability", 0),
                explanation=scores_data.get("readability_explanation", "No explanation available.")
            ),
            "seo": ScoreExplanation(
                score=scores_data.get("seo", 0),
                explanation=scores_data.get("seo_explanation", "No explanation available.")
            ),
            "engagement": ScoreExplanation(
                score=scores_data.get("engagement", 0),
                explanation=scores_data.get("engagement_explanation", "No explanation available.")
            ),
            "originality": ScoreExplanation(
                score=scores_data.get("originality", 0),
                explanation=scores_data.get("originality_explanation", "No explanation available.")
            ),
            "coherence": ScoreExplanation(
                score=scores_data.get("coherence", 0),
                explanation=scores_data.get("coherence_explanation", "No explanation available.")
            )
        }

        return EvaluationResponse(scores=scores)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))