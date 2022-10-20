import { DashProp } from "../utils/types";
import { useWeatherData } from "../pages/api/weather.swr";
import AnimatePresence from "./common/AnimatePresence";
import * as React from "react";

const UVIndex = ({ dash = false }: DashProp) => {
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
				className={`${
					dash ? "p-3" : "p-5 my-3"
				} w-full rounded-3xl transition-colors relative overflow-hidden group`}
			>
				<div className={`flex w-full justify-center ${dash ? " " : "p-3"}`}>
					<div className={` ${dash ? "text-4xl" : "text-6xl"} flex-shrink`}>
						☀️
					</div>
					<div className={` tracking-widest flex ml-4    items-end   `}>
						<div
							className={`${
								dash ? "text-4xl" : "text-6xl"
							} font-black bg-gradient-to-t from-amber-600 to-amber-300 bg-clip-text text-transparent `}
						>
							{uvData?.uv}
						</div>
						<a
							href="https://en.wikipedia.org/wiki/Ultraviolet_index"
							rel="noopener noreferrer"
							target="_blank"
							className="ml-1 align-bottom mb-1 block hover:underline bg-gradient-to-t from-amber-600 to-amber-300 bg-clip-text text-transparent  opacity-50"
						>
							UV Index
						</a>
					</div>
				</div>
				<div className={`  text-white ${dash ? "text-base" : "text-xl p-3"}`}>
					<span className={`${dash ? "text-lg" : "text-2xl"} text-amber-400`}>
						{uvData?.status}{" "}
					</span>
					{dash ? uvData?.messageShort : uvData?.message}
				</div>
				<div className="absolute w-full h-full left-0 top-0 uv-glow opacity-30 transition-opacity group-hover:opacity-50 duration-1000" />
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
