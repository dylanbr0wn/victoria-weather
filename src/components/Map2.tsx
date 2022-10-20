import { useState, useCallback, useRef } from "react";
import Map, {
	FullscreenControl,
	MapRef,
	NavigationControl,
	ScaleControl,
	Source,
} from "react-map-gl";
import { Popup } from "react-map-gl";
import { Layer } from "react-map-gl";
import { flushSync } from "react-dom";
import { useMapData } from "../pages/api/map.swr";
import { usePointsData } from "../pages/api/points.swr";
import AnimatePresence from "./common/AnimatePresence";

interface MapProps {
	lat?: number;
	lng?: number;
	zoom?: number;
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
		<div className="h-full relative text-center flex flex-col ">
			<AnimatePresence show={show}>
				<Map
					id="map"
					onLoad={onMapLoad}
					ref={mapRef}
					initialViewState={{
						longitude: lng ?? -123.35,
						latitude: lat ?? 48.45,
						zoom: zoom ?? 11,
					}}
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
							// style={(feature) => {
							//         return { color: "#119DA4", opacity: 1, fill: false };
							//     }}
						/>
					</Source>
					<Source
						id="points"
						clusterProperties={{
							totalTemperature: ["+", ["get", "temperature"]],
						}}
						cluster
						type="geojson"
						data={pointsData?.points}
					>
						<Layer
							interactive
							id="point"
							type="symbol"
							paint={{
								"text-color": "#000",
								"text-halo-color": "#fff",
								"text-halo-width": 0.5,
								"text-halo-blur": 1.5,
							}}
							layout={
								// {
								// 	"text-field": "station_id",
								// 	"icon-image": "mapbox-marker-icon-gray",
								// 	"text-anchor": "top",
								// }
								{
									"text-field": [
										"concat",
										[
											"case",
											["has", "temperature"],
											["get", "temperature"],
											[
												"number-format",

												[
													"/",
													["get", "totalTemperature"],
													["get", "point_count"],
												],
												{ "max-fraction-digits": 1 },
											],
										],
										"°C",
									],
									"icon-image": "mapbox-marker-icon-gray",
									"text-anchor": "top",
								}
							}
						/>
					</Source>
					{showPopup && (
						<Popup
							longitude={popupData.coordinates[0]}
							latitude={popupData.coordinates[1]}
							anchor="bottom"
							focusAfterOpen={false}
							onClose={() => {
								flushSync(() => {
									setPopupData(undefined);
									setShowPopup(false);
								});
							}}
						>
							<div className="p-3">
								<a
									title="Station Data"
									rel="noopener noreferrer"
									target="_blank"
									href={`https://www.victoriaweather.ca/station.php?id=${popupData.properties.station_id}`}
								>
									<h3 className="font-bold text-lg pb-2 leading-tight hover:underline">
										{popupData.properties["station_long_name"]}
									</h3>
								</a>

								<div className="text-sm  flex flex-col space-y-1">
									<div className="flex w-full justify-center items-center">
										<div className="text-base mr-2">📍</div>
										<div>{`${popupData.coordinates[1].toFixed(
											7
										)}, ${popupData.coordinates[0].toFixed(7)}`}</div>
									</div>
									<div className="flex w-full justify-center items-center">
										<div className="text-base mr-2">🌡</div>
										<div
											className={`${
												Number(popupData.properties.temperature) < 10
													? "text-blue-500"
													: Number(popupData.properties.temperature) < 20
													? "text-yellow-400"
													: Number(popupData.properties.temperature) < 30
													? "text-green-500"
													: "text-red-600"
											}`}
										>
											{Number(popupData.properties.temperature).toFixed(1)}℃
										</div>
									</div>
									<div className="flex w-full justify-center items-center">
										<div className="text-base mr-2">💧</div>
										<div className="text-sky-500">
											{popupData.properties.rain}{" "}
											{popupData.properties.rain_units}
										</div>
									</div>
									<div className="flex w-full text-sky-200 justify-center items-center">
										<div className="mr-2">Pressure</div>
										<div className="text-sky-200">
											{popupData.properties.pressure}{" "}
											{popupData.properties.pressure_units}
										</div>
									</div>
									<div className="flex w-full text-violet-300 justify-center items-center">
										<div className="mr-2">Wind</div>
										<div className="">
											{popupData.properties.wind_speed}{" "}
											{popupData.properties.wind_speed_units}{" "}
											{Number(popupData.properties.wind_speed) !== 0
												? popupData.properties.wind_speed_heading
												: ""}
										</div>
									</div>
									{popupData.properties.humidity ? (
										<div className="flex w-full text-cyan-300 justify-center items-center">
											<div className="mr-2">Humidity</div>
											<div className="">
												{popupData.properties.humidity}{" "}
												{popupData.properties.humidity_units}
											</div>
										</div>
									) : null}
								</div>
							</div>
						</Popup>
					)}
					<ScaleControl />
					<FullscreenControl />
					<NavigationControl />
				</Map>
			</AnimatePresence>
			{!show && (
				<div className="w-full h-full bg-slate-800 animate-pulse rounded-lg overflow-hidden flex flex-col justify-center">
					<div className=" text-white ">Loading map...</div>
				</div>
			)}
		</div>
	);
};

export default CustMap;
