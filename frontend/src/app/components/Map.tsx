"use client";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useMemo, useEffect, useState, useCallback } from "react";
import { Itinerary } from "@/types";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 35.6762,
  lng: 139.6503, // Tokyo
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

interface MapProps {
  itinerary: Itinerary | null;
  selectedDay: number | null;
}

interface MapMarker {
  position: { lat: number; lng: number };
  title: string;
  day: number;
}

export default function Map({ itinerary, selectedDay }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const markers = useMemo(() => {
    if (!itinerary) return [];

    let allMarkers: MapMarker[] = [];
    itinerary.days.forEach((day) => {
      day.attractions.forEach((attr) => {
        if (attr.latitude && attr.longitude) {
          allMarkers.push({
            position: { lat: attr.latitude, lng: attr.longitude },
            title: attr.name,
            day: day.day,
          });
        }
      });
    });

    if (selectedDay !== null) {
      allMarkers = allMarkers.filter((m) => m.day === selectedDay);
    }

    return allMarkers;
  }, [itinerary, selectedDay]);

  // Determine center based on markers
  const center = useMemo(() => {
    if (markers.length > 0) {
      return markers[0].position;
    }
    return defaultCenter;
  }, [markers]);

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      const bounds = new window.google.maps.LatLngBounds();
      // if markers, fit bounds
      if (markers.length > 0) {
        markers.forEach((marker) => bounds.extend(marker.position));
        map.fitBounds(bounds);
      }
      setMap(map);
    },
    [markers],
  );

  useEffect(() => {
    if (map && markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => bounds.extend(marker.position));
      map.fitBounds(bounds);
    }
  }, [map, markers]);

  // Manually manage Polyline to ensure it clears correctly
  useEffect(() => {
    if (!map) return;

    if (markers.length > 1) {
      const line = new window.google.maps.Polyline({
        path: markers.map((m) => m.position),
        geodesic: true,
        strokeColor: "#06b6d4",
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: map,
      });

      return () => {
        line.setMap(null); // Explicitly remove line on cleanup
      };
    }
  }, [map, markers, itinerary, selectedDay]); // Re-run when these change

  if (!isLoaded)
    return (
      <div className="w-full h-full bg-midnight-900 flex items-center justify-center text-gray-500">
        Loading Map...
      </div>
    );

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      options={mapOptions}
      onLoad={onLoad}
    >
      {markers.map((marker, idx) => (
        <Marker
          key={idx}
          position={marker.position}
          title={marker.title}
          animation={window.google.maps.Animation.DROP}
        />
      ))}
    </GoogleMap>
  );
}
