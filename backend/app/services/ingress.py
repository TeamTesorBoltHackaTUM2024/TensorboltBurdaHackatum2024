import feedparser
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from app.models.ingress import FeedURL, RSSItem
import uuid

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException
from app.models.ingress import FeedURL

def add_new_feed(feed_link, feed_name, db):
    """
    Adds a new feed to the FeedURL table if it doesn't already exist.

    Args:
        feed_link (str): The link to the RSS feed.
        feed_name (str): The name of the RSS feed.
        db (Session): The database session.

    Returns:
        str: A message indicating success or failure.

    Raises:
        HTTPException: If the feed already exists or if there is a database error.
    """
    try:
        # Check if the feed already exists
        existing_feed = db.query(FeedURL).filter_by(link=feed_link).first()
        if existing_feed:
            raise HTTPException(
                status_code=400,
                detail=f"Feed with link {feed_link} already exists."
            )
        
        # Add new feed to the database
        new_feed = FeedURL(link=feed_link, name=feed_name, etag=None)
        db.add(new_feed)
        db.commit()
        return f"Feed {feed_name} added successfully."
    except SQLAlchemyError as e:
        db.rollback()
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Database error occurred.")
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")


# APScheduler setup
def start_scheduled_ingress(ingress_function=None, interval=300, process_function=None, SessionLocal=None):
    """
    Starts a scheduled task to run the given ingress function at regular intervals.

    Args:
        ingress_function (function): The function to be executed periodically (should take no arguments).
        interval (int): The time interval (in seconds) between each execution of the ingress function. Default is 300 seconds.
        process_function (function): A function to process each feed entry (should accept one argument, typically a feed entry).
        SessionLocal (function): A function to create a new session for interacting with the database.

    Returns:
        BackgroundScheduler: The scheduler instance that is running the background task.
    
    Raises:
        AssertionError: If `ingress_function`, `process_function`, or `SessionLocal` is None.
    """
    assert ingress_function is not None, "An ingress_function is required!"
    assert process_function is not None, "A process_function is required!"
    assert SessionLocal is not None, "An sqlalchemy SessionLocal function is required!"

    scheduler = BackgroundScheduler()
    scheduler.add_job(
        ingress_function,
        IntervalTrigger(seconds=interval),
        id="ingress",
        replace_existing=True,
        kwargs={
            "process_function": process_function,
            "SessionLocal": SessionLocal,
        },
    )
    scheduler.start()

    return scheduler

# Function to fetch RSS feed and process updated items
def handle_feeds(db, process_function=None):
    """
    Fetches and processes all RSS feeds stored in the database, and updates their ETags.

    Args:
        db (SQLAlchemy Session): The session used to interact with the database.
        process_function (function, optional): A function to process each feed entry. Defaults to None (no processing).

    Returns:
        None

    This function fetches all feed URLs from the database, processes each feed by calling
        `fetch_and_process_feed`, and updates the ETag in the database for each feed.
    """
    try:
        # Select all records from FeedURL
        feed_urls = db.query(FeedURL).all()

        # Modify the etag for each record
        for item in feed_urls:
            feed_url, etag = item.feed_url, item.etag

            # Run the processing function
            processed_feed, etag = fetch_and_process_feed(feed_url, etag, process_function=process_function)
            item.etag = etag

            # Store the feed items in the database
            for entry in processed_feed:
                # Create an RSSItem object and store it in the database
                rss_item = RSSItem(
                    guid=uuid.uuid4(),
                    date=entry.get("published", None),
                    json_string=str(entry)
                )
                db.add(rss_item)

        # Commit the transaction if everything is successful
        db.commit()

    except Exception as e:
        db.rollback()
        print(f"An error occurred: {e}")

def start_ingress(interval=300, process_function=None, SessionLocal=None):
    """
    Starts the ingress process to fetch and process feeds at regular intervals.

    Args:
        interval (int): The time interval (in seconds) between each execution of the ingress function. Default is 300 seconds.
        process_function (function, optional): A function to process each feed entry. Defaults to None (no processing).
        SessionLocal (function, optional): A function to create a new session for interacting with the database. Defaults to None.

    Returns:
        BackgroundScheduler: The scheduler instance that runs the feed processing task.
    """
    return start_scheduled_ingress(handle_feeds, interval, process_function, SessionLocal)
