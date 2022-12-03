import Color from "colorjs.io";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSunrise, getSunset } from "sunrise-sunset-js";
import chroma from "chroma-js";
import { ArrowDown, ArrowUp } from "lucide-react";
import dayjs from "dayjs";

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

		let percentComplete = 0;
		if (isNight) {
			percentComplete = (now - sunset) / (sunrise - sunset);
		} else {
			percentComplete = (now - sunrise) / (sunset - sunrise);
		}

		// let startColor, endColor;
		let gradient: chroma.Scale<chroma.Color>;
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
			setEnd(sunset);
			setStart(sunrise);
		} else {
			setEnd(sunrise);
			setStart(sunset);
			gradient = chroma.scale([
				"#f72585",
				"#560bad",
				"#3a0ca3",
				"#4361ee",
				"#4cc9f0",
			]);
		}

		setStartColor(gradient(0));
		setEndColor(gradient(1));
		setNowColor(gradient(percentComplete));

		setMoonPosition(percentComplete);
	}, []);

	// useEffect(() => {
	//     if (moonPosition > 0) {

	//     }
	// }, [endColor, moonPosition, startColor]);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className=" w-full rounded-md transition-colors relative h-[115px] justify-center group"
		>
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
		</motion.div>
	);
};
export default SunMoonCycle;
