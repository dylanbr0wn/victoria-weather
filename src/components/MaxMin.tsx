import { Point, PointProperties, PointsData } from "../utils/types";
import { usePointsData } from "../pages/api/points.swr";
import AnimatePresence from "./common/AnimatePresence";
import { useMemo } from "react";
import type { Feature, Point as GeoPoint } from "geojson";
import { MapPin } from "lucide-react";
import Tooltip from "./Tooltip";

const getPointTemperature = (point: Point | undefined) => {
	return `${point?.properties.temperature}   °${point?.properties.temperature_units}`;
};

function calcPercentage(value: number, min: number, max: number) {
	return ((value - min) / (max - min)) * 100;
}

type TempScalePoint = {
	[key: string]: {
		points: Feature<GeoPoint, PointProperties>[];
		percentage: number;
		temp: string;
	};
};

function processPoints(
	points: PointsData["points"]["features"] | undefined,
	max: Point | undefined,
	min: Point | undefined
) {
	const maxTemp = max?.properties.temperature;
	const minTemp = min?.properties.temperature;
	if (!maxTemp || !minTemp) return null;
	const tempScalePoints = points.reduce<TempScalePoint>((acc, point) => {
		if (point.properties.station_id === max.properties.station_id) return acc;
		if (point.properties.station_id === min.properties.station_id) return acc;

		const tempScalePoint = acc[point.properties.temperature];
		const pointPercentage = calcPercentage(
			point.properties.temperature,
			minTemp,
			maxTemp
		);

		if (tempScalePoint) {
			acc[point.properties.temperature] = {
				...tempScalePoint,
				points: [...tempScalePoint.points, { ...point }],
			};
		} else {
			acc[point.properties.temperature] = {
				points: [{ ...point }],
				percentage: pointPercentage,
				temp: getPointTemperature(point as unknown as Point),
			};
		}
		return acc;
	}, {});
	return Object.values(tempScalePoints);
}

const MaxMin = () => {
	const { data } = usePointsData();

	const tempPoints = useMemo(
		() =>
			processPoints(data?.points.features, data?.max_point, data?.min_point),
		[data]
	);

	if (!data) return null;

	return (
		<AnimatePresence show={!!data}>
			<div className={`flex pt-16 pb-6 w-full rounded-md justify-center`}>
				<div className="w-3/4 h-2 relative mx-auto">
					<div className="h-full w-full rounded-full bg-gradient-to-r from-indigo-700 via-teal-400 to-orange-600" />
					<div className="absolute w-full h-full rounded-full bg-gradient-to-r from-indigo-700 via-teal-400 to-orange-600 mx-auto blur-xl top-0" />

					<div className=" absolute left-0 bottom-0 translate-y-1.5 -translate-x-1/2  flex flex-col items-center justify-center gap-2 z-20  pointer-events-none">
						<div className="bg-gradient-to-t from-indigo-600 to-indigo-400 font-bold text-transparent bg-clip-text text-2xl">
							{getPointTemperature(data?.min_point)}
						</div>
						<Tooltip
							content={
								<div className="flex flex-col justify-center gap-1">
									<h4 className="bg-gradient-to-t text-center from-indigo-600 to-indigo-400 font-bold text-transparent bg-clip-text text-2xl">
										{getPointTemperature(data?.min_point)}
									</h4>

									<div className="text-sm flex gap-2 items-center text-indigo-500">
										<div>{data?.min_point.properties.station_long_name}</div>
									</div>
								</div>
							}
						>
							<div className="relative h-5 w-5 cursor-pointer">
								<div className="rounded-full h-5 w-5 bg-indigo-600 shadow-md peer pointer-events-auto" />
								<div className="rounded-full h-10 w-10 bg-indigo-600 absolute top-0 left-0 -translate-y-[10px] -translate-x-[10px] -z-10 peer-hover:opacity-20 opacity-0 transition-opacity duration-300 blur " />
							</div>
						</Tooltip>
						{/* <div className="text-indigo-400 opacity-80 font-thin ">
							{data?.min_point.properties.station_long_name}
						</div> */}
					</div>

					{tempPoints?.map((point) => {
						return (
							<Tooltip
								key={point.percentage}
								content={
									<div className="flex flex-col justify-center gap-1">
										<h4 className="font-bold text-xl text-center">
											{point.temp}
										</h4>
										{point.points.map((p) => (
											<div
												className="text-sm flex gap-2 items-center"
												key={p.properties.station_id}
											>
												<MapPin className="w-3 h-3 text-neutral-700" />
												<div>{p.properties.station_long_name}</div>
											</div>
										))}
									</div>
								}
							>
								<div
									style={{ left: `${point.percentage}%` }}
									className="h-3 w-[4px] rounded-full bg-neutral-300 absolute -translate-y-2.5 hover:scale-150 transition-all duration-300 z-10 hover:bg-white cursor-pointer"
								/>
							</Tooltip>
						);
					})}
					<div className="absolute right-0 bottom-0 translate-y-2 translate-x-1/2 z-20 flex flex-col items-center justify-center gap-2 group pointer-events-none">
						<div className=" bg-gradient-to-t from-orange-600 to-orange-400 font-bold text-transparent bg-clip-text text-2xl">
							{getPointTemperature(data?.max_point)}
						</div>
						<Tooltip
							content={
								<div className="flex flex-col justify-center gap-1">
									<h4 className="bg-gradient-to-t text-center from-orange-600 to-orange-400 font-bold text-transparent bg-clip-text text-2xl">
										{getPointTemperature(data?.max_point)}
									</h4>

									<div className="text-sm flex gap-2 items-center text-orange-500">
										<div>{data?.max_point.properties.station_long_name}</div>
									</div>
								</div>
							}
						>
							<div className="relative h-6 w-6 cursor-pointer">
								<svg
									className="rounded h-6 w-6 text-orange-600 absolute  drop-shadow-md peer pointer-events-auto"
									width="16"
									height="13"
									viewBox="0 0 16 13"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M7.13392 0.5C7.51882 -0.166667 8.48107 -0.166666 8.86597 0.500001L14.9282 11C15.3131 11.6667 14.8319 12.5 14.0621 12.5H1.93777C1.16797 12.5 0.686846 11.6667 1.07175 11L7.13392 0.5Z" />
								</svg>
								<svg
									className="rounded h-12 w-12 text-orange-600 absolute top-0 left-0 -translate-y-3 -translate-x-3 -z-10 peer-hover:opacity-20 opacity-0 transition-opacity duration-300 blur"
									width="16"
									height="13"
									viewBox="0 0 16 13"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M7.13392 0.5C7.51882 -0.166667 8.48107 -0.166666 8.86597 0.500001L14.9282 11C15.3131 11.6667 14.8319 12.5 14.0621 12.5H1.93777C1.16797 12.5 0.686846 11.6667 1.07175 11L7.13392 0.5Z" />
								</svg>
							</div>
						</Tooltip>

						{/* <div className="text-orange-400 opacity-80 font-thin ">
							{data?.max_point.properties.station_long_name}
						</div> */}
					</div>

					{/* <div className="rounded-full h-5 w-5 bg-orange-600 absolute right-0 top-0 translate-x-1/2 -translate-y-[6px] shadow-md z-10"></div> */}
				</div>
			</div>
		</AnimatePresence>
	);
};

export default MaxMin;
