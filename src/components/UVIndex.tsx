import { motion } from "framer-motion";
import { DashProp } from "../utils/types";
import { useWeatherData } from "../pages/api/weather.swr";

const UVIndex = ({ dash = false }: DashProp) => {
	const { data } = useWeatherData();

	if (!data) return null;
	const uvData = data.uv;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1 }}
			className={`w-full ${dash ? " " : "p-3"} `}
		>
			<div
				className={`${
					dash ? "p-3" : "p-5 "
				} w-full rounded-md bg-gray-900 hover:bg-gray-800 transition-colors`}
			>
				<div className={`flex w-full justify-evenly ${dash ? " " : "p-3"}`}>
					<div className={` ${dash ? "text-4xl" : "text-6xl"} flex-shrink`}>
						☀️
					</div>
					<div
						className={`flex-grow tracking-widest flex ml-8 ${uvData.color} items-end`}
					>
						<div className={`${dash ? "text-4xl" : "text-6xl"} font-black `}>
							{uvData.uv}
						</div>
						<a
							href="https://en.wikipedia.org/wiki/Ultraviolet_index"
							rel="noopener noreferrer"
							target="_blank"
							className="ml-1 align-bottom mb-1 block hover:underline"
						>
							UV Index
						</a>
					</div>
				</div>
				<div className={`  text-white ${dash ? "text-base" : "text-xl p-3"}`}>
					<span className={`${dash ? "text-lg" : "text-2xl"} ${uvData.color}`}>
						{uvData.status}{" "}
					</span>
					{dash ? uvData.messageShort : uvData.message}
				</div>
			</div>
		</motion.div>
	);
};
export default UVIndex;
