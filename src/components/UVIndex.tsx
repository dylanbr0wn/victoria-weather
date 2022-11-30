import { useWeatherData } from "../pages/api/weather.swr";
import AnimatePresence from "./common/AnimatePresence";
import * as React from "react";

const UVIndex = () => {
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
			<div
				className={`py-2 px-4 w-full rounded-lg transition-colors relative overflow-hidden group h-[115px] flex flex-col justify-evenly`}
			>
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
					{/* {dash ? uvData?.messageShort : uvData?.message} */}
				</div>
				{/* <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-br from-amber-600 to-purple-900/10 opacity-20 transition-opacity group-hover:opacity-30 duration-500 pointer-events-none" /> */}
			</div>
		</AnimatePresence>
		// <motion.div
		// 	initial={{ opacity: 0 }}
		// 	animate={{ opacity: 1 }}
		// 	exit={{ opacity: 0 }}
		// 	transition={{ duration: 1 }}
		// 	className={`w-full ${dash ? " " : "p-3"} `}
		// >
	);
};
export default UVIndex;
