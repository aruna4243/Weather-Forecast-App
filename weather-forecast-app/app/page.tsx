import DayInfo from "@/components/dayInfo/home";
import Forecast from "@/components/forecast/home";
import Header from "@/components/header/home";
import Highlight from "@/components/highlights/home";
import LiveCard from "@/components/liveCard/card";

export default function Home() {
  return (
    <div
      className="grid grid-rows-[auto_1fr_auto] min-h-screen p-6 sm:p-10 font-sans bg-gradient-to-br from-sky-200 via-blue-300 to-indigo-400 text-gray-900"
    >
      {/* Header */}
      <Header />
      <DayInfo/>
      <Forecast/>
      <Highlight/>
      <LiveCard/>   

      {/* Footer */}
      <footer className="text-center text-sm text-gray-700 py-2">
        © 2025 Weather App | Powered by TeachEdison
      </footer>
    </div>
  );
}
