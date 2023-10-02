"use client";

import { useEffect, useState } from "react";
import { getSunrise, getSunset } from "sunrise-sunset-js";
import { ArrowDown, ArrowUp } from "lucide-react";
import dayjs from "dayjs";
import { Box, Flex, Text } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

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
		<Box className="group">
			<div
				className={`light-line absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-50 mix-blend-lighten transition-opacity duration-500 group-hover:opacity-100 ${
					!isNight ? "rotate-180" : ""
				}`}
			/>
			<div
				className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2  ${
					isNight ? "flex-col" : "flex-col-reverse"
				} gap-3`}
			>
				<div className=" flex flex-col items-center ">
					<Text size="2" weight="regular" color="amber">
						Sunrise at
					</Text>
					<div className="flex items-center gap-2">
						<SunIcon height={24} width={24} className=" text-amber-200 " />
						<p className="bg-gradient-to-t from-amber-700 to-amber-400 bg-clip-text text-4xl font-bold leading-none text-transparent dark:from-amber-300 dark:to-amber-100">
							{dayjs(end).format("h:mma")}
						</p>
					</div>
				</div>
				<div className="flex flex-col items-center  font-bold opacity-50">
					<Text size="2" weight="regular" color="indigo">
						Sunset at
					</Text>
					<div className="flex items-center gap-2">
						<MoonIcon className="text-indigo-500" height={24} width={24} />
						<p className="bg-gradient-to-t from-indigo-900 to-indigo-600 bg-clip-text text-4xl font-bold leading-none text-transparent dark:from-indigo-600 dark:to-indigo-400">
							{dayjs(start).format("h:mma")}
						</p>
					</div>
				</div>
			</div>
		</Box>
	);
};
export default SunMoonCycle;
