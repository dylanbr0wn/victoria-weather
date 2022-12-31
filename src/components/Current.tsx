import { usePointsData } from "../pages/api/points.swr";
import AnimatePresence from "./common/AnimatePresence";
import { EdittingWrapper } from "./EditingWrapper";

export default function Current({
	id,
	isPreview,
}: {
	id: string;
	isPreview?: boolean;
}) {
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
		<AnimatePresence show={!!pointsData}>
			<div
				className={`w-full rounded-lg py-2 px-4 relative overflow-hidden group h-[115px] flex flex-col justify-evenly border-sky-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-sky-700/10 bg-[#11091b]`}
			>
				<div className="flex justify-center">
					{/* <div className="text-7xl mr-8 flex flex-col text-center ">
        <div>{weatherIcon(data.weather.current.condition.code).icon}</div>
      </div> */}
					<div className={` flex flex-col ${color}`}>
						<div
							className={` tracking-wide ${
								isPreview ? "text-4xl" : "text-6xl"
							}  font-black text-center`}
						>
							{pointsData?.average_temp.toFixed(1)}
							<span className="text-4xl font-light">℃</span>
						</div>
						<div
							className={` ${
								isPreview ? "text-sm" : "text-lg"
							}  font-light leading-3 text-center`}
						>
							Current Temperature
						</div>
					</div>
				</div>
			</div>
		</AnimatePresence>
	);
}
