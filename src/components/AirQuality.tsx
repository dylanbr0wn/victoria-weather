"use client";

import * as React from "react";
import { Particles } from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { WeatherData } from "../utils/weatherData";
import { Card, Flex, Strong, Text } from "@radix-ui/themes";

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

const AirQuality = ({ weather }: { weather: WeatherData }) => {
	const aqi = weather?.aqi;
	if (!aqi) return null;

	return (
		<Flex align="center" direction="column" justify="center" className="h-full">
			<div className={`flex items-center justify-center `}>
				<div
					className={`my-auto bg-gradient-to-t from-green-800 to-green-300 bg-clip-text px-2 text-center text-6xl font-extrabold text-transparent`}
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
			<Text>
				The air quality is{" "}
				<Strong className={` text-lg ${aqi.color}`}>{aqi.concern}</Strong>.{" "}
				{/* {aqi.message} */}
			</Text>
			<div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden mix-blend-darken dark:mix-blend-screen">
				<CustParticles amountOfParticles={aqi.aqi} />
			</div>
			<div className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-t from-emerald-500/50 to-sky-500/10 opacity-10 transition-opacity duration-500 group-hover:opacity-20" />
		</Flex>
	);
};

export default AirQuality;
