"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import { Itinerary, ItineraryRequest } from "@/types";

export default function Home() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const handleGenerate = async (data: ItineraryRequest) => {
    setIsLoading(true);
    setItinerary(null);
    setSelectedDay(null);
    try {
      const response = await fetch("http://localhost:8000/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to generate itinerary");
      }

      const result = await response.json();
      console.log("Itinerary Result:", result);
      setItinerary(result);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate itinerary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-midnight-900 font-sans">
      {/* Left Sidebar */}
      <div className="w-full md:w-[400px] flex-shrink-0 h-full relative z-10 shadow-2xl">
        <Sidebar
          onGenerate={handleGenerate}
          isLoading={isLoading}
          itinerary={itinerary}
          selectedDay={selectedDay}
          onDaySelect={setSelectedDay}
        />
      </div>

      {/* Right Map Area */}
      <div className="flex-1 h-full relative">
        <Map itinerary={itinerary} selectedDay={selectedDay} />

        {/* Overlay Gradient for better integration */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-midnight-900/50 to-transparent pointer-events-none z-0" />
      </div>
    </main>
  );
}
