from typing import List  # Import List for type annotations
from fastapi import APIRouter, FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.test import Test
from app.db_connection import get_db

router = APIRouter(
    prefix="/test",
    tags=["Test Endpoint to check Database"],
    responses={404: {"description": "Not found"}},
)

# Route to create a new user in the 'test' table
@router.post("/", response_model=dict)
def create_user(name: str, email: str, db: Session = Depends(get_db)):
    # Create a new user
    db_user = Test(name=name, email=email)
    
    # Add the user to the session and commit
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return {"id": db_user.id, "name": db_user.name, "email": db_user.email}

# Route to get a user by name
@router.get("/{name}", response_model=dict)
def get_user(name: str, db: Session = Depends(get_db)):
    # Query the user by name
    db_user = db.query(Test).filter(Test.name == name).first()
    
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"id": db_user.id, "name": db_user.name, "email": db_user.email}

# New Route to get all users
@router.get("/", response_model=List[dict])
def get_all_users(db: Session = Depends(get_db)):
    # Query all users
    users = db.query(Test).all()

    # If no users found, you might want to return an empty list or raise an exception
    if not users:
        return []
        # Alternatively, uncomment the following line to raise a 404 error
        # raise HTTPException(status_code=404, detail="No users found")

    # Return a list of user dictionaries
    return [{"id": user.id, "name": user.name, "email": user.email} for user in users]
