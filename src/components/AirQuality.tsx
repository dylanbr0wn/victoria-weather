import { motion } from "framer-motion";
import { DashProp } from "../utils/types";
import { useWeatherData } from "../pages/api/weather.swr";
import * as React from "react";
import { Particles } from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

type CustParticlesProps = {
	amountOfParticles: number;
};

const CustParticles = ({ amountOfParticles }: CustParticlesProps) => {
	const particlesInit = React.useCallback(async (engine: Engine) => {
		console.log(engine);
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
						value: "#ffffff",
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

const AirQuality = ({ dash = false }: DashProp) => {
	const { data } = useWeatherData();

	const aqi = data?.aqi;
	if (!aqi) return null;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1 }}
			className={`w-full ${dash ? " " : "p-3"} `}
		>
			<div
				className={`${
					dash ? "p-3" : "p-5 "
				} w-full rounded-3xl bg-teal-600/10 mix-blend-soft-light transition-colors relative overflow-hidden group`}
			>
				<div
					className={`flex   justify-center items-center ${dash ? " " : "p-3"}`}
				>
					<div
						className={`${dash ? "text-4xl" : "text-6xl"} ${
							aqi.color
						} px-3 my-auto font-extrabold text-center bg-gradient-to-t from-green-800 to-green-300 bg-clip-text text-transparent`}
					>
						{aqi.aqi}
					</div>
					<div
						className={`${aqi.color} leading-6 font-black ${
							dash ? "text-lg leading-none" : "text-2xl "
						}  inline-block self-center ml-3 text-center bg-gradient-to-t from-green-800 to-green-300 bg-clip-text text-transparent`}
					>
						<a
							className="hover:underline"
							href="https://www.airnow.gov/aqi/aqi-basics/"
							rel="noopener noreferrer"
							target="_blank"
						>
							US EPA
							<br /> PM2.5 AQI{" "}
						</a>

						<div className=" font-light text-sm">10 minute average</div>
					</div>
				</div>
				<div className={`  text-white ${dash ? "text-base" : "text-xl p-3"}`}>
					The air quality is{" "}
					<span className={` ${dash ? "text-lg" : " text-2xl"}  ${aqi.color}`}>
						{aqi.concern}
					</span>
					. {aqi.message}
				</div>
				<div className="absolute w-full h-full top-0 left-0 overflow-hidden">
					<CustParticles amountOfParticles={aqi.aqi} />
				</div>
				<div className="absolute w-full h-full left-0 top-0 aq-glow opacity-20 transition-opacity group-hover:opacity-30 duration-1000 -z-10" />
			</div>
		</motion.div>
	);
};

export default AirQuality;
