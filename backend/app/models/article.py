from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime
from sqlalchemy import Column, Integer, String, JSON, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from app.db_connection import engine

Base = declarative_base()

# GenArticle schema
class GenArticle(BaseModel):
    title: str
    paragraphs: List[str]
    headers: List[str]

# NewsData schema
class NewsData(BaseModel):
    summary: str
    keywords: List[str]
    facts: List[str]
    important_dates: Dict[str, str]

# Request schema for creating/updating articles
class ArticleCreate(BaseModel):
    content: GenArticle
    news_data: Optional[NewsData] = None

class ArticleUpdate(BaseModel):
    content: Optional[GenArticle] = None
    news_data: Optional[NewsData] = None

class BulkDeleteRequest(BaseModel):
    article_ids: List[int]

# Response schema for articles
class ArticleResponse(BaseModel):
    id: int
    content: GenArticle
    news_data: Optional[NewsData]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

class Article(Base):
    __tablename__ = 'articles'

    id = Column(Integer, primary_key=True, index=True)
    content = Column(JSON, nullable=False)  # Stores the GenArticle object as JSON
    news_data = Column(JSON, nullable=True)  # Stores the NewsData object as JSON
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

# Create the table in the database
Base.metadata.create_all(bind=engine)
