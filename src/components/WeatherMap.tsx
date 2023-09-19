"use client";

import { useState, useCallback, useRef } from "react";
import Map, {
	FullscreenControl,
	MapRef,
	NavigationControl,
	ScaleControl,
	Source,
	Layer,
	Marker,
} from "react-map-gl";
import {
	AirVent,
	Droplets,
	GlassWater,
	Locate,
	MapPin,
	MoveHorizontal,
	MoveVertical,
	Shrink,
	Sun,
	Thermometer,
	Timer,
} from "lucide-react";
import { Feature, Point } from "geojson";
import { MapData, PointProperties, PointsData } from "../utils/types";
import { AnimatePresence, motion } from "framer-motion";
import { useMapStore } from "../utils/zustand";

interface MapProps {
	lat?: number;
	lng?: number;
	zoom?: number;
	intersection: MapData["intersection"] | null;
	island: MapData["island"] | null;
	points: PointsData | null;
}

type MapMarkerProps = {
	data: Feature<Point, PointProperties>;
};

function MapMarker({ data }: MapMarkerProps) {
	const [isOpen, setIsOpen] = useState(false);

	const { hoveredMarker, setHoveredMarker } = useMapStore();

	const id = data.properties.station_id;

	return (
		<Marker
			longitude={data.geometry.coordinates[0]}
			latitude={data.geometry.coordinates[1]}
			style={{ zIndex: isOpen ? 300 : hoveredMarker === id ? 400 : 200 }}
		>
			<AnimatePresence>
				{!isOpen && (
					<motion.div
						key={`icon-${id}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.3 } }}
						exit={{ opacity: 0 }}
						className="absolute top-0 left-0 h-8 w-8 -z-10 text-base -translate-x-1/2 -translate-y-1/2"
					>
						<div className="absolute top-full text-white dark:text-black left-1/2 -translate-x-1/2 pointer-events-none">
							{data.properties.temperature}℃
						</div>
						<div className="absolute top-full dark:text-white text-black blur-xs -z-10 font-bold blur-sm left-1/2 -translate-x-1/2 pointer-events-none ">
							{data.properties.temperature}℃
						</div>
					</motion.div>
				)}
				{isOpen && (
					<motion.div
						key={`open-${id}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.3 } }}
						exit={{ opacity: 0 }}
						className="absolute top-0 left-0 h-8 w-64 -z-10 -translate-x-1/2 -translate-y-1/2"
					>
						<div className="absolute top-full text-white dark:text-black left-1/2 -translate-x-1/2 pointer-events-none">
							Click for details
						</div>
						<div className="absolute top-full dark:text-white text-black blur-xs -z-10 font-bold blur-sm left-1/2 -translate-x-1/2 pointer-events-none ">
							Click for details
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence>
				<motion.button
					key={`root-${id}`}
					onClick={() => {
						if (hoveredMarker === id) setHoveredMarker(null);
						else setHoveredMarker(id);
					}}
					initial={{ width: "2rem", zIndex: 1 }}
					whileHover={{ zIndex: 2 }}
					animate={{
						height: hoveredMarker === id ? "20rem" : "2rem",
						transition: { mass: 1.2 },
						width: isOpen ? "17rem" : "2rem",
					}}
					onHoverStart={() => {
						setIsOpen(true);
					}}
					onHoverEnd={() => {
						setIsOpen(false);
						setHoveredMarker(null);
					}}
					className="dark:bg-base bg-white rounded-[16px] shadow-lg shadow-black/30 text-base top-0 left-0 absolute flex flex-col overflow-hidden hover:outline-indigo-400 outline outline-transparent outline-offset-0 transition-colors duration-500 -translate-x-1/2 -translate-y-1/2"
				>
					<motion.div
						key="popup"
						animate={{
							transition: { mass: 1.2 },
						}}
						className="flex gap-3 items-center p-2 "
						// initial={{ width: "2rem" }}

						// exit={{ width: "2rem", transition: { delay: 0.3 } }}
					>
						<MapPin className="h-4 w-4 dark:text-white flex-shrink-0" />

						<AnimatePresence>
							{isOpen && (
								// <motion.a
								// 	layout
								// 	key={`title-${id}`}
								// 	title="Station Data"
								// 	rel="noopener noreferrer"
								// 	target="_blank"
								// 	href={`https://www.victoriaweather.ca/station.php?id=${data.properties.station_id}`}
								// 	className="block h-4"
								// >
								<motion.h3
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									initial={{ opacity: 0 }}
									className="font-bold leading-tight dark:text-white text-black text-sm text-center w-56 truncate h-4"
								>
									{data.properties.station_long_name}
								</motion.h3>
								// </motion.a>
							)}
						</AnimatePresence>
					</motion.div>

					<AnimatePresence>
						{hoveredMarker === id && data && (
							<motion.dl
								key={`info-${id}`}
								animate={{ opacity: 1, transition: { delay: 0.3 } }}
								exit={{ opacity: 0 }}
								initial={{ opacity: 0 }}
								className=" dark:text-white px-4 pb-4 w-full h-full text-sm flex flex-wrap gap-1 justify-start"
							>
								<div className="flex flex-col gap-1 justify-start items-start p-1 rounded-sm hover:bg-neutral-500/10 transition-colors w-full">
									<dt className="mr-2 flex gap-1 items-center text-neutral-500 ">
										<Locate className="h-4 w-4 " />
										<span>Coordinates</span>
									</dt>

									<dd className="flex gap-1 items-center">
										<span className="uppercase text-xs text-neutral-500">
											<MoveVertical className="h-4 w-4" />
										</span>
										<span>{data.geometry.coordinates[1].toFixed(7)}</span>
										<span className="w-2" />
										<span className="uppercase text-xs text-neutral-500">
											<MoveHorizontal className="h-4 w-4" />
										</span>
										<span>{data.geometry.coordinates[0].toFixed(7)}</span>
									</dd>
								</div>
								<div className="flex flex-col gap-1 justify-start items-start p-1 rounded-sm hover:bg-neutral-500/10 transition-colors w-1/3 flex-grow">
									<dt className="mr-2 flex gap-1 items-center text-neutral-500 ">
										<Thermometer className="h-4 w-4 " />
										<span>Temperature</span>
									</dt>

									<dd
										className={`${
											Number(data.properties.temperature) < 10
												? "text-blue-500"
												: Number(data.properties.temperature) < 20
												? "text-yellow-400"
												: Number(data.properties.temperature) < 30
												? "text-green-500"
												: "text-red-600"
										}`}
									>
										{Number(data.properties.temperature).toFixed(1)}℃
									</dd>
								</div>
								<div className="flex flex-col gap-1 justify-start items-start p-1 rounded-sm hover:bg-neutral-500/10 transition-colors w-1/3 flex-grow">
									<dt className="mr-2 flex gap-1 items-center text-neutral-500 ">
										<Droplets className="h-4 w-4 " />
										<span>Rain Today</span>
									</dt>

									<dd className="text-sky-500">
										{data.properties.rain} {data.properties.rain_units}
									</dd>
								</div>
								{data.properties.pressure && (
									<div className="flex flex-col gap-1 justify-start items-start p-1 rounded-sm hover:bg-neutral-500/10 transition-colors w-1/3 flex-grow">
										<dt className="mr-2 flex gap-1 items-center text-neutral-500 ">
											<Shrink className="h-4 w-4 " />
											<span>Pressure</span>
										</dt>

										<dd className="dark:text-sky-200 text-sky-800">
											{data.properties.pressure}{" "}
											{data.properties.pressure_units}
										</dd>
									</div>
								)}
								{data.properties.wind_speed && (
									<div className="flex flex-col gap-1 justify-start items-start p-1 rounded-sm hover:bg-neutral-500/10 transition-colors w-1/3 flex-grow">
										<dt className="mr-2 flex gap-1 items-center text-neutral-500 ">
											<AirVent className="h-4 w-4 " />
											<span>Wind</span>
										</dt>

										<dd className="dark:text-violet-300 text-violet-600">
											{data.properties.wind_speed}{" "}
											{data.properties.wind_speed_units}{" "}
											{Number(data.properties.wind_speed) !== 0
												? data.properties.wind_speed_heading
												: ""}
										</dd>
									</div>
								)}
								{data.properties.humidity && (
									<div className="flex flex-col gap-1 justify-start items-start p-1 rounded-sm hover:bg-neutral-500/10 transition-colors w-1/3 flex-grow">
										<dt className="mr-2 flex gap-1 items-center text-neutral-500 ">
											<GlassWater className="h-4 w-4 " />
											<span>Humidity</span>
										</dt>

										<dd className="dark:text-cyan-300 text-cyan-600">
											{data.properties.humidity}{" "}
											{data.properties.humidity_units}
										</dd>
									</div>
								)}
								{data.properties.insolation && (
									<div className="flex flex-col gap-1 justify-start items-start p-1 rounded-sm hover:bg-neutral-500/10 transition-colors w-1/3 flex-grow">
										<dt className="mr-2 flex gap-1 items-center text-neutral-500 ">
											<Sun className="h-4 w-4 " />
											<span>Insolation</span>
										</dt>

										<dd className="dark:text-amber-300 text-amber-600">
											{data.properties.insolation}{" "}
											{data.properties.insolation_units}
										</dd>
									</div>
								)}

								<div className="flex flex-col gap-1 justify-start items-start p-1 rounded-sm hover:bg-neutral-500/10 transition-colors w-full">
									<dt className="mr-2 flex gap-1 items-center text-neutral-500 ">
										<Timer className="h-4 w-4 " />
										<span>Observation Time</span>
									</dt>

									<dd className="dark:text-neutral-300 text-neutral-700">
										{data.properties.observation_time}
									</dd>
								</div>
							</motion.dl>
						)}
					</AnimatePresence>
				</motion.button>
			</AnimatePresence>
		</Marker>
	);
}

