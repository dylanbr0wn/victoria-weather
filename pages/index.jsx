import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map2"), { ssr: false });
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Rain from "../components/Rain";
import MaxMin from "../components/MaxMin";
import AirQuality from "../components/AirQuality";
import Search from "../components/Search";
import Header from "../components/Header";
import Summary from "../components/Summary";
import UVIndex from "../components/UVIndex";
import { AnimatePresence, motion } from "framer-motion";
import Moon from "../components/Moon";
import SunMoonCycle from "../components/SunMoonCycle";

function App() {
    // const [isobands, setIsobands] = useState(null);
    // const [island, setIsland] = useState(null);
    // const [points, setPoints] = useState(null);
    // const [rain, setRain] = useState(null);

    // const [max, setMax] = useState(null);
    // const [min, setMin] = useState(null);
    // const [uvInfo, setUvInfo] = useState(null);
    // const [openWeather, setOpenWeather] = useState(null);
    // const [astroData, setAstroData] = useState(null);

    // const [AQI, setAQI] = useState(null);
    // const [vicTempData, setVicTempData] = useState(null);
    // const [intersection, setIntersection] = useState(null);

    // useEffect(() => {
    //     fetch("/api/weather")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setMax(data.maxPoint);
    //             setMin(data.minPoint);
    //             setIsobands(data.isobands);
    //             setIsland(data.island);
    //             setPoints(data.newPoints);
    //             setRain(data.rainStats);
    //             setAQI(data.aqi);
    //             setVicTempData(data.vicTempData);
    //             setUvInfo(data.uvInfo);
    //             setOpenWeather(data.openWeather);
    //             setAstroData(data.astroData);
    //             setIntersection(data.intersection);
    //         });
    // }, []);
    return (
        <div className=" min-h-screen w-screen flex flex-col bg-gray-900">
            <Header />
            <main className="flex-grow flex flex-col">
                <div className="flex flex-col">
                    <AnimatePresence>
                        <div
                            key={"map"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            style={{ height: 600 }}
                            className="flex-grow bg-gray-900"
                        >
                            <Map />
                        </div>
                    </AnimatePresence>
                    <div className="relative  w-full md:max-w-3xl mx-auto">
                        <div className="text-xl w-full border-b py-2 border-slate-700 text-slate-400 font-bold px-2">
                            Weather and Forecast
                        </div>
                        <AnimatePresence>
                            <Summary key={"summary"} />
                        </AnimatePresence>
                    </div>

                    <div className="flex flex-col md:max-w-3xl md:flex-row w-full mx-auto">
                        <AnimatePresence>
                            <Rain key={"rain"} />
                            <MaxMin key={"maxmin"} />
                        </AnimatePresence>
                    </div>

                    <div className="flex flex-col w-full md:max-w-3xl mx-auto">
                        <div className="text-xl w-full border-b py-2 border-slate-700 text-slate-400 font-bold px-2">
                            Health
                        </div>
                        <div className="flex flex-col md:flex-row w-full">
                            <AnimatePresence>
                                <UVIndex key={"uv"} />
                                <AirQuality key={"aqi"} />
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="flex"></div>
                </div>
                <div className="relative  w-full md:max-w-3xl mx-auto">
                    <div className="text-xl w-full border-b py-2 border-slate-700 text-slate-400 font-bold px-2">
                        Sunrise/Sunset
                    </div>
                    <AnimatePresence>
                        <SunMoonCycle key={"sunmoon"} />
                    </AnimatePresence>
                </div>
                <div className="relative  w-full md:max-w-3xl mx-auto">
                    <div className="text-xl w-full border-b py-2 border-slate-700 text-slate-400 font-bold px-2">
                        Explore
                    </div>
                    <div className=" bg-gray-900 flex-shrink-0 py-10">
                        <div className="flex w-full max-w-3xl mx-auto">
                            <Search />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;
