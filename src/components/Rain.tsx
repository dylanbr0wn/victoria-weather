"use client";

import { Card, Flex, Text } from "@radix-ui/themes";
import { RainData } from "../utils/types";

const Rain = ({ rain }: { rain: RainData }) => {
	return (
		<Flex gap="3" direction="column" align="center" mt="3">
			<Flex gap="5" align="center" justify="center">
				<div className="relative h-20 w-8 overflow-hidden rounded-b-full border-x border-b border-sky-100/50 bg-gradient-to-tr from-slate-900 to-slate-800">
					<div className="absolute right-0 top-1/4 z-10 h-[1px] w-3 bg-sky-100/50" />
					<div className="absolute right-0 top-1/2 z-10 h-[1px] w-3 bg-sky-100/50" />
					<div className="absolute right-0 top-3/4 z-10 h-[1px] w-3 bg-sky-100/50" />
					<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						style={{ display: "none" }}
					>
						<symbol id="wave">
							<path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
							<path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
							<path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
							<path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
						</symbol>
					</svg>
					<div
						id="water"
						className="water  bg-sky-400 transition-all duration-500 group-hover:opacity-30"
						style={{
							transform: `translateY(${
								70 - 50 * ((rain.average_rain ?? 0) / 40)
							}px)`,
						}}
					>
						<svg
							viewBox="0 0 560 20"
							className="water_wave water_wave_back -z-10 fill-current text-sky-700"
						>
							<use xlinkHref="#wave"></use>
						</svg>
						<svg
							viewBox="0 0 560 20"
							className="water_wave water_wave_front z-0 fill-current text-sky-400"
						>
							<use xlinkHref="#wave"></use>
						</svg>
					</div>
				</div>
				<Flex direction="column">
					<div className="flex items-end leading-none ">
						<div
							className={` bg-gradient-to-t  from-sky-700 to-sky-300 bg-clip-text text-6xl font-black text-transparent`}
						>
							{!rain.average_rain || rain.average_rain === 0
								? "0.00"
								: rain.average_rain?.toFixed(2)}
						</div>
						<div
							className={`ml-1 bg-gradient-to-t from-sky-700 to-sky-300 bg-clip-text text-2xl text-transparent`}
						>
							mm
						</div>
					</div>
					<Text size="2" align="center" color="gray">
						average past 24 hours
					</Text>
				</Flex>
			</Flex>
			<div>
				<Text size="5" color="sky">
					{rain.number_reporting ?? 0}
				</Text>{" "}
				<Text size="3">stations currently reporting rain.</Text>{" "}
			</div>
		</Flex>
	);
};
export default Rain;
