// "use client"
// import { useState } from 'react';
// import WeatherCard from  "@/components/WeatherDashboard/weatherCard";
// import SearchBar from '@/components/WeatherDashboard/searchBar';
// import useGeoWeather from '@/hooks/useGeoWeather';

// import { getWeatherByCity } from '@/lib/weatherApi';
// import { WeatherData } from '@/types/weather';
// export default function Home() {
//   const { weather: geoWeather, loading, error } = useGeoWeather();

//  // Adjust the path as needed

//   const [cityWeather, setCityWeather] = useState<WeatherData | null>(null);
  
//   const [searchError, setSearchError] = useState('');

//   const handleSearch = async (query: string) => {
//     try {
//       const data = await getWeatherByCity(query);
//       setCityWeather(data);
//       setSearchError('');
//     } catch {
//       setSearchError('Location not found.');
//     }
//   };

//   const displayWeather = cityWeather || geoWeather;

//   return (
//     <div className="p-4 dark:bg-[#121212] min-h-screen text-gray-900 dark:text-white">
//       <div className="mb-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Weather Forecast</h1>
//         <SearchBar onSearch={handleSearch} />
//       </div>
//       {loading && <p>Loading location weather...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {searchError && <p className="text-red-500">{searchError}</p>}
//       {displayWeather && <WeatherCard data={displayWeather} />}
//     </div>
//   );
// }
"use client";
import WeatherDashboard from "@/components/WeatherDashboard/weatherDashboard";

export default function Home() {
  return <WeatherDashboard />;
}
