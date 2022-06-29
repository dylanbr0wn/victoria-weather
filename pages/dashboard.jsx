import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map2"), { ssr: false });
import Footer from "../components/Footer";
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
import { useRouter } from "next/router";

function App() {
    const { query } = useRouter();

    return (
        <div className="h-screen w-screen flex flex-col bg-gray-900">
            {/* <Header /> */}
            <main className="flex-grow flex">
                <div className="h-full p-4  bg-gray-900 w-2/3">
                    <AnimatePresence>
                        <Map lat={query.lat} lng={query.lng} zoom={query.zm} />
                    </AnimatePresence>
                </div>
                <div className="flex flex-col w-1/3 overflow-y-scroll h-full p-4">
                    <div className="relative w-full mx-auto">
                        {/* <div className="text-xl w-full border-b py-2 border-slate-700 text-slate-400 font-bold px-2">
                            Weather and Forecast
                        </div> */}
                        <AnimatePresence>
                            <Summary dash key={"summary"} />
                        </AnimatePresence>
                    </div>
                    <div className="text-slate-200 font-bold border-b border-slate-700 my-3">
                        {/* Stats */}
                    </div>
                    <div className="flex w-full">
                        <Rain dash key={"rain"} />
                    </div>

                    <div className="flex w-full">
                        <AnimatePresence>
                            <MaxMin dash key={"maxmin"} />
                        </AnimatePresence>
                    </div>
                    <div className="text-slate-200 font-bold border-b border-slate-700 my-3">
                        {/* Health */}
                    </div>
                    <div className="flex w-full">
                        <div className="flex flex-col w-1/2">
                            <AnimatePresence>
                                <AirQuality dash key={"aqi"} />
                            </AnimatePresence>
                        </div>

                        <div className="flex flex-col w-1/2">
                            <AnimatePresence>
                                <UVIndex dash key={"uv"} />
                            </AnimatePresence>
                        </div>
                    </div>
                    {/* <div className="flex"></div>
                    <div className="relative  w-full md:max-w-3xl mx-auto">
                        <div className="text-xl w-full border-b py-2 border-slate-700 text-slate-400 font-bold px-2">
                            Sunrise/Sunset
                        </div>
                        <AnimatePresence>
                            <SunMoonCycle key={"sunmoon"} />
                        </AnimatePresence>
                    </div> */}
                </div>
            </main>

            <Footer dash />
        </div>
    );
}

export default App;
