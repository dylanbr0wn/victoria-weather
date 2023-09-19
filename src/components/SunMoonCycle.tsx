"use client";

import { useEffect, useState } from "react";
import { getSunrise, getSunset } from "sunrise-sunset-js";
import { ArrowDown, ArrowUp } from "lucide-react";
import dayjs from "dayjs";
import AnimatePresence from "./common/AnimatePresence";
import { EdittingWrapper } from "./EditingWrapper";
import { Card } from "@radix-ui/themes";

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
			{/* <div className=" w-full rounded-md relative h-[130px] justify-center group border-purple-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-purple-700/10 overflow-hidden dark:bg-[#11091b] bg-[#dec8f4]"> */}
			<Card size="3" className="group h-[130px]">
				<div
					className={`light-line absolute left-1/2 top-1/2 h-full w-[450px] -translate-x-1/2 -translate-y-1/2 opacity-50 mix-blend-lighten transition-opacity duration-500 group-hover:opacity-100 ${
						!isNight ? "rotate-180" : ""
					}`}
				/>
				<div
					className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2  ${
						isNight ? "flex-col" : "flex-col-reverse"
					} gap-3`}
				>
					<div className=" flex flex-col items-center text-3xl">
						<p className="text-xs font-medium leading-none tracking-widest text-amber-600 dark:text-amber-200">
							Sunrise at
						</p>
						<div className="flex items-center gap-2">
							<ArrowUp className="h-7 w-7 text-amber-600 dark:text-amber-200" />
							<div className=" flex flex-col items-center">
								<p className="bg-gradient-to-t from-amber-700 to-amber-400 bg-clip-text font-bold leading-none text-transparent dark:from-amber-300 dark:to-amber-100">
									{dayjs(end).format("h:mma")}
								</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col items-center text-3xl font-bold opacity-50">
						<p className="text-xs font-medium leading-none tracking-widest text-indigo-500 dark:text-indigo-400">
							Sunset at
						</p>
						<div className="flex items-center gap-2">
							<ArrowDown className="h-7 w-7 text-indigo-700 dark:text-indigo-500" />
							<div className=" flex flex-col items-center">
								<p className="bg-gradient-to-t from-indigo-900 to-indigo-600 bg-clip-text font-bold leading-none text-transparent dark:from-indigo-600 dark:to-indigo-400">
									{dayjs(start).format("h:mma")}
								</p>
							</div>
						</div>
					</div>
				</div>
			</Card>
			{/* </div> */}
		</AnimatePresence>
	);
};
export default SunMoonCycle;
