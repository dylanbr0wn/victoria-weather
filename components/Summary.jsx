import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { weatherIcon } from "../utils/helper";
import SummaryList from "./SummaryList";

const getWeatherData = async () => {
    const data = await fetch("/api/weather-data");

    return await data.json();
};

const getPointsData = async () => {
    const data = await fetch("/api/points-data");

    return await data.json();
};

const Summary = () => {
    const { data } = useQuery(["weather"], getWeatherData);

    const { data: pointsData } = useQuery(["points"], getPointsData);

    return (
        <>
            {data && pointsData && (
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
                                    {
                                        weatherIcon(data.current.condition.code)
                                            .icon
                                    }
                                </div>
                            </div>
                            <div
                                className={` flex flex-col ${
                                    pointsData?.points?.averageTemp < 10
                                        ? "text-blue-500"
                                        : pointsData?.points?.averageTemp < 20
                                        ? "text-yellow-400"
                                        : pointsData?.points?.averageTemp < 30
                                        ? "text-green-500"
                                        : "text-red-600"
                                }`}
                            >
                                <div
                                    className={` tracking-wide text-6xl font-semibold text-center`}
                                >
                                    {pointsData?.points?.averageTemp.toFixed(1)}
                                    <span className="text-4xl font-light">
                                        ℃
                                    </span>
                                </div>
                                <div className="text-lg font-light leading-3 text-center">
                                    Current Temperature
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

                        {/* <SummaryList vicTempData={vicTempData} /> */}
                        {/* <div className="px-10 text-center  text-xs text-gray-700">
                            All values are calculated averages from stations in
                            the Victoria area and may not represent current
                            conditions in sub regions.
                        </div> */}
                    </div>

                    <div className="flex flex-col md:flex-row w-full md:space-x-2 mt-8 pb-5">
                        {data.forecast.forecastday.map((day) => {
                            return (
                                <div
                                    key={day.date}
                                    className="flex flex-col p-3 space-y-2 flex-grow rounded-md bg-gray-900 hover:bg-gray-800 transition-colors"
                                >
                                    <div className="flex text-center">
                                        <div className="text-slate-500 text-lg  leading-none">
                                            {dayjs(day.date).format("ddd")}{" "}
                                            {dayjs(day.date).format("D")}{" "}
                                            {dayjs(day.date).format("MMM")}
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-3">
                                        <div className="flex">
                                            <div className="text-3xl mr-3 flex flex-col text-center ">
                                                <div>
                                                    {
                                                        weatherIcon(
                                                            day.day.condition
                                                                .code
                                                        ).icon
                                                    }
                                                </div>
                                            </div>
                                            <div
                                                className={` flex flex-col  ${
                                                    day.day.avgtemp_c < 10
                                                        ? "text-blue-500"
                                                        : day.day.avgtemp_c < 20
                                                        ? "text-yellow-400"
                                                        : day.day.avgtemp_c < 30
                                                        ? "text-green-500"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                <div
                                                    className={` tracking-wide text-4xl leading-none font-semibold text-center`}
                                                >
                                                    {day.day.avgtemp_c}
                                                    <span className="text-2xl font-light">
                                                        ℃
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col leading-none justify-between h-full">
                                            <div className="text-orange-500">
                                                <b>H:</b>
                                                {day.day.maxtemp_c}
                                            </div>
                                            <div className="text-sky-500">
                                                <b>L:</b>
                                                {day.day.mintemp_c}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </>
    );
};
export default Summary;
