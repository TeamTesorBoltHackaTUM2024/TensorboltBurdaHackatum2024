from pydantic import BaseModel, Field
from typing import List, Dict

class FactCheck(BaseModel):
    title: str = Field(description="Title of the fact-checked source.")
    link: str = Field(description="URL of the fact-checked source.")

class MetricEvaluation(BaseModel):
    score: int = Field(description="Score between 1 and 10.")
    explanation: str = Field(description="Explanation for the assigned score.")

class EvaluationReport(BaseModel):
    content_quality: MetricEvaluation
    expertise: MetricEvaluation
    trustworthiness: MetricEvaluation
    audience_alignment: MetricEvaluation
    page_experience: MetricEvaluation
    fact_check: List[FactCheck]

class FinalEvaluation(BaseModel):
    report: EvaluationReport
    overall_score: float
    classification: str
