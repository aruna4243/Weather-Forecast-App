"use client";
import Image from 'next/image';
import { Moon, Sun } from 'lucide-react';

export default function Header({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) {
  return (
    <div className='p-2'>

   
    <header className="bg-white w-full border border-gray-300 p-4 md:p-4 rounded-none md:rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
      <Image src="/logo.svg" alt="User" width={80} height={80} />
      <h2 className="text-xl font-semibold">Weather Forecast App</h2>
      <div className="flex items-center gap-4">
        <p>Hello User</p>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-300 dark:bg-gray-700 p-2 rounded-full"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-gray-800" />}
        </button>
      </div>
    </header>
    </div>
  );
}
