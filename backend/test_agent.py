import asyncio
import os
from dotenv import load_dotenv
from agent import generate_itinerary_agent
from models import ItineraryRequest

# Load environment variables (API keys)
load_dotenv()

async def test_console():
    print("--- VoyageAI Console Test ---")

    # Check for correct API key
    if not os.getenv("GOOGLE_API_KEY"):
        print("Error: GOOGLE_API_KEY is missing in .env")
        return
  
    dest = input("Enter Destination (e.g. Tokyo): ")
    days = input("Enter Duration (days, default 3): ")
    interests_input = input("Enter Interests (comma separated, optional): ")
    
    interests = [i.strip() for i in interests_input.split(",")] if interests_input else None
    
    print(f"\nGenerating itinerary for {dest} ({days} days)...")
    
    req = ItineraryRequest(
        destination=dest, 
        days=int(days), 
        interests=interests
    )
    
    try:
        result = await generate_itinerary_agent(req)
        print("\n--- Generation Success! ---\n")
        print(result.model_dump_json(indent=2))
    except Exception as e:
        print(f"\nError: {e}")

if __name__ == "__main__":
    asyncio.run(test_console())
