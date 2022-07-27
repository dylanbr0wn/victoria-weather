import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { getSunrise, getSunset } from "sunrise-sunset-js";
import Color from "colorjs.io";
import { getMoonIcon } from "../utils/helper";
import SunMoonCycle from "./SunMoonCycle";

const Moon = ({ astroData }) => {
	// const sinPosition = (complete) => {
	//     return -Math.sin(complete * Math.PI) * 60;
	// };

	return (
		<div className="w-full p-3">
			<div className="p-5 w-full rounded-md bg-gray-900 hover:bg-gray-800 transition-colors flex flex-col">
				<div className="flex p-5 justify-center items-center">
					{astroData && (
						<>
							<div className="text-6xl">
								{getMoonIcon(astroData.astronomy.astro.moon_phase)}
							</div>
							<div className="text-3xl text-yellow-300 font-semibold ml-3 ">
								{astroData.astronomy.astro.moon_phase}
								<div className="text-lg font-black text-center">
									<span className="font-light">Illumination</span>{" "}
									{astroData.astronomy.astro.moon_illumination}
								</div>
							</div>
						</>
					)}
				</div>
				<SunMoonCycle />
			</div>
		</div>
	);
};
export default Moon;
