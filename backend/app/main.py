from fastapi import Depends, FastAPI
from fastapi.concurrency import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from app.routers import generate
from app.settings import settings

# App definition
app = FastAPI(
    title="Tensorbolt Burda: Backend API",
    description="CRUD endpoints for Team Tensorbolt's solution for Burda, HackaTUM2024"
)

# Adding CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,  # You can restrict this to specific origins
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Health Check
@app.get("/", tags=["Health"])
def root():
    return {"message": "Welcome to Backend for Team Tensorbolt for Burda, HackaTUM2024!"}

# Routers
app.include_router(generate.router)
