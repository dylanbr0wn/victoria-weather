import { useEffect, useState, useCallback, useRef } from "react";
import Map, { Source } from "react-map-gl";
import { Popup } from "react-map-gl";
import { Layer } from "react-map-gl";
import { useQuery } from "react-query";
import { motion } from "framer-motion";

const getMapData = async () => {
    const data = await fetch("/api/map-data");

    return await data.json();
};

const getPointsData = async () => {
    const data = await fetch("/api/points-data");

    return await data.json();
};

const CustMap = ({ lat, lng, zoom }) => {
    const { data } = useQuery(["map"], getMapData);
    const { data: pointsData } = useQuery(["points"], getPointsData, {});

    const mapRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState({});

    const onMapLoad = useCallback(() => {
        mapRef.current.on("click", "point", (e) => {
            // Change the cursor style as a UI indicator.
            // mapRef.current.getCanvas().style.cursor = "pointer";

            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();

            const description = e.features[0].properties.description;
            if (!description) return;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            setPopupData({
                coordinates,
                description,
            });
            setShowPopup(true);
        });

        mapRef.current.on("click", "point", (e) => {
            // Change the cursor style as a UI indicator.
            // mapRef.current.getCanvas().style.cursor = "pointer";

            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();

            const description = e.features[0].properties.description;
            if (!description) return;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            setPopupData({
                coordinates,
                description,
            });
            setShowPopup(true);
        });
        mapRef.current.on("mousemove", "point", (e) => {
            if (!e?.features[0]?.properties?.description) return;
            mapRef.current.getCanvas().style.cursor = "pointer";
        });

        mapRef.current.on("mouseleave", "point", () => {
            // Reset the cursor style
            mapRef.current.getCanvas().style.cursor = "";
        });

        // mapRef.current.on("mouseleave", "point", () => {

        // });
    }, []);

    return (
        <div className="h-full relative text-center flex flex-col ">
            {data && pointsData ? (
                <motion.div
                    key={"map"}
                    className="h-full w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Map
                        onLoad={onMapLoad}
                        ref={mapRef}
                        initialViewState={{
                            longitude: lng ?? -123.35,
                            latitude: lat ?? 48.45,
                            zoom: zoom ?? 11,
                        }}
                        mapStyle="mapbox://styles/dylanbrown/ckukftmpa1mlg17mlkvo86j4x"
                        mapboxAccessToken={
                            "pk.eyJ1IjoiZHlsYW5icm93biIsImEiOiJjbDRua2dwdzIwM2xwM2JtcHNpdXYwZTF3In0.2zd_5VVn2rjFNe94WVPtaQ"
                        }
                    >
                        <Source
                            id="isobands"
                            type="geojson"
                            data={data.intersection.intersection}
                        >
                            <Layer
                                type="fill"
                                paint={{
                                    "fill-color": ["get", "fill"],
                                    "fill-opacity": 0.6,
                                }}
                            />
                        </Source>
                        <Source
                            id="islands"
                            type="geojson"
                            data={data.island.island}
                        >
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
                            data={pointsData.points.points}
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
                                layout={{
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
                                }}
                            />
                        </Source>
                        {showPopup && (
                            <Popup
                                longitude={popupData.coordinates[0]}
                                latitude={popupData.coordinates[1]}
                                anchor="bottom"
                                focusAfterOpen={false}
                                onClose={() => {
                                    setPopupData({});
                                    setShowPopup(false);
                                }}
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: popupData.description,
                                    }}
                                />
                            </Popup>
                        )}
                    </Map>
                </motion.div>
            ) : (
                <div className="w-full h-full bg-slate-800 animate-pulse rounded-lg overflow-hidden flex flex-col justify-center">
                    <div className=" text-white ">Loading map...</div>
                </div>
            )}
        </div>
    );
};

export default CustMap;
