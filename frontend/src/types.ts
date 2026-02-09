export interface Attraction {
  name: string;
  description: string;
  time: string;
  latitude: number;
  longitude: number;
}

export interface DayPlan {
  day: number;
  attractions: Attraction[];
}

export interface Itinerary {
  destination: string;
  days: DayPlan[];
}

export interface ItineraryRequest {
  destination: string;
  days: number;
  interests: string[];
}
