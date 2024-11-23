# FastAPI Backend

The source code for our backend application.

## Project Structure

```plaintext
backend/
├── app/
│   ├── main.py
└── requirements.txt
└── Dockerfile.txt
└── compose.yaml
```

- **`app/main.py`**: The entry point of the FastAPI application.
- **`requirements.txt`**: List of dependencies required to run the application.
- **`Dockerfile`**: Script that contains instructions for building a Docker image and its configuration.
- **`compose.yaml`** It is optional for your basic applications. It is a configuration file for Docker Compose that defines services, networks, and volumes for multi-container Docker applications, allowing them to be managed and deployed together.

## Getting Started

Follow these steps to get the application up and running:

### 1. Install Python Requirements
```bash
pip install uv
uv venv --python 3.11
# Activate venv
uv pip install -r requirements.txt
```

### 2. Run the Application

Use Uvicorn to run the FastAPI application:

```bash
uvicorn app.main:app --reload
```

- The `--reload` flag allows the server to restart automatically when code changes.

### 3. Access the API

- Open your web browser and go to: `http://127.0.0.1:8000/`
- You should see a JSON response:

  ```json
  {"message":"Welcome to Backend for Team Tensorbolt for Burda, HackaTUM2024!"}
  ```

### 4. Explore the API Documentation

FastAPI provides interactive API documentation out of the box:

- **Swagger UI**: `http://127.0.0.1:8000/docs`
- **ReDoc**: `http://127.0.0.1:8000/redoc`

## Dockerization

### Build the Docker image:

```bash
docker build -t fastapi-app .
```

### Run the Docker container:

```bash
docker run -d -p 8000:8000 fastapi-app
```

After running the commands, open your browser and go to http://localhost:8000 to see your FastAPI app running.
