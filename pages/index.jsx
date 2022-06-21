import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map2"), { ssr: false });
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
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
    const [isobands, setIsobands] = useState(null);
    const [island, setIsland] = useState(null);
    const [points, setPoints] = useState(null);
    const [rain, setRain] = useState(null);

    const [max, setMax] = useState(null);
    const [min, setMin] = useState(null);
    const [uvInfo, setUvInfo] = useState(null);
    const [openWeather, setOpenWeather] = useState(null);
    const [astroData, setAstroData] = useState(null);

    const [AQI, setAQI] = useState(null);
    const [vicTempData, setVicTempData] = useState(null);
    const [intersection, setIntersection] = useState(null);

    useEffect(() => {
        axios.get("/api/weather").then(({ data }) => {
            setMax(data.maxPoint);
            setMin(data.minPoint);
            setIsobands(data.isobands);
            setIsland(data.island);
            setPoints(data.newPoints);
            setRain(data.rainStats);
            setAQI(data.aqi);
            setVicTempData(data.vicTempData);
            setUvInfo(data.uvInfo);
            setOpenWeather(data.openWeather);
            setAstroData(data.astroData);
            setIntersection(data.intersection);
        });
    }, []);
    return (
        <div className=" min-h-screen w-screen flex flex-col bg-gray-900">
            <Header />
            <main className="flex-grow flex flex-col">
                <AnimatePresence>
                    {isobands && island && points && (
                        <div
                            key={"map"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            style={{ height: 600 }}
                            className="flex-grow bg-gray-900"
                        >
                            <Map
                                isobands={isobands}
                                island={island}
                                points={points}
                                intersection={intersection}
                            />
                        </div>
                    )}
                </AnimatePresence>
                <div className=" bg-gray-900 flex-shrink-0 py-10">
                    <div className="relative  w-full md:max-w-3xl mx-auto">
                        {/* <div className="text-gray-600 uppercase font-light text-lg absolute -left-24 top-3">
                            Summary
                        </div> */}
                        <AnimatePresence>
                            <Summary
                                key={1}
                                openWeather={openWeather}
                                vicTempData={vicTempData}
                            />
                        </AnimatePresence>
                    </div>
                    <div className="relative  w-full md:max-w-3xl mx-auto">
                        {/* <div className="text-gray-600 uppercase font-light text-lg absolute -left-24 top-3">
                            Summary
                        </div> */}
                        <AnimatePresence>
                            <SunMoonCycle key={1} />
                        </AnimatePresence>
                    </div>

                    <div className="relative md:max-w-3xl mx-auto">
                        {/* <div className="text-gray-600 uppercase font-light text-lg absolute -left-28 top-3">
                            Highlights
                        </div> */}
                        <div className="flex flex-col md:flex-row w-full md:max-w-3xl mx-auto">
                            <div className="flex flex-col w-full">
                                <AnimatePresence>
                                    <Rain key={1} rain={rain} />
                                    <AirQuality key={2} AQI={AQI} />
                                </AnimatePresence>
                            </div>
                            <div className="flex flex-col w-full">
                                <AnimatePresence>
                                    <MaxMin key={1} max={max} min={min} />
                                    <UVIndex
                                        key={2}
                                        vicTempData={vicTempData}
                                        uvInfo={uvInfo}
                                    />
                                    {/* <Moon astroData={astroData} /> */}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full max-w-3xl mx-auto">
                        <Search points={points} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;
