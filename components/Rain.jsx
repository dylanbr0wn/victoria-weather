import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const getRainData = async () => {
	const data = await fetch("/api/rain-data");

	return await data.json();
};

const Rain = ({ dash }) => {
	const { data } = useQuery(["rain"], getRainData, {});
	return (
		<>
			{data?.rain && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1 }}
					className={`w-full ${dash ? " " : "p-3"} `}
				>
					<div
						className={`${
							dash ? "p-3 flex" : "p-5 "
						} w-full rounded-md bg-gray-900 hover:bg-gray-800 transition-colors`}
					>
						<div
							className={`flex  justify-evenly ${
								dash ? "flex-shrink pr-5" : "p-3 w-full "
							}`}
						>
							<div className={` ${dash ? "text-4xl" : "text-6xl"} flex-shrink`}>
								💧
							</div>
							<div className="flex flex-col ">
								<div className="flex items-end">
									<div
										className={` ${
											dash ? "text-4xl leading-none" : "text-5xl"
										} font-black text-sky-500`}
									>
										{data?.rain.averageRain === 0
											? "0.00"
											: data.rain.averageRain.toFixed(2)}
									</div>
									<div
										className={`${
											dash ? "text-2xl  leading-none" : "text-3xl"
										} text-sky-500 ml-1`}
									>
										mm
									</div>
								</div>
								<div
									className={`${
										dash ? "text-xs tracking-wide" : "text-lg tracking-widest"
									}  font-black leading-4 text-sky-500`}
								>
									today on average
								</div>
							</div>
						</div>
						<div
							className={`  text-white ${
								dash ? "text-base flex-grow" : "text-xl p-3"
							}`}
						>
							<span className="text-2xl text-sky-500">
								{data?.rain.numberReporting}
							</span>{" "}
							stations are currently reporting rain.{" "}
							{!dash && (
								<>
									<a
										rel="noopener noreferrer"
										target="_blank"
										href={`https://www.victoriaweather.ca/station.php?id=${data?.rain.maxRain.properties.station_id}`}
										className="hover:underline text-sky-500"
									>
										{data?.rain.maxRain.properties.station_long_name}
									</a>{" "}
									has reporting the most in last 24h with{" "}
									<span style={{ color: "#30B4FF" }} className="text-2xl">
										{data?.rain.maxRain.properties.rain}
										{data?.rain.maxRain.properties.rain_units}
									</span>{" "}
									total.
								</>
							)}
						</div>
					</div>
				</motion.div>
			)}
		</>
	);
};
export default Rain;
