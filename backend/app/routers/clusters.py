from fastapi import APIRouter
import json
from app.settings import settings

router = APIRouter(
    prefix="/cluster",
    tags=["Generate Article"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def get_clusters():
    """
    Load and return the content of clusters.json
    """
    try:
        file_path = "./clusters.json"
        with open(file_path, "r") as file:
            clusters = json.load(file)
        return {"status": "success", "data": clusters}
    except FileNotFoundError:
        return {"status": "error", "message": "clusters.json not found"}
    except json.JSONDecodeError:
        return {"status": "error", "message": "Failed to decode clusters.json"}
