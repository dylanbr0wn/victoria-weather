import { useRainData } from "../pages/api/rain.swr";
import AnimatePresence from "./common/AnimatePresence";
import { EdittingWrapper } from "./EditingWrapper";

const Rain = () => {
	const { data } = useRainData();

	if (!data) return null;

	return (
		<EdittingWrapper
			alternate={
				<div className="w-full rounded-lg bg-[#070d16]/50 backdrop-blur flex justify-center items-center h-[115px] border-sky-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-sky-700/10">
					<div className="bg-gradient-to-t from-sky-700 to-sky-300 bg-clip-text text-transparent text-3xl font-bold pointer-events-none">
						Rain Data
					</div>
				</div>
			}
		>
			<AnimatePresence show={!!data}>
				<div className="w-full rounded-lg py-2 px-4 mix-blend-soft-light relative overflow-hidden group h-[115px] flex flex-col justify-evenly border-sky-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-sky-700/10 bg-[#11091b]">
					<div className={`flex  justify-center gap-3 items-center`}>
						<div className={` text-5xl flex-shrink`}>💧</div>
						<div className="flex flex-col items-center">
							<div className="flex items-end leading-none ">
								<div
									className={` text-4xl  font-black bg-gradient-to-t from-sky-700 to-sky-300 bg-clip-text text-transparent`}
								>
									{!data.average_rain || data.average_rain === 0
										? "0.00"
										: data.average_rain?.toFixed(2)}
								</div>
								<div
									className={`text-2xl bg-gradient-to-t from-sky-700 to-sky-300 bg-clip-text text-transparent ml-1`}
								>
									mm
								</div>
							</div>
							<div
								className={`text-xs tracking-widest  leading-4 text-sky-600`}
							>
								today on average
							</div>
						</div>
					</div>
					<div className={`  text-white flex-grow text-center`}>
						<span className="text-2xl text-sky-500">
							{data?.number_reporting}
						</span>{" "}
						stations are currently reporting rain.{" "}
						{/* {!dash && !!data.max_rain?.properties?.station_id && (
						<>
							<a
								rel="noopener noreferrer"
								target="_blank"
								href={`https://www.victoriaweather.ca/station.php?id=${data?.max_rain?.properties.station_id}`}
								className="hover:underline text-sky-500"
							>
								{data?.max_rain?.properties.station_long_name}
							</a>{" "}
							has reporting the most in last 24h with{" "}
							<span style={{ color: "#30B4FF" }} className="text-2xl">
								{data?.max_rain?.properties.rain}
								{data?.max_rain?.properties.rain_units}
							</span>{" "}
							total.
						</>
					)} */}
					</div>
					<div className="-z-10">
						<svg
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							x="0px"
							y="0px"
							style={{ display: "none" }}
						>
							<symbol id="wave">
								<path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
								<path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
								<path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
								<path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
							</symbol>
						</svg>
						<div
							id="water"
							className="water bg-sky-400 opacity-5 group-hover:opacity-30 transition-all duration-500"
							style={{
								transform: `translateY(${
									115 - (data.average_rain / 56) * 115
								}px)`,
							}}
						>
							<svg
								viewBox="0 0 560 20"
								className="water_wave water_wave_back fill-current text-sky-700"
							>
								<use xlinkHref="#wave"></use>
							</svg>
							<svg
								viewBox="0 0 560 20"
								className="water_wave water_wave_front fill-current text-sky-400"
							>
								<use xlinkHref="#wave"></use>
							</svg>
						</div>
					</div>
				</div>
			</AnimatePresence>
		</EdittingWrapper>
	);
};
export default Rain;
