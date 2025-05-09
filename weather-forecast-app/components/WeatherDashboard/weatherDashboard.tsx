"use client";
import { useState } from "react";
import Header from "./header";
import WeatherCard from "./weatherCard";
import WeeklyForecast from "./weeklyForecast";
import Footer from "./footer";
import useGeoWeather from "@/hooks/useGeoWeather";
import { getWeatherByCity } from "@/lib/weatherApi";
import { WeatherData } from "@/types/weather";
import Highlights from "./highlights";

export default function WeatherDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const { weather: geoWeather, loading, error } = useGeoWeather();
  const [cityWeather, setCityWeather] = useState<WeatherData | null>(null);
  const [searchError, setSearchError] = useState("");
  const [city, setCity] = useState("London");


  const handleSearch = async (query: string) => {
    try {
      const data = await getWeatherByCity(query);
      setCityWeather(data);
      setCity(query);
      setSearchError("");
    } catch {
      setSearchError("Location not found.");
    }
  };

  const displayWeather = cityWeather || geoWeather;

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-[#eceff1] dark:bg-[#424242]  text-black dark:text-[#f5f5f5] flex flex-col">
        {/* Header */}
        
        <Header  darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="flex-grow grid grid-cols-1 md:grid-cols-12 p-2 px-4 gap-4">
          {/* Card 1*/}
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-4 overflow-auto md:col-span-4">
            {loading && <p>Loading weather data...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {searchError && <p className="text-red-500">{searchError}</p>}
            {displayWeather ? (
              <WeatherCard data={displayWeather} onSearch={handleSearch} />
            ) : (
              <p>No weather data available.</p>
            )}
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-2 overflow-auto md:col-span-6">
           
          <WeeklyForecast city={city} />
          </div>
            {/* Card 3 */}
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-4 overflow-auto md:col-span-2">
            {loading && <p>Loading weather data...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {searchError && <p className="text-red-500">{searchError}</p>}
            {displayWeather ? (
              <WeatherCard data={displayWeather} onSearch={handleSearch} />
            ) : (
              <p>No weather data available.</p>
            )}
          </div>
            {/* Card 4 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-4 overflow-auto md:col-span-7">
            {displayWeather && <Highlights data={displayWeather} />}
          </div>

          {/* Card 5 */}
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-4 overflow-auto md:col-span-5">
          <WeeklyForecast city={city} />
          </div>
        </main>
        
       
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
