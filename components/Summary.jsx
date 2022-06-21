import { motion } from "framer-motion";
import SummaryList from "./SummaryList";
import SunMoonCycle from "./SunMoonCycle";

const Summary = ({ vicTempData, openWeather }) => {
    const openWeatherIcon = (id) => {
        if (id < 300) return "⛈";
        else if (id < 500) return "🌦";
        else if (id < 600) return "🌧";
        else if (id < 700) return "🌨";
        else if (id < 800) return "⚠️";
        else if (id === 800) return "☀️";
        else if (id === 801) return "🌤";
        else if (id === 802) return "⛅️";
        else if (id === 803) return "🌥";
        else return "☁️";
    };

    return (
        <>
            {vicTempData && openWeather && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full p-3"
                    key="summary"
                >
                    <div className="p-5 w-full rounded-md bg-gray-900 hover:bg-gray-800 transition-colors flex flex-col ">
                        <div className="flex justify-center">
                            <div className="text-7xl mr-8 flex flex-col text-center ">
                                <div>
                                    {openWeatherIcon(openWeather.weather[0].id)}
                                </div>
                                {/* <div className="text-sm text-white uppercase">
                                    {openWeather.weather[0].description}
                                </div> */}
                                {/* <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href="https://openweathermap.org/"
                                    className="text-xs text-yellow-700 font-bold block hover:underline"
                                >
                                    OpenWeather©
                                </a> */}
                            </div>
                            <div
                                className={` flex flex-col ${
                                    vicTempData.averageTemperature < 10
                                        ? "text-blue-500"
                                        : vicTempData.averageTemperature < 20
                                        ? "text-yellow-400"
                                        : vicTempData.averageTemperature < 30
                                        ? "text-green-500"
                                        : "text-red-600"
                                }`}
                            >
                                <div
                                    className={` tracking-wide text-6xl font-semibold text-center`}
                                >
                                    {vicTempData.averageTemperature.toFixed(1)}
                                    <span className="text-4xl font-light">
                                        ℃
                                    </span>
                                </div>
                                <div className="text-lg font-light leading-3 text-center">
                                    Average Temperature
                                </div>
                            </div>
                        </div>
                        {/* <div className="text-center text-white  mt-3 text-xl">
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://openweathermap.org/"
                                className="text-yellow-700 font-bold hover:underline"
                            >
                                OpenWeather©
                            </a>{" "}
                            currently reports{" "}
                            <span className="font-bold text-yellow-700">
                                {openWeather.weather[0].description}
                            </span>
                            .
                        </div> */}
                        {/* <div className="text-gray-300 font-medium text-center text-lg mt-5">
                            Local Averages
                        </div> */}

                        <SummaryList vicTempData={vicTempData} />
                        <div className="px-10 text-center  text-xs text-gray-700">
                            All values are calculated averages from stations in
                            the Victoria area and may not represent current
                            conditions in sub regions.
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
};
export default Summary;
