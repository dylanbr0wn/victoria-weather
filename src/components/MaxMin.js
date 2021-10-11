const MaxMin = ({ max, min }) => {
    return (
        <div className="w-full p-3">
            {max && min && (
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
                                {max.properties.temperature.toFixed(1)}
                                <span className="text-4xl font-light"> ℃</span>
                            </span>
                        </div>
                    </div>
                    <div className="p-3 text-xl text-white">
                        <a
                            href={`https://www.victoriaweather.ca/station.php?id=${max.properties.station_id}`}
                            style={{ color: "#FF8730" }}
                            className="text-xl hover:underline"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {max.properties.station_long_name}{" "}
                        </a>{" "}
                        is currently the{" "}
                        <span style={{ color: "#FF8730" }} className="text-xl">
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
                                {min.properties.temperature.toFixed(1)}
                                <span className="text-4xl font-light"> ℃</span>
                            </span>
                        </div>
                    </div>
                    <div className="p-3 text-xl text-white">
                        <a
                            href={`https://www.victoriaweather.ca/station.php?id=${min.properties.station_id}`}
                            style={{ color: "#30E6FF" }}
                            className="text-xl hover:underline"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {min.properties.station_long_name}{" "}
                        </a>{" "}
                        is currently the{" "}
                        <span style={{ color: "#30E6FF" }} className="text-xl">
                            coolest
                        </span>{" "}
                        station.
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaxMin;
