import { usePointsData } from "../pages/api/points.swr";
import { useWeatherData } from "../pages/api/weather.swr";
import { weatherIcon } from "../utils/helper";

export default function Current({ dash }) {
	// const { data } = useWeatherData();
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

	return (
		<div className={`mt-5 w-full rounded-md transition-colors flex flex-col `}>
			<div className="flex justify-center">
				{/* <div className="text-7xl mr-8 flex flex-col text-center ">
					<div>{weatherIcon(data.weather.current.condition.code).icon}</div>
				</div> */}
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
	);
}
