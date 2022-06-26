import { motion } from "framer-motion";
import { useQuery } from "react-query";

const getPointsData = async () => {
    const data = await fetch("/api/points-data");

    return await data.json();
};

const MaxMin = ({ max, min }) => {
    const { data } = useQuery(["points"], getPointsData, {});
    return (
        <>
            {data && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full p-3"
                >
                    <div className="p-5 w-full rounded-md bg-gray-900 hover:bg-gray-800 transition-colors">
                        <div className="flex p-3">
                            <div className="text-5xl flex-shrink">🔥</div>
                            <div className="flex-grow text-center tracking-widest">
                                <span
                                    style={{
                                        color: "#FF8730",
                                    }}
                                    className="text-5xl font-bold "
                                >
                                    {data?.points?.maxPoint?.properties.temperature.toFixed(
                                        1
                                    )}
                                    <span className="text-4xl font-light">
                                        {" "}
                                        ℃
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="p-3 text-xl text-white">
                            <a
                                href={`https://www.victoriaweather.ca/station.php?id=${data?.points?.maxPoint?.properties.station_id}`}
                                style={{ color: "#FF8730" }}
                                className="text-xl hover:underline"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {
                                    data?.points?.maxPoint?.properties
                                        .station_long_name
                                }{" "}
                            </a>{" "}
                            is currently the{" "}
                            <span
                                style={{ color: "#FF8730" }}
                                className="text-xl"
                            >
                                warmest
                            </span>{" "}
                            station.
                        </div>
                        <div className="flex p-3 mt-5">
                            <div className="text-5xl flex-shrink">❄️</div>
                            <div className="flex-grow text-center tracking-widest">
                                <span
                                    style={{
                                        color: "#30E6FF",
                                    }}
                                    className="text-5xl font-bold "
                                >
                                    {data?.points?.minPoint?.properties.temperature.toFixed(
                                        1
                                    )}
                                    <span className="text-4xl font-light">
                                        {" "}
                                        ℃
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="p-3 text-xl text-white">
                            <a
                                href={`https://www.victoriaweather.ca/station.php?id=${data?.points?.minPoint?.properties.station_id}`}
                                style={{ color: "#30E6FF" }}
                                className="text-xl hover:underline"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {
                                    data?.points?.minPoint?.properties
                                        .station_long_name
                                }{" "}
                            </a>{" "}
                            is currently the{" "}
                            <span
                                style={{ color: "#30E6FF" }}
                                className="text-xl"
                            >
                                coolest
                            </span>{" "}
                            station.
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default MaxMin;
