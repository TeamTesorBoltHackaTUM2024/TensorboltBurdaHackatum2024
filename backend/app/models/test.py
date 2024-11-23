from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from app.db_connection import engine

# Base class for models
Base = declarative_base()

# Define the 'Test' model
class Test(Base):
    __tablename__ = 'test'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50))
    email = Column(String(100))

# Create the table in the database
Base.metadata.create_all(bind=engine)