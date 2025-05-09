// components/WeeklyForecast.tsx
import React, { useState, useEffect } from "react";
import { getFiveDayForecast } from "@/lib/weatherApi";

interface DailyForecast {
  date: string;
  tempMin: number;
  tempMax: number;
  summary: string;
  icon: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hourlyData: any[];
}

export default function WeeklyForecast({ city }: { city: string }) {
  const [forecastData, setForecastData] = useState<DailyForecast[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [hourlyData, setHourlyData] = useState<any[]>([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFiveDayForecast(city);
        const groupedData = groupByDate(data.list);
        setForecastData(groupedData);

        const todayForecast = groupedData.find((day) => day.date === today);
        if (todayForecast) {
          setHourlyData(todayForecast.hourlyData);
          setSelectedDate(todayForecast.date);
        }
      } catch (error) {
        console.error("Error fetching forecast:", error);
      }
    };

    fetchData();
  }, [city, today]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupByDate = (list: any[]) => {
    const grouped: DailyForecast[] = [];
    
    list.forEach((entry) => {
      const date = entry.dt_txt.split(" ")[0]; // Extract the date part (YYYY-MM-DD)
      const existing = grouped.find((item) => item.date === date);

      if (existing) {
        existing.tempMin = Math.min(existing.tempMin, entry.main.temp_min);
        existing.tempMax = Math.max(existing.tempMax, entry.main.temp_max);
        existing.icon = entry.weather[0].icon;
        existing.summary = entry.weather[0].description;
        existing.hourlyData.push(entry); 
      } else {
        grouped.push({
          date,
          tempMin: entry.main.temp_min,
          tempMax: entry.main.temp_max,
          summary: entry.weather[0].description,
          icon: entry.weather[0].icon,
          hourlyData: [entry],
        });
      }
    });

    return grouped;
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    const selectedData = forecastData.find((data) => data.date === date);
    setHourlyData(selectedData ? selectedData.hourlyData : []);
  };

  return (
    <div className="w-full bg-white dark:bg-[#242424]  rounded-2xl p-2 flex flex-col gap-4">
      <div className="flex gap-2 overflow-x-auto">
        {forecastData.map((day) => (
          <div
            key={day.date}
            className="bg-gray-100 p-4 rounded-xl min-w-[80px] max-w-[120px] text-center cursor-pointer"
            onClick={() => handleDateClick(day.date)}
          >
            <p>{day.date}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.summary}
              className="mx-auto my-2"
            />
            <p>{Math.round(day.tempMin)}° / {Math.round(day.tempMax)}°</p>
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="overflow-y-auto max-h-[300px]">
          <h3 className="text-xl font-bold">Hourly Forecast for {selectedDate}</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8 pt-2 gap-2">
            {hourlyData.map((hour, index) => (
              <div key={index} className="text-center p-2 bg-gray-100 rounded-xl">
                <p>{new Date(hour.dt_txt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                  alt={hour.weather[0].description}
                  className="mx-auto my-2"
                />
                <p>{Math.round(hour.main.temp)}°</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
