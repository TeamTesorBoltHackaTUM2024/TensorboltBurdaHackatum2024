from typing import Dict, Optional
from anthropic import BaseModel


class Criterion(BaseModel):
    score: int
    explanation: str

class EvaluationSchema(BaseModel):
    content_quality: Optional[Dict[str, Criterion]]
    expertise: Optional[Dict[str, Criterion]]
    page_experience: Optional[Dict[str, Criterion]]
    people_first: Optional[Dict[str, Criterion]]