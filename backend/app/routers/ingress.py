from typing import List  # Import List for type annotations
from fastapi import APIRouter, FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.ingress import RSSItem, FeedURL, FeedCreate
from app.services.ingress import handle_feeds
from app.db_connection import get_db

router = APIRouter(
    prefix="/ingress",
    tags=["Ingress Endpoint"],
)

# Add a new feed
@router.post("/add-feed", response_model=str)
def add_feed(feed: FeedCreate, db: Session = Depends(get_db)):
    """
    FastAPI route to add a new feed by delegating to the service function.

    Args:
        feed (FeedCreate): The feed data (link and name).
        db (Session): The database session (injected).

    Returns:
        str: A message indicating success or failure.
    """
    return add_new_feed(feed.link, feed.name, db)


# Fetch from all rss fields
@router.get("/fetch", response_model=str)
def fetch(db: Session = Depends(get_db)):
    try:
        handle_feeds(db, process_function=lambda x: x)
        return "true"
    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="An internal error occurred while fetching data.")