const CustMap = ({
	lat,
	lng,
	zoom,
	intersection,
	island,
	points,
}: MapProps) => {
	const mapRef = useRef<MapRef>(null);
	const [showPopup, setShowPopup] = useState(false);
	const [popupData, setPopupData] = useState<
		| {
				coordinates: [number, number];
				properties: { [key: string]: any };
		  }
		| undefined
	>();

	const curRef = useRef<string>();

	const show = !!points && !!island && !!intersection;

	return (
		<div className="h-full relative text-center flex flex-col w-full">
			{show && (
				<Map
					id="map"
					ref={mapRef}
					initialViewState={{
						longitude: lng ?? -123.35,
						latitude: lat ?? 48.45,
						zoom: zoom ?? 11,
					}}
					attributionControl={false}
					style={{ borderRadius: "0.5rem", overflow: "hidden" }}
					mapStyle="mapbox://styles/dylanbrown/ckukftmpa1mlg17mlkvo86j4x"
					mapboxAccessToken={
						"pk.eyJ1IjoiZHlsYW5icm93biIsImEiOiJjbDRua2dwdzIwM2xwM2JtcHNpdXYwZTF3In0.2zd_5VVn2rjFNe94WVPtaQ"
					}
				>
					<Source id="isobands" type="geojson" data={intersection.intersection}>
						<Layer
							id="isoband"
							type="fill"
							paint={{
								"fill-color": ["get", "fill"],
								"fill-opacity": 0.6,
							}}
						/>
					</Source>
					<Source id="islands" type="geojson" data={island.island}>
						<Layer
							type="line"
							paint={{
								"line-color": "#119DA4",
							}}
						/>
					</Source>
					<span className="isolate">
						{points.points.features.map((feature) => {
							return (
								<MapMarker key={feature.properties.station_id} data={feature} />
							);
						})}
					</span>

					<ScaleControl />
					<FullscreenControl />
					<NavigationControl />
				</Map>
			)}
			{!show && (
				<div className="w-full h-full bg-slate-800 animate-pulse rounded-lg overflow-hidden flex flex-col justify-center">
					<div className=" text-white ">Loading map...</div>
				</div>
			)}
		</div>
	);
};

export default CustMap;
