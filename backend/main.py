from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import ItineraryRequest, ItineraryResponse
from agent import generate_itinerary_agent
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="VoyageAI Backend")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "VoyageAI Backend is running"}

@app.post("/generate-itinerary", response_model=ItineraryResponse)
async def generate_itinerary(request: ItineraryRequest):
    try:
        itinerary = await generate_itinerary_agent(request)
        return itinerary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
