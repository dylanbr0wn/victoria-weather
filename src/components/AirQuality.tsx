import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { calcAQICategory } from "../utils/helper";
import { getWeatherData } from "../utils/apiGetters";
import { DashProp } from "../utils/types";

const AirQuality = ({ dash = false }: DashProp) => {
	const { data: airQuality } = useQuery(["weather"], getWeatherData, {
		select(data) {
			return calcAQICategory(data.current.air_quality.pm2_5);
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
					className={`w-full ${dash ? " " : "p-3"} `}
				>
					<div
						className={`${
							dash ? "p-3" : "p-5 "
						} w-full rounded-md bg-gray-900 hover:bg-gray-800 transition-colors`}
					>
						<div className={`flex w-full  ${dash ? " justify-center" : "p-3"}`}>
							<div
								className={`${dash ? "text-4xl" : "text-6xl"} ${
									airQuality.color
								} px-3 my-auto font-extrabold text-center`}
							>
								{airQuality.aqi}
							</div>
							<div
								className={`${airQuality.color} leading-6 font-black ${
									dash ? "text-lg leading-none" : "text-2xl flex-grow"
								}  inline-block self-center ml-3 text-center `}
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

								<div className=" font-light text-sm">10 minute average</div>
							</div>
						</div>
						<div
							className={`  text-white ${dash ? "text-base" : "text-xl p-3"}`}
						>
							The air quality is{" "}
							<span
								className={` ${dash ? "text-lg" : " text-2xl"}  ${
									airQuality.color
								}`}
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
