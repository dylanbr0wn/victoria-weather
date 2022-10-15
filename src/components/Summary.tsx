import dayjs from "dayjs";
import { motion } from "framer-motion";
import { weatherIcon } from "../utils/helper";
import { DashProp } from "../utils/types";
import { Weather } from "../utils/types";
import { useWeatherData } from "../pages/api/weather.swr";
import { usePointsData } from "../pages/api/points.swr";

const Summary = ({ dash = false }: DashProp) => {
	const { data } = useWeatherData();

	const { data: pointsData } = usePointsData();

	const color =
		pointsData?.average_temp < 10
			? "text-blue-500"
			: pointsData?.average_temp < 20
			? "text-yellow-400"
			: pointsData?.average_temp < 30
			? "text-green-500"
			: "text-red-600";

	if (!data) return null;
	if (!pointsData) return null;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1 }}
			className={`w-full ${dash ? "" : " p-3"}`}
			key="summary"
		>
			<div
				className={`${
					dash ? "p-3 flex" : "p-5 "
				} w-full rounded-md bg-gray-900 hover:bg-gray-800 transition-colors flex flex-col `}
			>
				<div className="flex justify-center">
					<div className="text-7xl mr-8 flex flex-col text-center ">
						<div>{weatherIcon(data.weather.current.condition.code).icon}</div>
					</div>
					<div className={` flex flex-col ${color}`}>
						<div className={` tracking-wide text-6xl font-black text-center`}>
							{pointsData?.average_temp.toFixed(1)}
							<span className="text-4xl font-light">℃</span>
						</div>
						<div className="text-lg font-light leading-3 text-center">
							Current Temperature
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col md:flex-row w-full md:space-x-2 mt-8 pb-5">
				{data.weather.forecast.forecastday.map((day) => (
					<DayForecast day={day} dash={dash} key={day.date} />
				))}
			</div>
		</motion.div>
	);
};

function DayForecast({
	dash = false,
	day,
}: DashProp & { day: Weather["forecast"]["forecastday"][0] }) {
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
			className={`flex  flex-col ${
				dash ? "p-1 w-1/3" : "p-3 flex-grow"
			}  space-y-2 rounded-md bg-gray-900 hover:bg-gray-800 transition-colors`}
		>
			<div className="flex text-center">
				<div className="text-slate-500 text-lg  leading-none">
					{dayjs(day.date).format("ddd")} {dayjs(day.date).format("D")}{" "}
					{dayjs(day.date).format("MMM")}
				</div>
			</div>

			<div
				className={`flex ${dash ? "flex-col" : ""} justify-between space-x-3`}
			>
				<div className={"flex"}>
					<div
						className={`${
							dash ? "text-2xl" : " text-3xl"
						} mr-3 flex flex-col text-center `}
					>
						<div>{weatherIcon(day.day.condition.code).icon}</div>
					</div>
					<div className={` flex flex-col  ${color}`}>
						<div
							className={` tracking-wide ${
								dash ? "text-3xl" : "text-4xl"
							}  leading-none font-black text-center`}
						>
							{day.day.avgtemp_c}
							<span className="text-2xl font-light">℃</span>
						</div>
					</div>
				</div>

				<div
					className={`flex ${
						dash ? " justify-evenly" : "flex-col justify-between"
					} leading-none  h-full`}
				>
					<div className="text-orange-500 font-light">
						<b className="font-black mr-1">H:</b>
						{day.day.maxtemp_c}
					</div>
					<div className="text-sky-500 font-light">
						<b className="font-black mr-1">L:</b>
						{day.day.mintemp_c}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Summary;
