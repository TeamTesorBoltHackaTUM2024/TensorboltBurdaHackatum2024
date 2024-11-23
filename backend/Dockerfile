# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file (if you have one) and install any dependencies
# In this case, you'll install FastAPI and Uvicorn to run the app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . .

# Expose the port that FastAPI will be running on (default is 8000)
EXPOSE 8000

# Command to run the FastAPI app using Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
