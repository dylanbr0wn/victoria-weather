import { useEffect, useState } from "react";
import { getSunrise, getSunset } from "sunrise-sunset-js";
import { ArrowDown, ArrowUp } from "lucide-react";
import dayjs from "dayjs";
import AnimatePresence from "./common/AnimatePresence";
import { EdittingWrapper } from "./EditingWrapper";

const SunMoonCycle = () => {
	const [start, setStart] = useState<number>();
	const [end, setEnd] = useState<number>();
	const [isNight, setIsNight] = useState(false);

	useEffect(() => {
		let sunset = getSunset(48.45, -123.4).getTime();
		let sunrise = getSunrise(48.45, -123.4).getTime();

		const now = Date.now();

		if (sunrise < now && sunset < now) {
			if (sunrise < sunset) {
				sunrise += 86400000;
				if (sunrise < now && sunset < now) {
					sunset += 86400000;
				}
			} else {
				sunset += 86400000;
				if (sunrise < now && sunset < now) {
					sunrise += 86400000;
				}
			}
		}

		const isNight = !!(sunset < now && now < sunrise);
		setIsNight(isNight);

		if (sunrise < sunset) {
			setEnd(sunset);
			setStart(sunrise);
		} else {
			setEnd(sunrise);
			setStart(sunset);
		}
	}, []);

	return (
		<EdittingWrapper
			alternate={
				<div className="w-full rounded-lg bg-[#120a1d]/50 backdrop-blur flex justify-center items-center h-[115px] border-purple-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-purple-700/10">
					<div className="bg-gradient-to-r from-amber-300 to-purple-700 bg-clip-text text-transparent text-3xl font-bold text-center pointer-events-none">
						Sunrise and Sunset
					</div>
				</div>
			}
		>
			<AnimatePresence show={!!start && !!end}>
				<div className=" w-full rounded-md relative h-[115px] justify-center group border-purple-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-purple-700/10 overflow-hidden bg-[#11091b]">
					<div
						className={`h-full w-[450px] opacity-50 group-hover:opacity-100 transition-opacity duration-500 light-line absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
							!isNight ? "rotate-180" : ""
						}`}
					/>
					<div
						className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex  ${
							isNight ? "flex-col" : "flex-col-reverse"
						} gap-3`}
					>
						<div className=" text-3xl flex flex-col items-center">
							<p className="text-xs leading-none tracking-widest text-amber-200 font-medium">
								Sunrise at
							</p>
							<div className="flex items-center gap-2">
								<ArrowUp className="h-7 w-7 text-amber-200 " />
								<div className=" flex flex-col items-center">
									<p className="leading-none bg-gradient-to-t font-bold text-transparent from-amber-300 to-amber-100 bg-clip-text">
										{dayjs(end).format("h:mma")}
									</p>
								</div>
							</div>
						</div>
						<div className="font-bold opacity-50 text-3xl flex flex-col items-center">
							<p className="text-xs leading-none tracking-widest text-indigo-400 font-medium">
								Sunset at
							</p>
							<div className="flex items-center gap-2">
								<ArrowDown className="h-7 w-7 text-indigo-500 " />
								<div className=" flex flex-col items-center">
									<p className="bg-gradient-to-t leading-none font-bold text-transparent from-indigo-600 to-indigo-400 bg-clip-text">
										{dayjs(start).format("h:mma")}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</AnimatePresence>
		</EdittingWrapper>
	);
};
export default SunMoonCycle;
