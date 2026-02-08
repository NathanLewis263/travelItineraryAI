from pydantic import BaseModel
from typing import List, Optional

class Interest(BaseModel):
    name: str

class ItineraryRequest(BaseModel):
    destination: str
    days: int
    interests: Optional[List[str]] = None

class Attraction(BaseModel):
    name: str
    description: str
    time: str
    latitude: float
    longitude: float

class DayPlan(BaseModel):
    day: int
    attractions: List[Attraction]

class ItineraryResponse(BaseModel):
    destination: str
    days: List[DayPlan]
