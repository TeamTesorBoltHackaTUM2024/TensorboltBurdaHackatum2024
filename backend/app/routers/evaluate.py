from datetime import datetime, timezone
from typing import Dict
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from llama_index.program.openai import OpenAIPydanticProgram
from llama_index.llms.azure_openai import AzureOpenAI
from app.settings import settings

class ScoreWithExplanation(BaseModel):
    """
    Represents a score (1-10) and its explanation.
    """
    score: int = Field(ge=1, le=10, description="Score ranging from 1 to 10.")
    explanation: str = Field(..., description="Explanation of the score.")


class EvaluationResult(BaseModel):
    """
    Schema for evaluating content using LLM.
    Ensures all fields are populated with default values if missing.
    """
    content_quality: Dict[str, ScoreWithExplanation] = Field(
        default_factory=dict, description="Evaluation of content quality aspects."
    )
    expertise: Dict[str, ScoreWithExplanation] = Field(
        default_factory=dict, description="Evaluation of expertise-related aspects."
    )
    page_experience: Dict[str, ScoreWithExplanation] = Field(
        default_factory=dict, description="Evaluation of page experience aspects."
    )
    people_first: Dict[str, ScoreWithExplanation] = Field(
        default_factory=dict, description="Evaluation of people-first aspects."
    )


# FastAPI Router
router = APIRouter(
    prefix="/evaluate",
    tags=["Evaluate Article According to SEO"],
    responses={404: {"description": "Not found"}},
)


# LLM Initialization
llm = AzureOpenAI(
    engine=settings.AZURE_OPENAI_ENGINE,
    model=settings.AZURE_OPENAI_MODEL,
    api_key=settings.AZURE_OPENAI_API_KEY,
    azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
    api_version=settings.AZURE_OPENAI_API_VERSION,
    temperature=0.2,
)


prompt_template_str = """\
Evaluate the given content against these categories: 
- Content Quality: Originality, Completeness, Insightfulness, Value Addition.
- Expertise: Evidence of Expertise, Factual Accuracy, Author Information.
- Page Experience: Readability, Loading Speed, Mobile Friendly.
- People First: Audience Targeting, Depth of Knowledge, Satisfaction.

Provide a structured JSON output with scores (1-10) and explanations for each aspect.
Ensure all categories are present, even if a category's score is minimal.

Output Format:
{
    "content_quality": {
        "Originality": {"score": 8, "explanation": "Explanation text"},
        ...
    },
    "expertise": {
        ...
    },
    "page_experience": {
        ...
    },
    "people_first": {
        ...
    }
}

Content: {content}
"""


# OpenAIPydanticProgram Setup
evaluation_program = OpenAIPydanticProgram.from_defaults(
    output_cls=EvaluationResult,
    llm=llm,
    prompt_template_str=prompt_template_str,
    verbose=True,
)


@router.post("/evaluate", response_model=EvaluationResult)
async def evaluate_content(content: str) -> EvaluationResult:
    """
    Evaluate content using AzureOpenAI and return structured evaluation schema.

    Args:
        content (str): The content to be evaluated.

    Returns:
        EvaluationResult: Structured evaluation of the content.
    """
    try:
        # Run the evaluation program
        raw_result = evaluation_program(content=content)

        # Preprocess and validate LLM output
        result_dict = raw_result.dict()

        # Validate the output schema
        validated_result = EvaluationResult.parse_obj(result_dict)

        return validated_result

    except Exception as e:
        # Log the error for debugging purposes
        import logging
        logging.error(f"Error during evaluation: {str(e)}")

        # Return a user-friendly error message
        raise HTTPException(
            status_code=500, detail=f"Error during evaluation: {str(e)}"
        )
