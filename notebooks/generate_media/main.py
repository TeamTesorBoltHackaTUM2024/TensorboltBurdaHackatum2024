import os
import io
import json
import time
from flask import Flask, request, jsonify
from google.cloud import storage
from PIL import Image
from moviepy.editor import ImageClip, concatenate_videoclips
import numpy as np
from dotenv import load_dotenv
from openai import AzureOpenAI
import requests

# Load environment variables
load_dotenv()
openai_api_key = os.getenv("AZURE_OPENAI_API_KEY")
openai_api_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
openai_api_dalle_endpoint = os.getenv("AZURE_OPENAI_DALLE_ENDPOINT")

# Initialize OpenAI clients
dalle_client = AzureOpenAI(
    api_version="2024-02-01",
    api_key=openai_api_key,
    azure_endpoint=openai_api_dalle_endpoint
)

gpt_client = AzureOpenAI(
    api_version="2024-02-01",
    azure_endpoint=openai_api_endpoint,
    api_key=openai_api_key,
)

# Google Cloud Storage setup
GCS_BUCKET_NAME = "image-video-store"
storage_client = storage.Client()
bucket = storage_client.bucket(GCS_BUCKET_NAME)

# Initialize Flask app
app = Flask(__name__)

def upload_to_gcs(file_path, blob_name):
    blob = bucket.blob(blob_name)
    blob.upload_from_filename(file_path)
    return blob.public_url

def generate_image_from_text_dalle(prompt, size="1024x1792", quality="standard"):
    result = dalle_client.images.generate(
        model="dalle3",
        prompt=prompt,
        size=size,
        quality=quality,
        n=1
    )
    json_response = json.loads(result.model_dump_json())
    image_url = json_response["data"][0]["url"]
    generated_image = requests.get(image_url)
    image = Image.open(io.BytesIO(generated_image.content))
    return image

def generate_image_prompts(num_images, titles):
    response = gpt_client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": """
                You are an expert prompt engineer. Generate unique and specific prompts for the titles provided.
            """},
            {"role": "user", "content": f"The titles are: {';'.join(titles)}. Generate {num_images} prompts."}
        ]
    )
    return response.choices[0].message.content.strip().split('\n\n')

def create_video_from_images(images, vid_length, output_path):
    duration = vid_length / len(images)
    clips = [ImageClip(np.array(img)).set_duration(duration) for img in images]
    video = concatenate_videoclips(clips, method="compose")
    video.write_videofile(output_path, fps=1, codec="libx264")

@app.route("/generate-image", methods=["POST"])
def generate_image():
    try:
        data = request.json
        titles = data["titles"]
        prompt = generate_image_prompts(1, titles)[0]
        image = generate_image_from_text_dalle(prompt)
        output_path = "/tmp/generated_image.png"
        image.save(output_path)
        gcs_url = upload_to_gcs(output_path, "generated_image.png")
        return jsonify({"image_url": gcs_url}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/generate-video", methods=["POST"])
def generate_video():
    try:
        data = request.json
        titles = data["titles"]
        num_images = int(data.get("num_images", 4))
        vid_length = int(data.get("vid_length", 16))

        prompts = generate_image_prompts(num_images, titles)
        images = [generate_image_from_text_dalle(prompt) for prompt in prompts]

        output_path = "/tmp/generated_video.mp4"
        create_video_from_images(images, vid_length, output_path)
        gcs_url = upload_to_gcs(output_path, "generated_video.mp4")
        return jsonify({"video_url": gcs_url}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
