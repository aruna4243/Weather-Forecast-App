"use client";
import {  useState } from "react";
import { WeatherData } from "@/types/weather";
import {
  FaMapMarkerAlt,
  FaWind,
  FaTint,
  FaThermometerHalf,
  FaSun,
  FaMoon,
  FaSearch,
} from "react-icons/fa";

function formatTime(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

interface WeatherCardProps {
  data: WeatherData;
  onSearch: (query: string) => void;

}

export default function WeatherCard({ data, onSearch }: WeatherCardProps) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<{ city: string; region: string; country: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // useEffect(() => {
  //   const fetchSuggestions = async () => {
  //     if (!input.trim()) return setSuggestions([]);

  //     try {
  //       const response = await fetch(
  //         `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${input}&limit=5&sort=-population`,
  //         {
  //           headers: {
  //             "X-RapidAPI-Key": process.env.NEXT_PUBLIC_GEODB_API_KEY || "",
  //             "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  //           },
  //         }
  //       );
  //       const data = await response.json();

  //       // Check if 'data.data' exists and is an array
  //       if (data && Array.isArray(data.data)) {
  //         setSuggestions(
  //           // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //           data.data.map((item: any) => ({
  //             city: item.name,
  //             region: item.region,
  //             country: item.country,
  //           }))
  //         );
  //       } else {
  //         setSuggestions([]); // Fallback to empty suggestions
  //       }
  //     } catch (error) {
  //       console.error("Error fetching suggestions:", error);
  //       setSuggestions([]); // Fallback in case of API error
  //     }
  //   };

  //   const debounce = setTimeout(fetchSuggestions, 300);
  //   return () => clearTimeout(debounce);
  // }, [input]);

  const handleSearch = (query: string) => {
    onSearch(query);
    setInput("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className=" h-fit   p-6 w-full flex flex-col gap-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-500" />
          <div>
            <h2 className="text-xl font-bold">{data.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {data.state ? `${data.state}, ` : ""}{data.sys.country}
            </p>
          </div>
        </div>

        <div className="relative w-60">
          <div className="flex border rounded-md overflow-hidden dark:border-gray-600">
            <input
              type="text"
              placeholder="Search city..."
              className="px-3 py-1 text-sm w-full dark:bg-[#424242] border-none focus:outline-none"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) handleSearch(input.trim());
              }}
            />
            <button
              onClick={() => input.trim() && handleSearch(input.trim())}
              className="px-3 text-gray-500 hover:text-gray-700 dark:hover:text-white"
            >
              <FaSearch />
            </button>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white dark:bg-[#424242] w-full border rounded-md mt-1 max-h-48 overflow-auto text-sm shadow">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleSearch(`${s.city}, ${s.region}, ${s.country}`)}
                >
                  {s.city}, {s.region}, {s.country}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Weather Info */}
      <div className="flex items-center gap-4">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-16 h-16"
        />
        <div>
          <h3 className="text-4xl font-semibold">{Math.round(data.main.temp)}°C</h3>
          <p className="capitalize text-gray-600 dark:text-gray-300">
            {data.weather[0].description}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <FaThermometerHalf className="text-orange-500" />
          <span>Feels Like: {Math.round(data.main.feels_like)}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <FaWind className="text-cyan-500" />
          <span>Wind: {data.wind.speed} m/s</span>
        </div>
        <div className="flex items-center gap-2">
          <FaTint className="text-blue-400" />
          <span>Humidity: {data.main.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <FaSun className="text-yellow-500" />
          <span>Sunrise: {formatTime(data.sys.sunrise)}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaThermometerHalf className="text-red-400" />
          <span>High: {Math.round(data.main.temp_max)}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <FaThermometerHalf className="text-blue-400" />
          <span>Low: {Math.round(data.main.temp_min)}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <FaMoon className="text-purple-500" />
          <span>Sunset: {formatTime(data.sys.sunset)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Pressure: {data.main.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
}
