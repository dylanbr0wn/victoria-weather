"use client";

import dayjs from "dayjs";
import { ArrowDown, ArrowUp } from "lucide-react";
import { usePointsData } from "../pages/api/points.swr";
import { useWeatherData } from "../pages/api/weather.swr";
import { Weather } from "../utils/types";
import AnimatePresence from "./common/AnimatePresence";
import { EdittingWrapper } from "./EditingWrapper";
import { Card } from "@radix-ui/themes";

function DayForecast({ day }: { day: Weather["forecast"]["forecastday"][0] }) {
	const color =
		day.day.avgtemp_c < 10
			? "text-blue-500"
			: day.day.avgtemp_c < 20
			? "text-yellow-400"
			: day.day.avgtemp_c < 30
			? "text-green-500"
			: "text-red-600";

	return (
		<div
			className={`flex  flex-col  border-indigo-400/20 px-2 py-1 opacity-50 transition-all duration-500 first:border-r last:border-l hover:opacity-100`}
		>
			<div className="flex text-center">
				<div className="rounded bg-neutral-300 px-0.5  text-sm font-bold leading-none text-slate-500 transition-colors duration-500 dark:bg-neutral-800">
					{dayjs(day.date).format("D/MM")}
				</div>
			</div>

			<div
				className={` text-center text-3xl  font-black leading-none tracking-wide ${color}`}
			>
				{day.day.avgtemp_c.toFixed(1)}
				{/* <span className="text-2xl font-light">℃</span> */}
			</div>

			<div className={`flex h-full justify-between  leading-none `}>
				<ArrowDown className="h-4 w-4 text-sky-500" />
				<div className="font-light text-sky-500">
					{/* <b className="font-black mr-1">L:</b> */}

					{day.day.mintemp_c.toFixed(1)}
				</div>
				<ArrowUp className="h-4 w-4 text-orange-500" />
				<div className="font-light text-orange-500">
					{/* <b className="font-black mr-1">H:</b> */}
					{day.day.maxtemp_c.toFixed(1)}
				</div>
			</div>
		</div>
	);
}

export default function Current({
	handleDrag = () => {},
	isPreview,
}: {
	isPreview?: boolean;
	handleDrag?: React.PointerEventHandler<HTMLButtonElement>;
}) {
	const { data: weatherData } = useWeatherData();
	const response = usePointsData();

	if (!response) return null;

	const { data: pointsData } = response;

	const color =
		pointsData?.average_temp < 10
			? "text-blue-500"
			: pointsData?.average_temp < 20
			? "text-yellow-400"
			: pointsData?.average_temp < 30
			? "text-green-500"
			: "text-red-600";

	const observation_time = dayjs(
		pointsData?.max_point?.properties.observation_time ?? new Date()
	);

	return (
		<AnimatePresence show={!!pointsData}>
			<Card size="3" className="group h-full">
				<div className="flex justify-evenly">
					<div className={` flex flex-col ${color}`}>
						<div className="flex text-center">
							<div className="rounded bg-neutral-300 px-0.5  text-sm font-bold leading-none text-slate-500 transition-colors duration-500 dark:bg-neutral-800">
								{dayjs(observation_time).format("D/MM")}
							</div>
						</div>
						<div
							className={` tracking-wide ${
								isPreview ? "text-4xl" : "text-5xl"
							}  text-center font-black`}
						>
							{pointsData?.average_temp.toFixed(1)}
							<span className="text-3xl font-light">℃</span>
						</div>
						<div
							className={` ${
								isPreview ? "text-sm" : "text-sm"
							}  text-center font-light leading-3`}
						>
							{observation_time.format("DD/MM/YYYY hh:MM")}
						</div>
					</div>
					<div className="flex items-center ">
						{weatherData?.weather.forecast.forecastday.slice(1).map((day) => (
							<DayForecast day={day} key={day.date} />
						))}
					</div>
				</div>
			</Card>
			{/* <div
					className={`w-full rounded-lg py-2 px-4 relative overflow-hidden group h-[115px] flex flex-col justify-evenly border-sky-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-sky-700/10 dark:bg-[#11091b] bg-[#dee9f4]`}
				> */}

			{/* </div> */}
		</AnimatePresence>
	);
}
