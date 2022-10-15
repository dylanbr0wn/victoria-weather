import { useState, useEffect } from "react";
import { Point, PointsData } from "../utils/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { usePointsData } from "../pages/api/points.swr";

// eslint-disable-next-line no-undef
type PointFeatureArray = GeoJSON.Feature<Point>[];

const filter = (data: PointsData, term: string): PointFeatureArray => {
	if (!data?.points) return [];
	return data?.points.features.filter((point) => {
		if (term.length === 0) return true;

		const name: string = point.properties.station_long_name;

		const result = name.toLowerCase().search(term.toLowerCase());
		return result >= 0;
	});
};

const truncate = (
	data: PointFeatureArray,
	resLength: number,
	totalLength: number
) => {
	return data.slice(0, Math.min(resLength, totalLength));
};

const Search = () => {
	const [search, setSearch] = useState("");
	const [resultsLength, setResultsLength] = useState<number>(0);
	const [results, setResults] = useState<PointFeatureArray>([]);
	const [searchLength, setSearchLength] = useState(4);

	const { data } = usePointsData();

	useEffect(() => {
		if (data?.points) {
			getResults(data, search, searchLength);
		}
	}, [search, searchLength, data]);

	const getResults = (pointsData: PointsData, term: string, len: number) => {
		const results = filter(pointsData, term);
		setResultsLength(results.length);
		setResults(truncate(results, len, pointsData?.points.features.length));
	};

	const onSearch = ({ target }) => {
		if (target.name === "search") {
			setSearch(target.value);
			getResults(data, target.value, searchLength);
		}
	};

	const [animationParent] = useAutoAnimate<HTMLDivElement>();
	return (
		<>
			<div
				style={{ minHeight: "28rem" }}
				className="px-10 py-5 w-full flex flex-col"
			>
				<div className="relative h-10 w-full">
					<input
						type="text"
						placeholder="Search for a station..."
						value={search}
						onChange={onSearch}
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
						const temperature = Number(properties?.temperature) || null;
						const rain = Number(properties?.rain)?.toFixed(1) || null;
						const elevation = properties.elevation || null;

						const pressure = properties.pressure
							? `${properties.pressure} ${properties.pressure_units}`
							: null;

						// const humidity = properties.
						// 	? `${properties.humidity} ${properties.humidity_units}`
						// 	: null

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
											<div className="text-gray-500 text-xs">{elevation}m</div>
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
											<div className="text-gray-500 text-xs ml-3 mr-1">💧</div>
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
											<div className="text-gray-500 text-xs ml-3 mr-1">☁️</div>
											<div className=" text-xs text-white">{pressure}</div>
										</>
									)}
								</div>
							</a>
						);
					})}
					{resultsLength === 0 && (
						<div className="w-full text-center font-black text-gray-500 p-5 text-lg">
							<span className="italic text-xl">Impossible...</span>
							<br /> Perhaps the archives are incomplete!
						</div>
					)}
					{resultsLength > searchLength && (
						<div
							onClick={() => {
								setSearchLength(searchLength * 2);
								getResults(data, search, searchLength * 2);
							}}
							className="w-full inline-block text-center hover:underline cursor-pointer text-gray-500 p-5"
						>
							show more results
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Search;
