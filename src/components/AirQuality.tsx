"use client";

import { useWeatherData } from "../pages/api/weather.swr";
import * as React from "react";
import { Particles } from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import AnimatePresence from "./common/AnimatePresence";
import { EdittingWrapper } from "./EditingWrapper";
import { Weather } from "../utils/types";
import { WeatherData } from "../utils/weatherData";
import { Card } from "@radix-ui/themes";

type CustParticlesProps = {
	amountOfParticles: number;
};

const CustParticles = ({ amountOfParticles }: CustParticlesProps) => {
	const particlesInit = React.useCallback(async (engine: Engine) => {
		// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine);
	}, []);

	return (
		<Particles
			className="h-full"
			canvasClassName="h-full overflow-hidden "
			id="tsparticles"
			init={particlesInit}
			options={{
				fpsLimit: 120,
				interactivity: {
					events: {
						resize: true,
					},
					modes: {
						push: {
							quantity: 4,
						},
						repulse: {
							distance: 200,
							duration: 0.4,
						},
					},
				},
				fullScreen: false,
				particles: {
					color: {
						value: "#86efac",
					},

					collisions: {
						enable: true,
					},
					move: {
						enable: true,
						outModes: {
							default: "bounce",
						},
						random: false,
						speed: 3,
						straight: false,
					},
					number: {
						density: {
							enable: true,
							area: 800,
						},
						value: amountOfParticles * 2,
					},
					opacity: {
						value: 0.5,
					},
					shape: {
						type: "circle",
					},
					size: {
						value: { min: 3, max: 6 },
					},
				},
				detectRetina: true,
			}}
		/>
	);
};

const AirQuality = ({
	handleDrag = () => {},
	isPreview,
	weatherData,
}: {
	weatherData: WeatherData;
	isPreview?: boolean;
	handleDrag?: React.PointerEventHandler<HTMLButtonElement>;
}) => {
	const aqi = weatherData?.aqi;
	if (!aqi) return null;

	return (
		<AnimatePresence show={!!aqi}>
			{/* <div className=" w-full rounded-lg py-2 px-4 relative overflow-hidden group h-[115px] flex flex-col justify-evenly border-emerald-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-emerald-700/10 dark:bg-[#091b0b6d] bg-[#d0f3d46d]">
					
				</div> */}
			<Card size="3" className="group">
				<div className={`flex items-center justify-center `}>
					<div
						className={`my-auto bg-gradient-to-t from-green-800 to-green-300 bg-clip-text px-2 text-center text-5xl font-extrabold text-transparent`}
					>
						{aqi.aqi}
					</div>
					<div
						className={` ml-3 inline-block self-center  bg-gradient-to-t from-green-800 to-green-300 bg-clip-text text-center text-lg font-black leading-6 text-transparent`}
					>
						<a
							className="group/aqi"
							href="https://www.airnow.gov/aqi/aqi-basics/"
							rel="noopener noreferrer"
							target="_blank"
						>
							<span className="border-b border-green-600 border-opacity-0 transition-all group-hover/aqi:border-opacity-100">
								US EPA
							</span>
							<br />
							<span className="border-b border-green-600 border-opacity-0 transition-all group-hover/aqi:border-opacity-100">
								PM2.5 AQI{" "}
							</span>
						</a>

						<div className=" text-sm font-light">10 minute average</div>
					</div>
				</div>
				<div className={`  text-center dark:text-white`}>
					The air quality is{" "}
					<span className={` text-lg ${aqi.color}`}>{aqi.concern}</span>.{" "}
					{/* {aqi.message} */}
				</div>
				<div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden mix-blend-darken dark:mix-blend-screen">
					<CustParticles amountOfParticles={aqi.aqi} />
				</div>
				<div className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-t from-emerald-500/50 to-sky-500/10 opacity-10 transition-opacity duration-500 group-hover:opacity-20" />
			</Card>
		</AnimatePresence>
	);
};

export default AirQuality;
