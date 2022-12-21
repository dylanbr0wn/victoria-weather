import { useWeatherData } from "../pages/api/weather.swr";
import AnimatePresence from "./common/AnimatePresence";
import * as React from "react";
import { EdittingWrapper } from "./EditingWrapper";

const UVIndex = ({ id }: { id: string }) => {
	const { data } = useWeatherData();

	const uvData = data?.uv;

	React.useEffect(() => {
		if (uvData?.uv) {
			document.body.style.setProperty(
				"--uv-glow-opacity",
				`${Math.min(0.4 + uvData.uv / 11, 1)}`
			);
		}
	}, [uvData?.uv]);

	return (
		<EdittingWrapper
			alternate={
				<div className="w-full rounded-lg  backdrop-blur flex justify-center items-center h-[115px] border-amber-700 border-2  transition-all duration-500 shadow-lg shadow-transparent hover:shadow-amber-700/10 bg-gradient-to-b from-amber-300 to-orange-500">
					<div className="bg-gradient-to-t from-[#161007] to-amber-900  bg-clip-text text-transparent text-3xl font-bold pointer-events-none">
						UV Index
					</div>
				</div>
			}
		>
			<AnimatePresence show={!!uvData}>
				<div className="py-2 px-4 w-full rounded-lg relative overflow-hidden group h-[115px] flex flex-col justify-evenly border-amber-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-amber-700/10 bg-[#11091b]">
					<div className={`flex w-full justify-center`}>
						<div className="flex-shrink relative">
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-full w-10 h-10 bg-amber-500 opacity-20 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
							<div className="text-5xl">☀️</div>
						</div>

						<div className={` tracking-widest flex ml-4    items-end   `}>
							<div
								className={`text-5xl font-black bg-gradient-to-t from-amber-600 to-amber-300 bg-clip-text text-transparent `}
							>
								{uvData?.uv}
							</div>
							<a
								href="https://en.wikipedia.org/wiki/Ultraviolet_index"
								rel="noopener noreferrer"
								target="_blank"
								className="ml-1 align-bottom mb-1 block border-b border-opacity-0 border-amber-500 hover:border-opacity-100 transition-all bg-gradient-to-t from-amber-600 to-amber-300 bg-clip-text text-transparent font-semibold"
							>
								UV Index
							</a>
						</div>
					</div>
					<div className={`  text-white text-center`}>
						<span className={`text-lg text-amber-400`}>{uvData?.status} </span>
						{uvData?.messageShort}
					</div>
				</div>
			</AnimatePresence>
		</EdittingWrapper>
	);
};
export default UVIndex;
