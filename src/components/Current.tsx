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
		<EdittingWrapper
			id={id}
			isPreview={isPreview}
			alternate={
				<div className="w-full rounded-lg bg-gradient-to-b from-gray-400 to-gray-300 backdrop-blur flex justify-center items-center h-[115px] border-gray-800 border transition-all duration-500 shadow-lg shadow-transparent hover:shadow-gray-700/10">
					<div className="bg-gradient-to-b  pointer-events-none  to-[#0f0e10] from-gray-800 bg-clip-text text-transparent text-3xl font-bold text-center">
						Current Temperature
					</div>
				</div>
			}
		>
			<AnimatePresence show={!!pointsData}>
				<div
					className={`w-full rounded-lg py-2 px-4 relative overflow-hidden group h-[115px] flex flex-col justify-evenly border-sky-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-sky-700/10 bg-[#11091b]`}
				>
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
			</AnimatePresence>
		</EdittingWrapper>
	);
}
