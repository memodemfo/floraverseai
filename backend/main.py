from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from PIL import Image
import numpy as np

from recommendations import disease_info
from database.db import supabase

from pydantic import BaseModel
from datetime import date, datetime
import httpx

# -------------------------
# CREATE FASTAPI APP
# -------------------------

app = FastAPI(title="FloraVerse AI", version="1.0.0")

# -------------------------
# CORS MIDDLEWARE
# -------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# PLANT MODEL
# -------------------------

class Plant(BaseModel):

    plant_name: str

    species: str

    date_planted: date

    health_score: int

    watering_frequency: int

# -------------------------
# LOAD TRAINED MODEL
# -------------------------

model = tf.keras.models.load_model(
    "model/plant_disease_model.h5"
)

# -------------------------
# CLASS LABELS
# -------------------------

classes = [
    "Pepper_Bacterial_Spot",
    "Pepper_Healthy",
    "Potato_Early_Blight",
    "Potato_Late_Blight",
    "Potato_Healthy",
    "Tomato_Bacterial_Spot",
    "Tomato_Early_Blight",
    "Tomato_Late_Blight"
]

# -------------------------
# PLANT GROWTH DATA
# -------------------------

growth_days = {

    "Tomato": 90,

    "Potato": 70,

    "Pepper": 80,

    "Strawberry": 60
}

# -------------------------
# IMAGE PREPROCESSING
# -------------------------

def preprocess_image(image):

    # Resize image
    image = image.resize((224, 224))

    # Convert image to numpy
    image = np.array(image) / 255.0

    # Add batch dimension
    image = np.expand_dims(image, axis=0)

    return image

# -------------------------
# GROWTH STAGE CALCULATION
# -------------------------

def calculate_growth_stage(date_planted):

    planted_date = datetime.strptime(
        str(date_planted),
        "%Y-%m-%d"
    )

    current_date = datetime.now()

    days = (current_date - planted_date).days

    if days < 10:
        return "Seedling"

    elif days < 30:
        return "Vegetative"

    elif days < 60:
        return "Flowering"

    else:
        return "Harvest Ready"

# -------------------------
# HARVEST ESTIMATION
# -------------------------

def estimate_harvest(species, date_planted):

    planted_date = datetime.strptime(
        str(date_planted),
        "%Y-%m-%d"
    )

    current_date = datetime.now()

    days_passed = (
        current_date - planted_date
    ).days

    total_growth_days = growth_days.get(
        species,
        90
    )

    remaining_days = total_growth_days - days_passed

    if remaining_days < 0:
        remaining_days = 0

    return remaining_days

# -------------------------
# WATERING CHECK
# -------------------------

def needs_watering(last_watered, frequency):

    last_watered_date = datetime.strptime(
        str(last_watered),
        "%Y-%m-%d"
    )

    current_date = datetime.now()

    days_since_watered = (
        current_date - last_watered_date
    ).days

    return days_since_watered >= frequency

# -------------------------
# HOME ROUTE
# -------------------------

@app.get("/")
def home():

    return {
        "message": "FloraVerse AI Backend Running"
    }

# -------------------------
# PREDICTION ROUTE
# -------------------------

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Open uploaded image
    image = Image.open(file.file)

    # Preprocess image
    processed_image = preprocess_image(image)

    # Predict
    prediction = model.predict(processed_image)

    # Get class index
    predicted_class = np.argmax(prediction)

    # Get confidence
    confidence = float(np.max(prediction))

    # -------------------------
    # UNKNOWN DETECTION
    # -------------------------

    if confidence < 0.70:

        return {
            "message": "Unknown or unsupported plant/disease",
            "confidence": confidence
        }

    # -------------------------
    # GET RECOMMENDATIONS
    # -------------------------

    recommendation = disease_info.get(
        classes[predicted_class],
        {}
    )

    # -------------------------
    # FINAL RESPONSE
    # -------------------------

    return {

        "disease": classes[predicted_class],

        "confidence": confidence,

        "recommendations": recommendation
    }

# -------------------------
# ADD PLANT ROUTE
# -------------------------

@app.post("/add-plant")
async def add_plant(plant: Plant):

    # Calculate growth stage
    growth_stage = calculate_growth_stage(
        plant.date_planted
    )

    # Estimate harvest
    estimated_harvest = estimate_harvest(
        plant.species,
        plant.date_planted
    )

    # Plant data
    data = {

        "plant_name": plant.plant_name,

        "species": plant.species,

        "date_planted": str(plant.date_planted),

        "health_score": plant.health_score,

        "growth_stage": growth_stage,

        "estimated_harvest_days": estimated_harvest,

        "watering_frequency": plant.watering_frequency,

        "last_watered": str(date.today())
    }

    # Insert into Supabase
    response = supabase.table(
        "plants"
    ).insert(data).execute()

    return response.data

# -------------------------
# GET ALL PLANTS ROUTE
# -------------------------

@app.get("/plants")
async def get_plants():

    response = supabase.table(
        "plants"
    ).select("*").execute()

    return response.data

# -------------------------
# DELETE PLANT ROUTE
# -------------------------

@app.delete("/plants/{plant_id}")
async def delete_plant(plant_id: int):
    response = supabase.table(
        "plants"
    ).delete().eq("id", plant_id).execute()
    return {"deleted": True, "id": plant_id}

# -------------------------
# PLANT ALERTS ROUTE
# -------------------------

@app.get("/plant-alerts")
async def plant_alerts():

    response = supabase.table(
        "plants"
    ).select("*").execute()

    plants = response.data

    alerts = []

    for plant in plants:

        if needs_watering(
            plant["last_watered"],
            plant["watering_frequency"]
        ):

            alerts.append({

                "plant_name": plant["plant_name"],

                "alert": "Needs watering"
            })

    return alerts

# -------------------------
# CHAT MODEL
# -------------------------

class ChatRequest(BaseModel):
    message: str

OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "llama3"

SYSTEM_PROMPT = """You are Flora, an expert AI plant care companion for the FloraVerse app. You have deep knowledge of:
- Plant diseases, pests, and treatments
- Watering, fertilizing, and soil science
- Indoor/outdoor gardening for 50+ species
- Propagation, pruning, and harvest timing
- Climate, humidity, and light requirements
- Companion planting and organic methods

Rules:
- Be warm, calm, and wise like a forest sage.
- Give specific, actionable advice.
- Use bullet points and bold for clarity.
- Keep responses concise (under 200 words).
- Use plant emojis sparingly.
- If unsure, suggest using the FloraVerse AI Scanner for image diagnosis."""

@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                OLLAMA_URL,
                json={
                    "model": OLLAMA_MODEL,
                    "prompt": req.message,
                    "system": SYSTEM_PROMPT,
                    "stream": False
                }
            )
            data = response.json()
            return {
                "response": data.get("response", "I couldn't process that. Try again."),
                "model": OLLAMA_MODEL
            }
    except Exception as e:
        return {
            "response": None,
            "error": str(e)
        }