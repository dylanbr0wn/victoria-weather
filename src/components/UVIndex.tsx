"use client";

import * as React from "react";
import { Flex, Text } from "@radix-ui/themes";
import { SunIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { WeatherData } from "../utils/weatherData";

const UVIndex = ({ uvData }: { uvData: WeatherData["uv"] }) => {
	React.useEffect(() => {
		if (uvData?.uv) {
			document.body.style.setProperty(
				"--uv-glow-opacity",
				`${Math.min(0.4 + uvData.uv / 11, 1)}`
			);
		}
	}, [uvData?.uv]);

	return (
		<Flex mt="5" direction="column" gap="1" align="center" className="relative">
			<div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[450px] -translate-x-1/2">
				<div className="absolute left-1/2 top-0 z-10 w-min -translate-x-1/2 -translate-y-1/2 text-amber-400 dark:text-amber-200">
					<SunIcon className="animate-spin-slow" height={30} width={30} />
					<SunIcon
						className="absolute left-0 top-0 animate-spin-slow opacity-75 blur-sm"
						height={30}
						width={30}
					/>
					<SunIcon
						className="absolute left-0 top-0 opacity-30 blur-lg"
						height={30}
						width={30}
					/>
				</div>
				<div className="absolute left-1/2 top-2 h-[50px] w-[50px] -translate-x-1/2 border-x-[100px] border-b-[100px] border-x-transparent border-b-amber-200 opacity-30 blur-2xl" />
				<motion.div
					className="uv-beam absolute left-1/2 top-0 h-full w-full opacity-0 mix-blend-soft-light"
					style={{
						backgroundImage:
							"conic-gradient(from 0deg at 50% 50%,#ffecb900 47%,#ffecb9ff 50%,#ffecb900 53%)",

						x: "-50%",
						y: "-50%",
					}}
					animate={{ opacity: [0, 0.2, 0], rotate: [-45, 45] }}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "linear",
						repeatDelay: 2,
					}}
				/>
				<motion.div
					className="uv-beam absolute left-1/2 top-0 h-full w-full opacity-0 mix-blend-soft-light "
					style={{
						backgroundImage:
							"conic-gradient(from 0deg at 50% 50%,#ffecb900 47%,#ffecb9ff 50%,#ffecb900 53%)",

						x: "-50%",
						y: "-50%",
					}}
					animate={{ opacity: [0, 0.2, 0], rotate: [-45, 45] }}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "linear",
						repeatDelay: 1,
						delay: 1,
					}}
				/>
			</div>
			<div className={`flex items-end justify-center pt-4 tracking-widest`}>
				<div
					className={`bg-gradient-to-t from-amber-600 to-amber-300 bg-clip-text  text-6xl font-black leading-none text-transparent dark:from-amber-300 dark:to-amber-200`}
				>
					{uvData.uv}
				</div>
				<a
					href="https://en.wikipedia.org/wiki/Ultraviolet_index"
					rel="noopener noreferrer"
					target="_blank"
					className={`mb-1 border-b border-transparent border-opacity-0 bg-gradient-to-t from-amber-700 to-amber-500 bg-clip-text  align-bottom text-2xl font-semibold leading-none text-transparent mix-blend-hard-light transition-all hover:border-amber-300/75 hover:border-opacity-100 dark:from-amber-300 dark:to-amber-200`}
				>
					UV Index
				</a>
			</div>
			<div>
				<Text size="4" color="amber" align="center">
					{uvData?.status}{" "}
				</Text>
				<Text align="center" size="3">
					{uvData.messageShort}
				</Text>
			</div>
		</Flex>
	);
};
export default UVIndex;
