import "./App.css";
import Map from "./components/Map2";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Rain from "./components/Rain";
import MaxMin from "./components/MaxMin";

function App() {
    const [isobands, setIsobands] = useState(null);
    const [island, setIsland] = useState(null);
    const [points, setPoints] = useState(null);
    const [rain, setRain] = useState(null);

    const [max, setMax] = useState(null);
    const [min, setMin] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:4000/api/weather").then(({ data }) => {
            // let tempmin = 100,
            //     tempmax = 0;

            // const temps = data.isobands.features.map(
            //     (element) => element.properties.temperature
            // );

            // tempmax = Math.max(temps);
            // tempmin = Math.min(temps);

            setMax(data.maxPoint);
            setMin(data.minPoint);
            setIsobands(data.isobands);
            setIsland(data.island);
            setPoints(data.newPoints);
            setRain(data.rainStats);
        });
    }, []);
    return (
        <div className=" min-h-screen w-screen flex flex-col">
            <main className="flex-grow flex flex-col">
                <div className="h-16 w-screen bg-gray-900 flex-shrink-0">
                    <div className=" max-w-3xl mx-auto text-white flex p-2">
                        {/* <div className="py-3 text-4xl inline-block"></div> */}
                        <div className="py-1 px-2 inline-block rounded-md hover:bg-gray-800 transition-colors">
                            <a href="/" className="block">
                                <img
                                    style={{ width: 275 }}
                                    src="/500w/weather_logo500.png"
                                    alt="victoria weather"
                                ></img>
                            </a>
                        </div>
                    </div>
                </div>
                <div style={{ height: 600 }} className="flex-grow w-screen">
                    <Map isobands={isobands} island={island} points={points} />
                </div>
                <div
                    style={{ height: 600 }}
                    className="w-screen bg-gray-900 flex-shrink-0 py-10"
                >
                    <div className="flex w-full max-w-3xl mx-auto">
                        <Rain rain={rain} />
                        <MaxMin max={max} min={min} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;
