// components/Highlights.tsx
import { WeatherData } from "@/types/weather";
import { Line } from "react-chartjs-2"; // Import chart component from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { WiHumidity, WiStrongWind, WiBarometer, WiThermometer } from "react-icons/wi"; // Optional weather icons

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type HighlightsProps = {
  data: WeatherData;
};

export default function Highlights({ data }: HighlightsProps) {
  const { wind, main,  visibility } = data;

  // Sample historical data (should be replaced with actual historical data)
  const historicalWindData = [2, 3, 4, 5, 4, 3]; // Example: past 6 hours of wind speeds
  const historicalHumidityData = [30, 35, 40, 38, 36, 33]; // Example: past 6 hours of humidity
  const historicalPressureData = [1015, 1013, 1010, 1012, 1014, 1016]; // Example: past 6 hours of pressure

  // Create the chart data for wind speed
  const windChartData = {
    labels: ["1h", "2h", "3h", "4h", "5h", "6h"], // Labels for hours
    datasets: [
      {
        label: "Wind Speed (m/s)",
        data: historicalWindData,
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Background color for the line
        tension: 0.4, // Smoothness of the line
      },
    ],
  };

  // Create the chart data for humidity
  const humidityChartData = {
    labels: ["1h", "2h", "3h", "4h", "5h", "6h"], // Labels for hours
    datasets: [
      {
        label: "Humidity (%)",
        data: historicalHumidityData,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Create the chart data for pressure
  const pressureChartData = {
    labels: ["1h", "2h", "3h", "4h", "5h", "6h"], // Labels for hours
    datasets: [
      {
        label: "Pressure (hPa)",
        data: historicalPressureData,
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Humidity Card */}
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-4 flex items-center">
        <WiHumidity className="text-4xl text-blue-500 mr-4" />
        <div>
          <p className="text-sm font-medium text-gray-500">Humidity</p>
          <p className="text-lg font-bold">{main.humidity}%</p>
        </div>
      </div>

      {/* Wind Speed Card with Chart */}
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-4 flex flex-col items-center">
        <WiStrongWind className="text-4xl text-gray-600 mb-4" />
        <div>
          <p className="text-sm font-medium text-gray-500">Wind Speed</p>
          <p className="text-lg font-bold">{wind.speed} m/s</p>
        </div>
        {/* Wind Speed Chart */}
        <Line data={windChartData} />
      </div>

      {/* Pressure Card */}
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-4 flex items-center">
        <WiBarometer className="text-4xl text-gray-700 mr-4" />
        <div>
          <p className="text-sm font-medium text-gray-500">Pressure</p>
          <p className="text-lg font-bold">{main.pressure} hPa</p>
        </div>
      </div>

      {/* Visibility Card */}
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-4 flex items-center">
        <WiThermometer className="text-4xl text-yellow-600 mr-4" />
        <div>
          <p className="text-sm font-medium text-gray-500">Visibility</p>
          <p className="text-lg font-bold">{visibility / 1000} km</p>
        </div>
      </div>

      {/* Humidity Chart */}
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-4 flex flex-col items-center">
        <Line data={humidityChartData} />
      </div>

      {/* Pressure Chart */}
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-4 flex flex-col items-center">
        <Line data={pressureChartData} />
      </div>
    </div>
  );
}
