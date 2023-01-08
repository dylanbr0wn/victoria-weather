import dayjs from "dayjs";
import { ArrowDown, ArrowUp } from "lucide-react";
import { usePointsData } from "../pages/api/points.swr";
import { useWeatherData } from "../pages/api/weather.swr";
import { weatherIcon } from "../utils/helper";
import { Weather } from "../utils/types";
import AnimatePresence from "./common/AnimatePresence";
import { EdittingWrapper } from "./EditingWrapper";

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
			className={`flex  flex-col  py-1 px-2 transition-all opacity-50 hover:opacity-100 duration-500 border-indigo-400/20 first:border-r last:border-l`}
		>
			<div className="flex text-center">
				<div className="text-slate-500 text-sm font-bold  leading-none rounded bg-gray-800 px-0.5">
					{dayjs(day.date).format("D/MM")}
				</div>
			</div>

			<div
				className={` tracking-wide text-3xl  leading-none font-black text-center ${color}`}
			>
				{day.day.avgtemp_c.toFixed(1)}
				{/* <span className="text-2xl font-light">℃</span> */}
			</div>

			<div className={`flex justify-between leading-none  h-full `}>
				<ArrowDown className="h-4 w-4 text-sky-500" />
				<div className="text-sky-500 font-light">
					{/* <b className="font-black mr-1">L:</b> */}

					{day.day.mintemp_c.toFixed(1)}
				</div>
				<ArrowUp className="h-4 w-4 text-orange-500" />
				<div className="text-orange-500 font-light">
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
			<EdittingWrapper onPointerDown={handleDrag} isPreview={isPreview}>
				<div
					className={`w-full rounded-lg py-2 px-4 relative overflow-hidden group h-[115px] flex flex-col justify-evenly border-sky-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-sky-700/10 dark:bg-[#11091b] bg-[#dee9f4]`}
				>
					<div className="flex justify-evenly">
						{/* <div className="text-7xl mr-8 flex flex-col text-center ">
        <div>{weatherIcon(data.weather.current.condition.code).icon}</div>
      </div> */}
						<div className={` flex flex-col ${color}`}>
							<div className="flex text-center">
								<div className="text-slate-500 text-sm font-bold  leading-none rounded bg-gray-800 px-0.5">
									{dayjs(observation_time).format("D/MM")}
								</div>
							</div>
							<div
								className={` tracking-wide ${
									isPreview ? "text-4xl" : "text-5xl"
								}  font-black text-center`}
							>
								{pointsData?.average_temp.toFixed(1)}
								<span className="text-3xl font-light">℃</span>
							</div>
							<div
								className={` ${
									isPreview ? "text-sm" : "text-sm"
								}  font-light leading-3 text-center`}
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
				</div>
			</EdittingWrapper>
		</AnimatePresence>
	);
}
