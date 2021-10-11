const UVIndex = ({ vicTempData, uvInfo }) => {
    return (
        <>
            {uvInfo && vicTempData && (
                <div className="w-full p-3">
                    <div className="p-5 w-full rounded-md bg-gray-900 hover:bg-gray-800 transition-colors">
                        <div className="flex p-3">
                            <div className="text-6xl flex-shrink">☀️</div>
                            <div className="flex-grow tracking-widest flex ml-8 text-yellow-300 items-end">
                                <div className="text-6xl font-bold ">
                                    {vicTempData.averageUv}
                                </div>
                                <a
                                    href="https://en.wikipedia.org/wiki/Ultraviolet_index"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="ml-1 align-bottom mb-1 block hover:underline"
                                >
                                    UV Index
                                </a>
                            </div>
                        </div>
                        <div className="p-3 text-xl text-white">
                            <span className="text-2xl text-yellow-300">
                                {uvInfo.risk}
                            </span>
                            {uvInfo.riskText}
                        </div>
                    </div>
                </div>
            )}{" "}
        </>
    );
};
export default UVIndex;
