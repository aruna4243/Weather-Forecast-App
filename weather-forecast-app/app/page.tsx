

import WeatherDashboard from "@/components/dayInfo/home";


export default function Home() {
  return (
    <div
      style={{height:"100%"}} className="grid grid-rows-[auto_1fr_auto] p-2 sm:p-2 font-sans bg-[#ECEFF1] text-gray-900"
    >
     {/* <Head>
        <title>Weather Forecast App</title>
      </Head> */}
      <main className="h-full">
      <WeatherDashboard />
      </main>
     
    </div>
  );
}
