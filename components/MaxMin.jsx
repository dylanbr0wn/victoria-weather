import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const getPointsData = async () => {
	const data = await fetch("/api/points-data");

	return await data.json();
};

const MaxMin = ({ dash }) => {
	const { data } = useQuery(["points"], getPointsData, {});
	return (
		<>
			{data && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1 }}
					className={`w-full ${dash ? " " : "p-3"} `}
				>
					<div
						className={`${
							dash ? "p-3 flex space-x-1" : "p-5 "
						} w-full rounded-md bg-gray-900 hover:bg-gray-800 transition-colors`}
					>
						<div>
							<div className={`flex  ${dash ? " py-2" : "p-3"}`}>
								<div
									className={` ${dash ? "text-4xl" : "text-5xl "} flex-shrink`}
								>
									🔥
								</div>
								<div className="flex-grow text-center tracking-widest">
									<span
										// style={{
										//     color: "#FF8730",
										// }}
										className={` ${
											dash ? "text-4xl leading-none" : "text-5xl"
										} font-black text-orange-400`}
									>
										{data?.points?.maxPoint?.properties.temperature.toFixed(1)}
										<span
											className={`${
												dash ? "text-3xl  leading-none" : "text-4xl"
											} font-light`}
										>
											{" "}
											℃
										</span>
									</span>
								</div>
							</div>
							<div
								className={`  text-white ${dash ? "text-lg" : "text-xl p-3"}`}
							>
								<a
									href={`https://www.victoriaweather.ca/station.php?id=${data?.points?.maxPoint?.properties.station_id}`}
									className="text-xl hover:underline text-orange-400"
									rel="noopener noreferrer"
									target="_blank"
								>
									{data?.points?.maxPoint?.properties.station_long_name}{" "}
								</a>{" "}
								is currently the{" "}
								<span style={{ color: "#FF8730" }} className="text-xl">
									warmest
								</span>{" "}
								station.
							</div>
						</div>
						<div>
							<div className={`flex  ${dash ? "py-2" : "p-3"}`}>
								<div
									className={` ${dash ? "text-4xl" : "text-5xl "} flex-shrink`}
								>
									❄️
								</div>
								<div className="flex-grow text-center tracking-widest">
									<span
										className={` ${
											dash ? "text-4xl leading-none" : "text-5xl"
										} font-black text-cyan-400`}
									>
										{data?.points?.minPoint?.properties.temperature.toFixed(1)}
										<span
											className={`${
												dash ? "text-3xl  leading-none" : "text-4xl"
											} font-light`}
										>
											{" "}
											℃
										</span>
									</span>
								</div>
							</div>
							<div
								className={`  text-white ${dash ? "text-lg" : "text-xl p-3"}`}
							>
								<a
									href={`https://www.victoriaweather.ca/station.php?id=${data?.points?.minPoint?.properties.station_id}`}
									style={{ color: "#30E6FF" }}
									className="text-xl hover:underline"
									rel="noopener noreferrer"
									target="_blank"
								>
									{data?.points?.minPoint?.properties.station_long_name}{" "}
								</a>{" "}
								is currently the{" "}
								<span style={{ color: "#30E6FF" }} className="text-xl">
									coolest
								</span>{" "}
								station.
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</>
	);
};

export default MaxMin;
