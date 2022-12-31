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
import { useMapData } from "../pages/api/map.swr";
import { usePointsData } from "../pages/api/points.swr";
import { Building2 } from "lucide-react";
import { Feature, Point } from "geojson";
import { PointProperties } from "../utils/types";
import { AnimatePresence, motion } from "framer-motion";
import { useMapStore } from "../utils/zustand";

interface MapProps {
	lat?: number;
	lng?: number;
	zoom?: number;
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
						className="absolute top-0 left-0 h-8 w-8 -z-10 text-base"
					>
						<div className="absolute top-full  left-1/2 -translate-x-1/2 pointer-events-none">
							{data.properties.temperature}℃
						</div>
						<div className="absolute top-full text-white blur-xs -z-10 font-bold blur-sm left-1/2 -translate-x-1/2 pointer-events-none ">
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
						className="absolute top-0 left-0 h-8 w-64 -z-10"
					>
						<div className="absolute top-full  left-1/2 -translate-x-1/2 pointer-events-none">
							Click for details
						</div>
						<div className="absolute top-full text-white blur-xs -z-10 font-bold blur-sm left-1/2 -translate-x-1/2 pointer-events-none ">
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
						height: hoveredMarker === id ? "16rem" : "2rem",
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
					className={`bg-base rounded-[18px] shadow text-base top-0 left-0 absolute flex flex-col overflow-hidden hover:border-indigo-400 border border-transparent box-content transition-colors duration-500`}
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
						<Building2 className="h-4 w-4 text-white flex-shrink-0" />

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
									className="font-bold leading-tight text-white text-sm text-left w-56 truncate h-4"
								>
									{data.properties.station_long_name}
								</motion.h3>
								// </motion.a>
							)}
						</AnimatePresence>
					</motion.div>

					<AnimatePresence>
						{hoveredMarker === id && data && (
							<motion.div
								key={`info-${id}`}
								animate={{ opacity: 1, transition: { delay: 0.3 } }}
								exit={{ opacity: 0 }}
								initial={{ opacity: 0 }}
								className=" text-white p-4 w-64 h-64 text-sm  flex flex-col space-y-1 "
							>
								<div className="flex items-center">
									<div className="mr-2">📍</div>
									<div>{`${data.geometry.coordinates[1].toFixed(
										7
									)}, ${data.geometry.coordinates[0].toFixed(7)}`}</div>
								</div>
								<div className="flex items-center">
									<div className="mr-2">🌡</div>
									<div
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
									</div>
								</div>
								<div className="flex items-center">
									<div className="text-base mr-2">💧</div>
									<div className="text-sky-500">
										{data.properties.rain} {data.properties.rain_units}
									</div>
								</div>
								<div className="flex  text-sky-200 items-center">
									<div className="mr-2">Pressure</div>
									<div className="text-sky-200">
										{data.properties.pressure} {data.properties.pressure_units}
									</div>
								</div>
								<div className="flex text-violet-300 items-center">
									<div className="mr-2">Wind</div>
									<div className="">
										{data.properties.wind_speed}{" "}
										{data.properties.wind_speed_units}{" "}
										{Number(data.properties.wind_speed) !== 0
											? data.properties.wind_speed_heading
											: ""}
									</div>
								</div>
								{data.properties.humidity ? (
									<div className="flex text-cyan-300 items-center">
										<div className="mr-2">Humidity</div>
										<div className="">
											{data.properties.humidity}{" "}
											{data.properties.humidity_units}
										</div>
									</div>
								) : null}
							</motion.div>
						)}
					</AnimatePresence>
				</motion.button>
			</AnimatePresence>
		</Marker>
	);
}

const CustMap = ({ lat, lng, zoom }: MapProps) => {
	const { data } = useMapData();
	const { data: pointsData } = usePointsData(null);

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

	const onMapLoad = useCallback(() => {
		mapRef.current.on("click", "isoband", () => {
			setPopupData(undefined);
			setShowPopup(false);
			curRef.current = "";
		});

		mapRef.current.on("click", "point", (e) => {
			// Change the cursor style as a UI indicator.
			// mapRef.current.getCanvas().style.cursor = "pointer";

			if (!e.features[0].properties.station_id) return;

			// Copy coordinates array.

			let lng = Number(e.features[0].properties.longitude);
			let lat = Number(e.features[0].properties.latitude);

			const properties = e.features[0].properties;

			// Ensure that if the map is zoomed out such that multiple
			// copies of the feature are visible, the popup appears
			// over the copy being pointed to.
			while (Math.abs(e.lngLat.lng - lng) > 180) {
				lng += e.lngLat.lng > lng ? 360 : -360;
			}
			setPopupData({
				coordinates: [lng, lat],
				properties,
			});
			curRef.current = properties.station_id;
			setShowPopup(true);
		});
		mapRef.current.on("mousemove", "point", (e) => {
			if (!e?.features[0]?.properties?.station_id) return;
			mapRef.current.getCanvas().style.cursor = "pointer";
		});

		mapRef.current.on("mouseleave", "point", () => {
			// Reset the cursor style
			mapRef.current.getCanvas().style.cursor = "";
		});
	}, []);

	const show = !!pointsData && !!data;

	return (
		<div className="h-full relative text-center flex flex-col w-full">
			{show && (
				<Map
					id="map"
					onLoad={onMapLoad}
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
					<Source
						id="isobands"
						type="geojson"
						data={data?.intersection.intersection}
					>
						<Layer
							id="isoband"
							type="fill"
							paint={{
								"fill-color": ["get", "fill"],
								"fill-opacity": 0.6,
							}}
						/>
					</Source>
					<Source id="islands" type="geojson" data={data?.island.island}>
						<Layer
							type="line"
							paint={{
								"line-color": "#119DA4",
							}}
						/>
					</Source>
					<span className="isolate">
						{pointsData?.points.features.map((feature) => {
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
