from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.models.article import Article, ArticleCreate, ArticleUpdate, ArticleResponse, BulkDeleteRequest
from app.db_connection import get_db

router = APIRouter(
    prefix="/articles",
    tags=["Articles"],
    responses={404: {"description": "Not found"}},
)

# Create Article
@router.post("/", response_model=ArticleResponse)
def create_article(article: ArticleCreate, db: Session = Depends(get_db)):
    new_article = Article(
        content=article.content.dict(),
        news_data=article.news_data.dict() if article.news_data else None,
    )
    db.add(new_article)
    db.commit()
    db.refresh(new_article)
    return new_article

# Get Article by ID
@router.get("/{article_id}", response_model=ArticleResponse)
def get_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

# Update Article
@router.put("/{article_id}", response_model=ArticleResponse)
def update_article(article_id: int, article_update: ArticleUpdate, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    if article_update.content:
        article.content = article_update.content.dict()
    if article_update.news_data:
        article.news_data = article_update.news_data.dict()

    db.commit()
    db.refresh(article)
    return article

# List All Articles
@router.get("/", response_model=List[ArticleResponse])
def list_articles(db: Session = Depends(get_db)):
    articles = db.query(Article).all()
    return articles

# Delete Article
@router.delete("/{article_id}", response_model=dict)
def delete_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    db.delete(article)
    db.commit()
    return {"detail": f"Article with ID {article_id} has been deleted"}


# Bulk Delete Articles
@router.delete("/bulk", response_model=dict)
def bulk_delete_articles(request: BulkDeleteRequest, db: Session = Depends(get_db)):
    articles_to_delete = db.query(Article).filter(Article.id.in_(request.article_ids)).all()
    
    if not articles_to_delete:
        raise HTTPException(status_code=404, detail="No articles found for the provided IDs")
    
    for article in articles_to_delete:
        db.delete(article)
    
    db.commit()
    return {"detail": f"{len(articles_to_delete)} articles have been deleted"}
