import { motion } from "framer-motion";
import { useQuery } from "react-query";

const getRainData = async () => {
    const data = await fetch("/api/rain-data");

    return await data.json();
};

const Rain = () => {
    const { data } = useQuery(["rain"], getRainData, {});
    return (
        <>
            {data?.rain && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full p-3"
                >
                    <div className="p-5 w-full rounded-md bg-gray-900 hover:bg-gray-800 transition-colors">
                        <div className="flex p-3">
                            <div className="text-6xl flex-shrink">💧</div>
                            <div className="flex-grow text-center tracking-widest">
                                <span
                                    style={{ color: "#30B4FF" }}
                                    className="text-5xl font-bold "
                                >
                                    {data?.rain.averageRain === 0
                                        ? "0.00"
                                        : data.rain.averageRain.toFixed(2)}
                                    <span className="text-3xl"> mm</span>
                                </span>

                                <div
                                    style={{ color: "#30B4FF" }}
                                    className="text-lg font-bold leading-4"
                                >
                                    today on average
                                </div>
                            </div>
                        </div>
                        <div className="p-3 text-xl text-white">
                            <span
                                style={{ color: "#30B4FF" }}
                                className="text-2xl"
                            >
                                {data?.rain.numberReporting}
                            </span>{" "}
                            stations are currently reporting rain.{" "}
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href={`https://www.victoriaweather.ca/station.php?id=${data?.rain.maxRain.properties.station_id}`}
                                style={{ color: "#30B4FF" }}
                                className="hover:underline"
                            >
                                {
                                    data?.rain.maxRain.properties
                                        .station_long_name
                                }
                            </a>{" "}
                            has reporting the most in last 24h with{" "}
                            <span
                                style={{ color: "#30B4FF" }}
                                className="text-2xl"
                            >
                                {data?.rain.maxRain.properties.rain}
                                {data?.rain.maxRain.properties.rain_units}
                            </span>{" "}
                            total.
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
};
export default Rain;
