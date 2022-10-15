import Color from "colorjs.io";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSunrise, getSunset } from "sunrise-sunset-js";
import MoonIcon from "./MoonIcon";
import SunIcon from "./SunIcon";
import chroma from "chroma-js";
import dayjs from "dayjs";

const getSunCycleData = () => {
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

	let percentComplete = 0;
	if (isNight) {
		percentComplete = (now - sunset) / (sunrise - sunset);
	} else {
		percentComplete = (now - sunrise) / (sunset - sunrise);
	}

	// let startColor, endColor;
	let gradient: chroma.Scale<chroma.Color>;
	let end: number;
	let start: number;
	if (sunrise < sunset) {
		// startColor = new Color("#fcbf49");
		// endColor = new Color("#390099");
		gradient = chroma.scale([
			"#4cc9f0",
			"#61e8e1",
			"#f2e863",
			"#ff9f1c",
			"#f72585",
		]);
		end = sunset;
		start = sunrise;
	} else {
		end = sunrise;
		start = sunset;
		gradient = chroma.scale([
			"#f72585",
			"#560bad",
			"#3a0ca3",
			"#4361ee",
			"#4cc9f0",
		]);
	}
	return { end, start, gradient, percentComplete, isNight };
};

const SunMoonCycle = () => {
	const [moonPosition, setMoonPosition] = useState(0);
	const [nowColor, setNowColor] = useState<string | chroma.Color>(
		"rgb(59, 130, 246)"
	);
	const [startColor, setStartColor] = useState<
		string | chroma.Color | undefined
	>();
	const [endColor, setEndColor] = useState<string | chroma.Color>(
		new Color("gold")
	);
	const [start, setStart] = useState<number>();
	const [end, setEnd] = useState<number>();
	const [isNight, setIsNight] = useState(false);

	useEffect(() => {
		const update = () => {
			const { end, start, gradient, percentComplete, isNight } =
				getSunCycleData();

			setIsNight(isNight);
			setEnd(end);
			setStart(start);

			setStartColor(gradient(0));
			setEndColor(gradient(1));
			setNowColor(gradient(percentComplete));

			setMoonPosition(percentComplete);
		};
		update();

		const interval = setInterval(() => {
			update();
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="py-2">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className=" w-full rounded-md bg-gray-900 hover:bg-gray-800 transition-colors flex flex-col px-16 py-12"
			>
				<div className="relative w-full rounded-full bg-gray-700 ">
					<div className="z-50 absolute top-1 left-1 flex flex-col ">
						<div
							style={{ color: startColor?.toString() }}
							className="w-7 h-7 bg-gray-800  rounded-full   shadow-sm p-1"
						>
							{isNight ? <MoonIcon /> : <SunIcon />}
						</div>
						<div
							style={{ color: startColor?.toString() }}
							className={` text-sm font-black mt-2 transform ${
								isNight ? "-translate-x-2" : "-translate-x-4"
							} text-center leading-3`}
						>
							<div className="font-light font-mono">
								{isNight ? "Sunset" : "Sunrise"}
							</div>
							{dayjs(start).format("HH:mm")}
						</div>
					</div>
					<motion.div
						className="text-6xl relative h-9 rounded-full z-40"
						initial={{
							width: "1.75rem",
							// backgroundImage: `linear-gradient(to right,rgb(59, 130, 246),${color})`,
							// background: `linear-gradient(to right,lch(54.619% 66.365 277.595),${color})`,
						}}
						style={{
							background: `linear-gradient(to right,${startColor},${nowColor})`,
						}}
						animate={{
							width: `${10 + moonPosition * 80}%`,
							// background: `linear-gradient(to right,lch(54.619% 66.365 277.595),${color})`,
						}}
						transition={{
							duration: 1,
						}}
					>
						<div className=" absolute top-1 right-1 flex flex-col content-end justify-end items-end">
							<div
								style={{ backgroundColor: nowColor.toString() }}
								className="w-7 h-7 rounded-full  border-2 border-gray-700  shadow-sm "
							></div>

							<div
								style={{ color: nowColor.toString() }}
								className={` text-sm font-black  transform ${
									moonPosition > 0.1 && moonPosition < 0.9
										? "translate-x-2 mt-2"
										: "translate-x-1 -translate-y-16"
								} text-center leading-3`}
							>
								<div className="font-light font-mono">Now</div>
								{dayjs().format("HH:mm")}
							</div>
						</div>
					</motion.div>
					<div className="w-7 h-7 top-1 absolute right-1 rounded-full p-1"></div>
					<div className="z-30 absolute top-1 right-1 flex flex-col items-end">
						<div
							style={{ backgroundColor: endColor.toString() }}
							className="w-7 h-7 bg-gray-800  rounded-full   shadow-sm p-1 "
						>
							{isNight ? <SunIcon /> : <MoonIcon />}
						</div>
						<div
							style={{ color: endColor.toString() }}
							className={` text-sm font-black mt-2 transform ${
								isNight ? "translate-x-4" : "translate-x-3"
							} text-center leading-3`}
						>
							<div className="font-light font-mono">
								{isNight ? "Sunrise" : "Sunset"}
							</div>
							{dayjs(end).format("HH:mm")}
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};
export default SunMoonCycle;
