import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPointsData } from "../utils/apiGetters";
import { Point } from "../utils/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Search = () => {
	const [search, setSearch] = useState("");

	const [results, setResults] = useState<
		// eslint-disable-next-line no-undef
		GeoJSON.Feature<Point>[]
	>([]);
	const [searchLength, setSearchLength] = useState(4);

	const { data } = useQuery(["points"], getPointsData, {});

	useEffect(() => {
		if (data?.points?.points) {
			let newResults = data?.points?.points.features
				.filter((point) => {
					if (search.length === 0) return true;

					const result = point.properties.station_long_name
						.toLowerCase()
						.search(search.toLowerCase());
					return result >= 0;
				})
				.slice(0, Math.min(data?.points?.points.features.length, searchLength));

			setResults(newResults);
		}
	}, [data, search, searchLength]);

	const onChange = ({ target }) => {
		if (target.name === "search") {
			setSearch(target.value);
		}
	};

	const [animationParent] = useAutoAnimate<HTMLDivElement>();
	return (
		<>
			{data?.points?.points && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1 }}
					style={{ minHeight: "28rem" }}
					className="px-10 py-5 w-full flex flex-col"
				>
					<div className="relative h-10 w-full">
						<input
							type="text"
							placeholder="Search for a station..."
							value={search}
							onChange={onChange}
							name="search"
							className="bg-gray-800 border-none rounded-full w-full h-full caret-white pr-5 pl-10 text-white focus:border-gray-500 transition-color focus:ring-gray-500"
						/>
						<div className="absolute h-full w-full flex top-0 items-center pointer-events-none">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-400 ml-3"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</div>

					<div className="mt-3" ref={animationParent}>
						{results.map(({ properties, geometry }) => {
							const coordinates = `${geometry.coordinates[1].toFixed(
								7
							)}, ${geometry.coordinates[0].toFixed(7)}`;

							const temperature = properties.temperature || null;
							const rain = properties.rain?.toFixed(1) || null;
							const elevation = properties.elevation || null;

							const pressure = properties.pressure
								? `${properties.pressure} ${properties.pressure_units}`
								: null;

							// const humidity = properties.
							// 	? `${properties.humidity} ${properties.humidity_units}`
							// 	: null;

							return (
								<a
									key={properties.station_id}
									className="w-full my-1 p-3 flex flex-col hover:bg-gray-800 rounded-md transition-colors"
									rel="noopener noreferrer"
									target="_blank"
									href={`https://www.victoriaweather.ca/station.php?id=${properties.station_id}`}
								>
									<div className="flex">
										<div className="text-white text-lg font-black tracking-wider ml-3">
											{properties.station_long_name}
										</div>
									</div>
									<div className="flex flex-wrap py-1">
										<div className="text-gray-500 text-xs ml-3 mr-1">📍</div>
										<div className="text-gray-500 text-xs">{coordinates}</div>
										{elevation && (
											<>
												<div className="text-gray-500 text-xs ml-3 mr-1">⬆</div>
												<div className="text-gray-500 text-xs">
													{elevation}m
												</div>
											</>
										)}

										{temperature && (
											<>
												<div className="text-gray-500 text-xs ml-3 mr-1">🌡</div>
												<div
													className={` text-xs ${
														temperature < 10
															? "text-blue-500"
															: temperature < 20
															? "text-yellow-400"
															: temperature < 30
															? "text-green-500"
															: "text-red-600"
													}`}
												>
													{temperature.toFixed(1)}℃
												</div>
											</>
										)}
										{rain && (
											<>
												<div className="text-gray-500 text-xs ml-3 mr-1">
													💧
												</div>
												<div
													style={{
														color: "#30B4FF",
													}}
													className=" text-xs"
												>
													{rain}mm
												</div>
											</>
										)}
										{pressure && (
											<>
												<div className="text-gray-500 text-xs ml-3 mr-1">
													☁️
												</div>
												<div className=" text-xs text-white">{pressure}</div>
											</>
										)}
										{/* {humidity && (
											<>
												<div className="text-gray-500 text-xs ml-3 mr-1">
													💦
												</div>
												<div
													style={{
														color: "#30E6FF",
													}}
													className=" text-xs"
												>
													{humidity}
												</div>
											</>
										)} */}
									</div>
								</a>
							);
						})}
						{results.length === 0 && (
							<div
								key="-1"
								className="w-full text-center font-black text-gray-500 p-5 text-lg"
							>
								<span className="italic text-xl">Impossible...</span>
								<br /> Perhaps the archives are incomplete!
							</div>
						)}
						{data.points.points.features.length > searchLength && (
							<div
								onClick={() => {
									setSearchLength(searchLength * 2);
								}}
								className="w-full inline-block text-center hover:underline cursor-pointer text-gray-500 p-5"
							>
								show more results
							</div>
						)}
					</div>
				</motion.div>
			)}
		</>
	);
};

export default Search;
