import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useState } from "react";
import { calcAQICategory } from "../utils/helper";

const getWeatherData = async () => {
    const data = await fetch("/api/weather-data");

    return await data.json();
};

const AirQuality = () => {
    const [airQuality, setAirQuality] = useState(null);
    const { data } = useQuery(["weather"], getWeatherData, {
        onSuccess: (data) => {
            setAirQuality(calcAQICategory(data.current.air_quality.pm2_5));
        },
    });
    return (
        <>
            {airQuality && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full p-3"
                >
                    <div className="p-5 w-full rounded-md bg-gray-900 hover:bg-gray-800 transition-colors">
                        <div className="flex flex-col p-3 ">
                            <div className="flex px-5">
                                <div
                                    className={`text-6xl flex-shrink ${airQuality.color} font-extrabold text-center`}
                                >
                                    {airQuality.aqi}
                                </div>
                                <div
                                    className={`${airQuality.color} leading-6 font-bold text-2xl inline-block self-center ml-3 text-center flex-grow`}
                                >
                                    <a
                                        className="hover:underline"
                                        href="https://www.airnow.gov/aqi/aqi-basics/"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        US EPA
                                        <br /> PM2.5 AQI{" "}
                                    </a>

                                    <div className=" font-light text-sm">
                                        10 minute average
                                    </div>
                                </div>
                            </div>

                            {/* <div className="text-purple-600 font-light px-5 mt-1">
                                <span className=" font-bold hover:underline ">
                                    <a
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        href="https://www2.purpleair.com/"
                                    >
                                        PurpleAir©
                                    </a>
                                </span>{" "}
                                Station {AQI.ID}
                            </div> */}
                        </div>
                        <div className="p-3 text-xl text-white">
                            The air quality is{" "}
                            <span
                                className={`text-2xl text-purple-600 ${airQuality.color}`}
                            >
                                {airQuality.concern}
                            </span>
                            . {airQuality.message}
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default AirQuality;
