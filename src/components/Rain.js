const Rain = ({ rain }) => {
    return (
        <>
            {rain && (
                <div className="w-full p-3">
                    <div className="p-5 w-full rounded-md bg-gray-900 hover:bg-gray-800 transition-colors">
                        <div className="flex p-3">
                            <div className="text-6xl flex-shrink">💧</div>
                            <div className="flex-grow text-center tracking-widest">
                                {rain.averageRain && (
                                    <span
                                        style={{ color: "#30B4FF" }}
                                        className="text-5xl font-bold "
                                    >
                                        {rain.averageRain.toFixed(2)}
                                        <span className="text-3xl"> mm</span>
                                    </span>
                                )}
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
                                {rain.numberReporting}
                            </span>{" "}
                            stations are currently reporting rain.{" "}
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href={`https://www.victoriaweather.ca/station.php?id=${rain.maxRain.properties.station_id}`}
                                style={{ color: "#30B4FF" }}
                                className="hover:underline"
                            >
                                {rain.maxRain.properties.station_long_name}
                            </a>{" "}
                            is reporting the most with{" "}
                            <span
                                style={{ color: "#30B4FF" }}
                                className="text-2xl"
                            >
                                {rain.maxRain.properties.rain}
                                {rain.maxRain.properties.rain_units}
                            </span>{" "}
                            total.
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Rain;
