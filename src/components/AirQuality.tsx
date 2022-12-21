import { motion } from "framer-motion";
import { useWeatherData } from "../pages/api/weather.swr";
import * as React from "react";
import { Particles } from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import AnimatePresence from "./common/AnimatePresence";
import { EdittingWrapper } from "./EditingWrapper";

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

const AirQuality = ({ id }: { id: string }) => {
	const { data } = useWeatherData();

	const aqi = data?.aqi;
	if (!aqi) return null;

	return (
		<EdittingWrapper
			id={id}
			alternate={
				<div className="w-full rounded-lg  bg-gradient-to-t from-green-400 to-green-300 backdrop-blur flex justify-center items-center h-[115px] border-emerald-800 border-2 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-emerald-700/10">
					<div className="pointer-events-none bg-gradient-to-t to-green-800 from-[#050e10] bg-clip-text text-transparent text-3xl font-bold">
						Air Quality
					</div>
				</div>
			}
		>
			<AnimatePresence show={!!aqi}>
				<div className=" w-full rounded-lg py-2 px-4 mix-blend-soft-light relative overflow-hidden group h-[115px] flex flex-col justify-evenly border-emerald-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-emerald-700/10 bg-[#11091b]">
					<div className={`flex justify-center items-center `}>
						<div
							className={`text-5xl px-2 my-auto font-extrabold text-center bg-gradient-to-t from-green-800 to-green-300 bg-clip-text text-transparent`}
						>
							{aqi.aqi}
						</div>
						<div
							className={` leading-6 font-black text-lg  inline-block self-center ml-3 text-center bg-gradient-to-t from-green-800 to-green-300 bg-clip-text text-transparent`}
						>
							<a
								className="group/aqi"
								href="https://www.airnow.gov/aqi/aqi-basics/"
								rel="noopener noreferrer"
								target="_blank"
							>
								<span className="border-b border-opacity-0 border-green-600 group-hover/aqi:border-opacity-100 transition-all">
									US EPA
								</span>
								<br />
								<span className="border-b border-opacity-0 border-green-600 group-hover/aqi:border-opacity-100 transition-all">
									PM2.5 AQI{" "}
								</span>
							</a>

							<div className=" font-light text-sm">10 minute average</div>
						</div>
					</div>
					<div className={`  text-white text-center`}>
						The air quality is{" "}
						<span className={` text-lg ${aqi.color}`}>{aqi.concern}</span>.{" "}
						{/* {aqi.message} */}
					</div>
					<div className="absolute w-full h-full top-0 left-0 overflow-hidden pointer-events-none">
						<CustParticles amountOfParticles={aqi.aqi} />
					</div>
					<div className="absolute w-full h-full left-0 top-0 bg-gradient-to-t from-emerald-500/50 to-sky-500/10 opacity-10 transition-opacity group-hover:opacity-20 duration-500 -z-10 pointer-events-none" />
				</div>
			</AnimatePresence>
		</EdittingWrapper>
	);
};

export default AirQuality;
