from typing import List
from typing import Optional
from sqlalchemy import ForeignKey, String, DateTime, Text
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from app.db_connection import engine

from pydantic import BaseModel, HttpUrl
from sqlalchemy.exc import SQLAlchemyError

# Base class for models
Base = declarative_base()

class FeedURL(Base):
    __tablename__ = "FeedURL"

    link: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    etag: Mapped[Optional[str]]

    def __repr__(self) -> str:
        return f"FeedURL(link={self.link!r}, name={self.name!r}, etag={self.etag!r})"

class RSSItem(Base):
    __tablename__ = "RSSItem"

    guid: Mapped[str] = mapped_column(primary_key=True)
    date: Mapped[datetime] = mapped_column(DateTime)
    json_string: Mapped[str] = mapped_column(Text)

    feed_url_link: Mapped[str] = mapped_column(ForeignKey("FeedURL.link"))

    def __repr__(self) -> str:
        return f"RSSItem(guid={self.guid!r}, date={self.date!r}, json_string={self.json_string[:100]!r}...)"

# Pydantic model for the POST request body
class FeedCreate(BaseModel):
    link: HttpUrl
    name: str


# Create the table in the database
Base.metadata.create_all(bind=engine)