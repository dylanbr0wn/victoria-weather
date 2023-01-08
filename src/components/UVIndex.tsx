import { useWeatherData } from "../pages/api/weather.swr";
import AnimatePresence from "./common/AnimatePresence";
import * as React from "react";
import { EdittingWrapper } from "./EditingWrapper";

const UVIndex = ({
	handleDrag = () => {},
	isPreview,
}: {
	isPreview?: boolean;
	handleDrag?: React.PointerEventHandler<HTMLButtonElement>;
}) => {
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
		<AnimatePresence show={!!uvData}>
			<EdittingWrapper onPointerDown={handleDrag} isPreview={isPreview}>
				<div className="py-2 px-4 w-full rounded-lg relative overflow-hidden group h-[115px] flex flex-col justify-evenly border-amber-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-amber-700/10 dark:bg-[#11091b] bg-[#f6f0da]">
					<div className={`flex w-full justify-center`}>
						<div className="flex-shrink relative">
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-full w-10 h-10 bg-amber-500 opacity-20 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
							<div className={`${isPreview ? "text-3xl" : "text-5xl"}`}>☀️</div>
						</div>

						<div className={` tracking-widest flex ml-4    items-end   `}>
							<div
								className={`${
									isPreview ? "text-3xl" : "text-5xl"
								} font-black bg-gradient-to-t from-amber-600 to-amber-300 bg-clip-text text-transparent `}
							>
								{uvData?.uv}
							</div>
							<a
								href="https://en.wikipedia.org/wiki/Ultraviolet_index"
								rel="noopener noreferrer"
								target="_blank"
								className={`ml-1 align-bottom mb-1 block border-b border-opacity-0 border-amber-500 hover:border-opacity-100 transition-all bg-gradient-to-t from-amber-600 to-amber-300 bg-clip-text text-transparent font-semibold ${
									isPreview ? "text-xl" : "text-2xl"
								}`}
							>
								UV Index
							</a>
						</div>
					</div>
					<div
						className={`  dark:text-white text-center ${
							isPreview ? "text-sm" : "text-lg"
						}`}
					>
						<span className={` text-amber-400 `}>{uvData?.status} </span>
						{uvData?.messageShort}
					</div>
				</div>
			</EdittingWrapper>
		</AnimatePresence>
	);
};
export default UVIndex;
