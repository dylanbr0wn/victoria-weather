"use client";

import { Point, PointProperties, PointsData } from "../utils/types";
import { useMemo } from "react";
import type { Feature, Point as GeoPoint } from "geojson";
import { Flex, HoverCard, Strong, Text } from "@radix-ui/themes";

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

	if (maxTemp === undefined || minTemp === undefined) return null;
	const tempScalePoints = points?.reduce<TempScalePoint>((acc, point) => {
		if (point.properties.station_id === max?.properties.station_id) return acc;
		if (point.properties.station_id === min?.properties.station_id) return acc;

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
	return Object.values(tempScalePoints ?? {});
}

const MaxMin = ({
	points
}: {
	points: PointsData
}) => {
	const tempPoints = useMemo(
		() =>
			processPoints(points.points.features, points.max_point, points.min_point),
		[points]
	);

	return (
		<Flex mt="4" justify="between" direction="column" align="baseline" gap="3">
			<div className="relative mx-auto mt-12 h-2 w-3/4">
				<div className="h-full w-full rounded-full bg-gradient-to-r from-indigo-700 via-teal-400 to-orange-600" />
				<div className="absolute top-0 mx-auto h-full w-full rounded-full bg-gradient-to-r from-indigo-700 via-teal-400 to-orange-600 blur-xl" />

				<div className=" pointer-events-none absolute bottom-0 left-0 z-20  flex -translate-x-1/2 translate-y-1.5 flex-col items-center justify-center  gap-2">
					<div className="bg-gradient-to-t from-indigo-600 to-indigo-400 bg-clip-text text-2xl font-bold text-transparent">
						{getPointTemperature(points.min_point)}
					</div>
					<HoverCard.Root>
						<HoverCard.Trigger>
							<div className="relative h-5 w-5 cursor-pointer">
								<div className="peer pointer-events-auto h-5 w-5 rounded-full border border-transparent bg-indigo-600 shadow-md transition-colors hover:border-indigo-300" />
								<div className="absolute left-0 top-0 -z-10 h-10 w-10 -translate-x-[10px] -translate-y-[10px] rounded-full bg-indigo-600 opacity-0 blur transition-opacity duration-300 peer-hover:opacity-10 " />
							</div>
						</HoverCard.Trigger>
						<HoverCard.Content align="center" side="top">
							<div className="flex flex-col justify-center gap-1">
								<Text align="center" size="5">
									<Strong>{getPointTemperature(points.min_point)}</Strong>
								</Text>
								<Text size="2">
									{points.min_point.properties.station_long_name}
								</Text>
							</div>
						</HoverCard.Content>
					</HoverCard.Root>
				</div>

				{tempPoints?.map((point) => {
					return (
						<HoverCard.Root key={point.percentage}>
							<HoverCard.Trigger>
								<div
									style={{ left: `${point.percentage}%` }}
									className="absolute z-10 h-3 w-[4px] -translate-y-2.5 cursor-pointer rounded-full bg-neutral-600 transition-all duration-300 hover:scale-150 hover:bg-black dark:bg-neutral-300 dark:hover:bg-white"
								/>
							</HoverCard.Trigger>
							<HoverCard.Content align="center" side="top">
								<div className="flex flex-col justify-center gap-1">
									<Text align="center" size="5">
										<Strong>{point.temp}</Strong>
									</Text>
									{point.points.map((p) => (
										<ul
											className="flex list-inside list-disc items-center gap-2 text-sm"
											key={p.properties.station_id}
										>
											{/* <SewingPinIcon height={16} width={16} /> */}
											<li className="list-item">
												<Text size="2">{p.properties.station_long_name}</Text>
											</li>
										</ul>
									))}
								</div>
							</HoverCard.Content>
						</HoverCard.Root>
					);
				})}
				<div className="group pointer-events-none absolute bottom-0 right-0 z-20 flex translate-x-1/2 translate-y-2 flex-col items-center justify-center gap-2">
					<div className=" bg-gradient-to-t from-orange-600 to-orange-400 bg-clip-text text-2xl font-bold text-transparent">
						{getPointTemperature(points.max_point)}
					</div>
					<HoverCard.Root>
						<HoverCard.Trigger>
							<div className="relative h-6 w-6 cursor-pointer">
								<svg
									className="peer pointer-events-auto absolute h-6 w-6  rounded stroke-transparent stroke-1 text-orange-600 drop-shadow-md transition-colors hover:stroke-orange-200"
									width="16"
									height="13"
									viewBox="0 0 16 13"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M7.13392 0.5C7.51882 -0.166667 8.48107 -0.166666 8.86597 0.500001L14.9282 11C15.3131 11.6667 14.8319 12.5 14.0621 12.5H1.93777C1.16797 12.5 0.686846 11.6667 1.07175 11L7.13392 0.5Z" />
								</svg>
								<svg
									className="absolute left-0 top-0 -z-10 h-12 w-12 -translate-x-3 -translate-y-3 rounded text-orange-600 opacity-0 blur transition-opacity duration-300 peer-hover:opacity-10"
									width="16"
									height="13"
									viewBox="0 0 16 13"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M7.13392 0.5C7.51882 -0.166667 8.48107 -0.166666 8.86597 0.500001L14.9282 11C15.3131 11.6667 14.8319 12.5 14.0621 12.5H1.93777C1.16797 12.5 0.686846 11.6667 1.07175 11L7.13392 0.5Z" />
								</svg>
							</div>
						</HoverCard.Trigger>
						<HoverCard.Content align="center" side="top">
							<div className="flex flex-col justify-center gap-1">
								<Text align="center" size="5">
									<Strong>{getPointTemperature(points.max_point)}</Strong>
								</Text>
								<Text size="2">
									{points.max_point.properties.station_long_name}
								</Text>
							</div>
						</HoverCard.Content>
					</HoverCard.Root>
				</div>
			</div>
			<div className="w-full text-center text-sm dark:text-white">
				{tempPoints?.length}
				<span className="opacity-50"> stations reporting temperature data</span>
			</div>
		</Flex>
	);
};

export default MaxMin;
