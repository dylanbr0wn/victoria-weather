import { useEffect, useState } from "react";
import { getSunrise, getSunset } from "sunrise-sunset-js";
import { ArrowDown, ArrowUp } from "lucide-react";
import dayjs from "dayjs";
import AnimatePresence from "./common/AnimatePresence";
import { EdittingWrapper } from "./EditingWrapper";

const SunMoonCycle = ({
	handleDrag = () => {},
	isPreview,
}: {
	isPreview?: boolean;
	handleDrag?: React.PointerEventHandler<HTMLButtonElement>;
}) => {
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
		<AnimatePresence show={!!start && !!end}>
			<EdittingWrapper onPointerDown={handleDrag} isPreview={isPreview}>
				<div className=" w-full rounded-md relative h-[115px] justify-center group border-purple-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-purple-700/10 overflow-hidden dark:bg-[#11091b] bg-[#dec8f4]">
					<div
						className={`h-full w-[450px] opacity-50 group-hover:opacity-100 mix-blend-hard-light dark:mix-blend-normal transition-opacity duration-500 light-line absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
							!isNight ? "rotate-180" : ""
						}`}
					/>
					<div
						className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex  ${
							isNight ? "flex-col" : "flex-col-reverse"
						} gap-3`}
					>
						<div className=" text-3xl flex flex-col items-center">
							<p className="text-xs leading-none tracking-widest dark:text-amber-200 text-amber-600 font-medium">
								Sunrise at
							</p>
							<div className="flex items-center gap-2">
								<ArrowUp className="h-7 w-7 dark:text-amber-200 text-amber-600" />
								<div className=" flex flex-col items-center">
									<p className="leading-none bg-gradient-to-t font-bold text-transparent dark:from-amber-300 dark:to-amber-100 from-amber-700 to-amber-400 bg-clip-text">
										{dayjs(end).format("h:mma")}
									</p>
								</div>
							</div>
						</div>
						<div className="font-bold opacity-50 text-3xl flex flex-col items-center">
							<p className="text-xs leading-none tracking-widest dark:text-indigo-400 text-indigo-500 font-medium">
								Sunset at
							</p>
							<div className="flex items-center gap-2">
								<ArrowDown className="h-7 w-7 dark:text-indigo-500 text-indigo-700" />
								<div className=" flex flex-col items-center">
									<p className="bg-gradient-to-t leading-none font-bold text-transparent dark:from-indigo-600 dark:to-indigo-400 from-indigo-900 to-indigo-600 bg-clip-text">
										{dayjs(start).format("h:mma")}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</EdittingWrapper>
		</AnimatePresence>
	);
};
export default SunMoonCycle;
