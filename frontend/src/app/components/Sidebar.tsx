"use client";

import { useState } from "react";
import { Plane, MapPin, Calendar, Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Itinerary, ItineraryRequest } from "@/types";

interface SidebarProps {
  onGenerate: (data: ItineraryRequest) => void;
  isLoading: boolean;
  itinerary: Itinerary | null;
  selectedDay: number | null;
  onDaySelect: (day: number | null) => void;
}

export default function Sidebar({
  onGenerate,
  isLoading,
  itinerary,
  selectedDay,
  onDaySelect,
}: SidebarProps) {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("3");
  const [interests, setInterests] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      destination,
      days: parseInt(days),
      interests: interests.split(",").map((i) => i.trim()),
    });
  };

  return (
    <div className="w-full md:w-[400px] h-full flex flex-col bg-midnight-900/80 backdrop-blur-2xl border-r border-white/5 shadow-2xl relative z-20">
      {/* Header */}
      <div className="p-8 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple p-[1px] shadow-lg shadow-neon-cyan/20 group">
            <div className="w-full h-full bg-midnight-900/90 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-midnight-900/50 transition-all">
              <Plane className="text-white w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              VoyageAI
            </h1>
            <p className="text-xs font-medium text-gray-400 tracking-wider uppercase">
              AI Travel Planner
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 group">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 group-focus-within:text-neon-cyan transition-colors">
              Destination
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="w-5 h-5 text-gray-400 group-focus-within:text-neon-cyan transition-colors" />
              </div>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Ex: Tokyo, Paris, New York"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50 transition-all shadow-inner hover:bg-white/10"
                required
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 group-focus-within:text-neon-purple transition-colors">
              Duration (Days)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-400 group-focus-within:text-neon-purple transition-colors" />
              </div>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                min="1"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple/50 transition-all shadow-inner hover:bg-white/10"
                required
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 group-focus-within:text-neon-pink transition-colors">
              Interests
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400 group-focus-within:text-neon-pink transition-colors" />
              </div>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="Ex: Art, Sushi, History"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-pink/50 focus:border-neon-pink/50 transition-all shadow-inner hover:bg-white/10"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-neon-cyan/90 hover:bg-neon-cyan rounded-2xl font-bold text-white shadow-lg shadow-neon-cyan/20 hover:shadow-neon-cyan/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg tracking-wide group"
          >
            {isLoading ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : (
              <>
                <span>Generate Itinerary</span>
                <Plane className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Itinerary Display */}
        <AnimatePresence>
          {itinerary && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4 pt-6 border-t border-white/10"
            >
              <div className="flex items-center justify-between mb-6 px-1">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="bg-clip-text text-white bg-gradient-to-r from-neon-cyan to-white">
                    Your Trip
                  </span>
                </h3>
                {selectedDay && (
                  <button
                    onClick={() => onDaySelect(null)}
                    className="text-xs font-bold text-white hover:text-white transition-colors bg-neon-cyan/10 px-3 py-1.5 rounded-full hover:bg-neon-cyan/20"
                  >
                    View Full Trip
                  </button>
                )}
              </div>

              <div className="space-y-4 pb-4">
                {itinerary.days.map((day) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: day.day * 0.1 }}
                    onClick={() =>
                      onDaySelect(selectedDay === day.day ? null : day.day)
                    }
                    className={`rounded-2xl p-5 border transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                      selectedDay === day.day
                        ? "bg-gradient-to-br from-midnight-800 to-midnight-900 border-neon-cyan shadow-lg shadow-neon-cyan/10 ring-1 ring-neon-cyan/50"
                        : "bg-midnight-800/30 border-white/5 hover:border-white/10 hover:bg-midnight-800/50 hover:shadow-xl hover:-translate-y-1"
                    }`}
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/0 via-white/5 to-neon-cyan/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <h4
                        className={`font-bold text-lg transition-colors flex items-center gap-2 ${
                          selectedDay === day.day
                            ? "text-neon-cyan"
                            : "text-gray-200 group-hover:text-white"
                        }`}
                      >
                        <span
                          className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm ${
                            selectedDay === day.day
                              ? "bg-neon-cyan text-midnight-900"
                              : "bg-white/10 text-gray-400"
                          }`}
                        >
                          {day.day}
                        </span>
                        <span className="opacity-90">Day {day.day}</span>
                      </h4>
                    </div>

                    <div className="space-y-4 relative z-10 pl-2 border-l-2 border-white/5 ml-3">
                      {day.attractions.map((attr, idx) => (
                        <div key={idx} className="flex gap-4 group/item">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-300 ${
                                selectedDay === day.day
                                  ? "bg-neon-cyan shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                                  : "bg-gray-600 group-hover/item:bg-neon-purple"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-200 font-medium text-sm group-hover/item:text-white transition-colors">
                              {attr.name}
                            </p>
                            <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed group-hover/item:text-gray-400">
                              {attr.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
