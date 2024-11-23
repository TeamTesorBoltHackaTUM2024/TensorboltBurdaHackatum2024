from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import create_engine
from google.cloud.sql.connector import Connector
from app.settings import settings

# Initialize the Cloud SQL connector
connector = Connector()

# Function to get database connection using the Cloud SQL connector
def get_db_connection():
    # Ensure you're connecting with the correct instance connection name
    connection_name = settings.DB_CONNECTION_NAME  # Ensure this is correctly set to your Cloud SQL instance
    db_user = settings.DB_USER
    db_pass = settings.DB_PASS
    db_name = settings.DB_NAME

    # Connect using IAM authentication or public/private IP, depending on your configuration
    conn = connector.connect(
        connection_name,
        "pg8000",
        user=db_user,
        password=db_pass,
        db=db_name,
    )
    return conn

# Create the SQLAlchemy engine using the connection
engine = create_engine(
    f"postgresql+pg8000://{settings.DB_USER}:{settings.DB_PASS}@/{settings.DB_NAME}?host=/cloudsql/{settings.DB_CONNECTION_NAME}",
    creator=get_db_connection,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency to get DB session
def get_db():
    try:
        db = SessionLocal()
        yield db
    except Exception as e:
        print(f"Database connection error: {e}")
        yield None
    finally:
        db.close()
