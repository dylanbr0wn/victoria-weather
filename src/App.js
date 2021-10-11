import "./App.css";
import Map from "./components/Map2";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Rain from "./components/Rain";
import MaxMin from "./components/MaxMin";
import AirQuality from "./components/AirQuality";
import Search from "./components/Search";
import Header from "./components/Header";
import Summary from "./components/Summary";
import UVIndex from "./components/UVIndex";

function App() {
    const [isobands, setIsobands] = useState(null);
    const [island, setIsland] = useState(null);
    const [points, setPoints] = useState(null);
    const [rain, setRain] = useState(null);

    const [max, setMax] = useState(null);
    const [min, setMin] = useState(null);
    const [uvInfo, setUvInfo] = useState(null);

    const [AQI, setAQI] = useState(null);
    const [vicTempData, setVicTempData] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:4000/api/weather").then(({ data }) => {
            setMax(data.maxPoint);
            setMin(data.minPoint);
            setIsobands(data.isobands);
            setIsland(data.island);
            setPoints(data.newPoints);
            setRain(data.rainStats);
            setAQI(data.aqi);
            setVicTempData(data.vicTempData);
            setUvInfo(data.uvInfo);
        });
    }, []);
    return (
        <div className=" min-h-screen w-screen flex flex-col">
            <Header />
            <main className="flex-grow flex flex-col">
                <div style={{ height: 600 }} className="flex-grow">
                    <Map isobands={isobands} island={island} points={points} />
                </div>
                <div className=" bg-gray-900 flex-shrink-0 py-10">
                    <div className="relative  w-full md:max-w-3xl mx-auto">
                        {/* <div className="text-gray-600 uppercase font-light text-lg absolute -left-24 top-3">
                            Summary
                        </div> */}

                        <Summary vicTempData={vicTempData} />
                    </div>
                    <div className="relative md:max-w-3xl mx-auto">
                        {/* <div className="text-gray-600 uppercase font-light text-lg absolute -left-28 top-3">
                            Highlights
                        </div> */}
                        <div className="flex flex-col md:flex-row w-full md:max-w-3xl mx-auto">
                            <div className="flex flex-col w-full">
                                <Rain rain={rain} />
                                <AirQuality AQI={AQI} />
                            </div>
                            <div className="flex flex-col w-full">
                                <MaxMin max={max} min={min} />
                                <UVIndex
                                    vicTempData={vicTempData}
                                    uvInfo={uvInfo}
                                />
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
