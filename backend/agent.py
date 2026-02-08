from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from models import ItineraryRequest, ItineraryResponse, DayPlan, Attraction
import json

async def generate_itinerary_agent(request: ItineraryRequest) -> ItineraryResponse:
    # Initialize LLM
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash-lite", temperature=0.7)

    # Construct the Prompt
    prompt = ChatPromptTemplate.from_messages([
        ("system", """
        You are an expert travel agent. 
        For each day, list 3-4 specific attractions. 
        Optimize the route to minimize travel time (TSP - Traveling Salesman Problem).
        Provide the exact latitude and longitude for each attraction so we can map it.
        
        Return the output strictly as a JSON object matching the following structure:
        {{
            "destination": "destination name",
            "days": [
                {{
                    "day": 1,
                    "attractions": [
                        {{
                            "name": "Attraction Name",
                            "description": "Short description",
                            "time": "10:00 AM",
                            "latitude": 35.6895,
                            "longitude": 139.6917
                        }}
                    ]
                }}
            ]
        }}
        
        Ensure the JSON is valid and contains no preamble.
        """),
        ("human", "Create a {days}-day itinerary for {destination} based on the following interests: {interests}.")
    ])
    
    # Output Parser
    parser = JsonOutputParser(pydantic_object=ItineraryResponse)
    
    chain = prompt | llm | parser
    
    # Execute Chain
    response = chain.invoke({
        "days": request.days,
        "destination": request.destination,
        "interests": ", ".join(request.interests) if request.interests else "general sightseeing"
    })
    
    # Validate and return
    return ItineraryResponse(**response)
