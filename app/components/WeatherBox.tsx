"use client";

import { useEffect, useState } from "react";

type WeatherState = {
  temperature?: number;
  windSpeed?: number;
  weatherCode?: number;
  locationLabel?: string;
  error?: string;
};

const FALLBACK_LOCATION = {
  latitude: 43.3543,
  longitude: -80.3144,
  label: "Galt, ON",
};

function weatherCodeToText(code?: number) {
  const map: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Rain showers",
    81: "Rain showers",
    82: "Heavy showers",
    95: "Thunderstorm",
  };

  return map[code ?? -1] ?? "Unknown";
}

export default function WeatherBox() {
  const [weather, setWeather] = useState<WeatherState>({
    locationLabel: "Loading...",
  });

  useEffect(() => {
    async function fetchWeather(latitude: number, longitude: number, label: string) {
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
          `&longitude=${longitude}` +
          `&current=temperature_2m,weather_code,wind_speed_10m` +
          `&timezone=auto`;

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Unable to load weather");
        }

        const data = await res.json();

        setWeather({
          temperature: data?.current?.temperature_2m,
          windSpeed: data?.current?.wind_speed_10m,
          weatherCode: data?.current?.weather_code,
          locationLabel: label,
        });
      } catch {
        setWeather({
          error: "Unable to load weather right now.",
          locationLabel: label,
        });
      }
    }

    if (!navigator.geolocation) {
      fetchWeather(
        FALLBACK_LOCATION.latitude,
        FALLBACK_LOCATION.longitude,
        FALLBACK_LOCATION.label
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(
          position.coords.latitude,
          position.coords.longitude,
          "Your location"
        );
      },
      () => {
        fetchWeather(
          FALLBACK_LOCATION.latitude,
          FALLBACK_LOCATION.longitude,
          FALLBACK_LOCATION.label
        );
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
    );
  }, []);

  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <h3 className="mb-2 text-sm font-semibold text-gray-700">Weather</h3>

      <p className="mb-2 text-xs text-gray-500">{weather.locationLabel}</p>

      {weather.error ? (
        <p className="text-sm text-red-600">{weather.error}</p>
      ) : weather.temperature === undefined ? (
        <p className="text-sm text-gray-600">Loading weather...</p>
      ) : (
        <div className="space-y-1 text-sm text-gray-800">
          <div>
            <span className="font-medium">Condition:</span>{" "}
            {weatherCodeToText(weather.weatherCode)}
          </div>
          <div>
            <span className="font-medium">Temperature:</span>{" "}
            {weather.temperature}°C
          </div>
          <div>
            <span className="font-medium">Wind:</span>{" "}
            {weather.windSpeed} km/h
          </div>
        </div>
      )}
    </div>
  );
}