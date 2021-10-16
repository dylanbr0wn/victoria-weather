const SummaryList = ({ vicTempData }) => {
    return (
        <div className=" pb-3 px-3 text-lg text-center  ">
            <span className="text-pink-600 mx-2 inline-block">
                {" "}
                <a
                    className="hover:underline"
                    href="https://en.wikipedia.org/wiki/Humidex"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Humidex
                </a>
                :{" "}
                <span className="font-bold">
                    {vicTempData.averageHumidex.toFixed(1)}
                </span>
            </span>
            {vicTempData.averageWindChill && (
                <span className=" text-blue-300 mx-2 inline-block">
                    <a
                        className="hover:underline"
                        href="https://en.wikipedia.org/wiki/Wind_chill"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Windchill
                    </a>
                    :{" "}
                    <span className="font-bold">
                        {vicTempData.averageWindChill.toFixed(1)}
                    </span>
                </span>
            )}

            <span className=" text-yellow-400 mx-2 inline-block">
                <a
                    className="hover:underline"
                    href="https://en.wikipedia.org/wiki/Humidity"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Humidity
                </a>
                :{" "}
                <span className="font-bold">
                    {vicTempData.averageHumidy.toFixed(1)}%
                </span>
            </span>
            <span className=" text-blue-200 mx-2 inline-block">
                <a
                    className="hover:underline"
                    href="https://en.wikipedia.org/wiki/Wind_speed"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Wind Speed
                </a>
                :{" "}
                <span className="font-bold">
                    {vicTempData.averageWindHeading}{" "}
                    {vicTempData.averageWind.toFixed(1)} km/h
                </span>
            </span>
            <span className=" text-white mx-2 inline-block">
                <a
                    className="hover:underline"
                    href="https://en.wikipedia.org/wiki/Atmospheric_pressure"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Pressure
                </a>
                :{" "}
                <span className="font-bold">
                    {vicTempData.averagePressure.toFixed(1)} hPa
                </span>
            </span>
            <span className=" text-green-700 mx-2 inline-block">
                <a
                    className="hover:underline"
                    href="https://en.wikipedia.org/wiki/Dew_point"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Dewpoint
                </a>
                :{" "}
                <span className="font-bold">
                    {vicTempData.averageDewpoint.toFixed(1)}℃
                </span>
            </span>
            <span className=" text-red-700 mx-2 inline-block">
                <a
                    className="hover:underline"
                    href="https://en.wikipedia.org/wiki/Solar_irradiance"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Insolation
                </a>
                :{" "}
                <span className="font-bold">
                    {vicTempData.averageInsolation.toFixed(1)} W/m
                    <sup>2</sup>
                </span>
            </span>
            {vicTempData.averageUv && (
                <span className=" text-purple-700 mx-2 inline-block">
                    <a
                        className="hover:underline"
                        href="https://en.wikipedia.org/wiki/Ultraviolet_index"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        UV Index
                    </a>
                    : <span className="font-bold">{vicTempData.averageUv}</span>
                </span>
            )}

            {/* <div className="text-gray-500 p-3 text-sm text-center">
                All values are based on the average of their calculated values
                for each station in the Victoria Area. Therefore, may not be
                representative of weather in subregions of Victoria.
            </div> */}
        </div>
    );
};

export default SummaryList;
