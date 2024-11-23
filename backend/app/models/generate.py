from pydantic import BaseModel
from typing import List, Optional, Dict
from enum import Enum

# Article related models
class GenArticle(BaseModel):
    title: str
    paragraphs: List[str]
    headers: List[str]

class NewsData(BaseModel):
    summary: str
    keywords: List[str]
    facts: List[str]
    important_dates: Dict[str,str] # date,event

class News(BaseModel):
    title: str
    content: str
    authors: List[str]
    published: str
    extracted_data: NewsData

# Prompt-related enums and models
class Tone(Enum):
    opinionated = 'opinionated'
    neutral = 'neutral'

class Style(Enum):
    casual = 'casual'
    formal = 'formal'

class TargetAudience(Enum):
    beginners = 'beginners'
    experts = 'experts'
    hobbyist = 'hobbyist'

class ArticleLength(Enum):
    short = 500
    medium = 1000
    long = 2000

class UserPreferences(BaseModel):
    tone: Optional[Tone]
    style: Optional[Style]
    target_audiance: Optional[TargetAudience]
    article_length: Optional[ArticleLength]
    keywords: List[str]
    facts: List[str]


