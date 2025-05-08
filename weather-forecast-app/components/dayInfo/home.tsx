// components/WeatherDashboard.tsx
"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const WeatherDashboard = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
      document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);
  return (
    <div className="h-full min-h-screen bg-[#eceff1] dark:bg-[#424242] text-black dark:text-[#f5f5f5] flex flex-col">
      {/* Header */}
      <header className="bg-white w-full border border-gray-300 p-4 md:p-8 rounded-none md:rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <Image src="/logo.svg" alt="User" width={80} height={80} />
        <h2 className="text-xl font-semibold">Weather Forecast App</h2>
        <div className="flex items-center gap-4">
          <p>Hello User</p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-300 dark:bg-gray-700 p-2 rounded-full"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-gray-800" />}
          </button>
        </div>
      </header>

      {/* Top section */}
      <div className="flex flex-col md:flex-row gap-3 p-2 flex-grow">
        {/* Left Card */}
        <aside className="w-full md:w-1/3  bg-white dark:bg-[#242424] border border-gray-300 rounded-2xl p-4 flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold">Clayton Walter</h2>
            <p className="text-gray-500">Alaska, Croatia</p>
          </div>

          <div className="text-center">
            <div className="text-6xl font-bold">14° C</div>
            <p className="text-gray-500 mt-2">Dramatic cloudy</p>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="font-semibold mb-2">Temperature</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <span>Morning</span><span>14°</span>
              <span>Afternoon</span><span>18°</span>
              <span>Evening</span><span>14°</span>
              <span>Night</span><span>12°</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl h-40 bg-blue-500 text-white p-4">
            <h3 className="text-sm font-semibold">Explore global map of wind, weather and ocean condition</h3>
            <button className="mt-2 bg-white text-black py-1 px-4 rounded-lg text-sm">Get Started</button>
          </div>
        </aside>

        {/* Right Card */}
        <aside className="w-full md:w-2/3 bg-white dark:bg-[#242424] border border-gray-300 rounded-2xl p-4 flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold">Clayton Walter</h2>
            <p className="text-gray-500">Alaska, Croatia</p>
          </div>

          <div className="text-center">
            <div className="text-6xl font-bold">14° C</div>
            <p className="text-gray-500 mt-2">Dramatic cloudy</p>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="font-semibold mb-2">Temperature</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
              <span>Morning</span><span>14°</span>
              <span>Afternoon</span><span>18°</span>
              <span>Evening</span><span>14°</span>
              <span>Night</span><span>12°</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl h-40 bg-blue-500 text-white p-4">
            <h3 className="text-sm font-semibold">Explore global map of wind, weather and ocean condition</h3>
            <button className="mt-2 bg-white dark:bg-[#242424] text-black py-1 px-4 rounded-lg text-sm">Get Started</button>
          </div>
        </aside>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col md:flex-row gap-3 p-2">
        {/* Forecast Weekly */}
        <aside className="w-full md:w-2/3 bg-white dark:bg-[#242424] border border-gray-300 rounded-2xl p-4 flex flex-col gap-4">
          <div className="flex gap-2 overflow-x-auto">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="bg-gray-100 p-4 rounded-xl min-w-[80px] text-center">
                <p>{day}</p>
                {/* <Image src="/weather-icon.png" alt="icon" width={30} height={30} className="mx-auto my-2" /> */}
                <p>16°</p>
              </div>
            ))}
          </div>
        </aside>

        {/* Repeated Info Card */}
        <aside className="w-full md:w-1/3 bg-white dark:bg-[#242424] border border-gray-300 rounded-2xl p-4 flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold">Clayton Walter</h2>
            <p className="text-gray-500">Alaska, Croatia</p>
          </div>

          <div className="text-center">
            <div className="text-6xl font-bold">14° C</div>
            <p className="text-gray-500 mt-2">Dramatic cloudy</p>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="font-semibold mb-2">Temperature</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <span>Morning</span><span>14°</span>
              <span>Afternoon</span><span>18°</span>
              <span>Evening</span><span>14°</span>
              <span>Night</span><span>12°</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl h-40 bg-blue-500 text-white p-4">
            <h3 className="text-sm font-semibold">Explore global map of wind, weather and ocean condition</h3>
            <button className="mt-2 bg-white dark:bg-[#242424] text-black py-1 px-4 rounded-lg text-sm">Get Started</button>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm  dark:text-gray-300 text-gray-700 p-4">
        © 2025 Weather App | Powered by TeachEdison
      </footer>
    </div>
  );
};

export default WeatherDashboard;
