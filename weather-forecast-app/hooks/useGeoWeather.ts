import { useEffect, useState } from 'react';
import { WeatherData } from '@/types/weather';

export default function useGeoWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
          );
          if (!res.ok) throw new Error('Failed to fetch location weather');
          const data = await res.json();

          const mappedData: WeatherData = {
            name: data.name,
            main: {
              temp: data.main.temp,
              feels_like: data.main.feels_like,
              temp_min: data.main.temp_min,
              temp_max: data.main.temp_max,
              humidity: data.main.humidity,
              pressure: data.main.pressure,
            },
            weather: data.weather,
            wind: {
              speed: data.wind.speed,
            },
            sys: {
              sunrise: data.sys.sunrise,
              sunset: data.sys.sunset,
              country: data.sys.country,
            },
          };

          setWeather(mappedData);
        } catch {
          setError('Could not fetch location weather.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Geolocation permission denied.');
        setLoading(false);
      }
    );
  }, []);

  return { weather, loading, error };
}
