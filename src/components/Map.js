import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import axios from "axios";

mapboxgl.accessToken =
    "pk.eyJ1IjoiZHlsYW5icm93biIsImEiOiJja3R4bXc2aTYyOW8wMm9sNTV5d3lyZXFhIn0.D4wgzD-IpyjiRUu9s63KzA";

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const popup = useRef(null);
    const hoveredStateId = useRef(null);
    const [lng, setLng] = useState(-123.37);
    const [lat, setLat] = useState(48.45);
    const [zoom, setZoom] = useState(10.4);
    const [featTemp, setFeatTemp] = useState([]);

    const [points, setPoints] = useState(null);
    const [max, setMax] = useState(0);
    const [min, setMin] = useState(100);

    useEffect(() => {
        axios.get("http://localhost:4000/api/weather").then(({ data }) => {
            let tempmin = 100,
                tempmax = 0;

            const temps = data.isobands.features.map(
                (element) => element.properties.temperature
            );

            tempmax = Math.max(temps);
            tempmin = Math.min(temps);

            setMax(tempmax);
            setMin(tempmin);
            setPoints(data);
        });
    }, []);

    useEffect(() => {
        if (map.current) return; // initialize map only once

        if (!points) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom,
        });
        map.current.on("load", () => {
            map.current.addSource("island", {
                type: "geojson",
                data: points.island,
            });

            map.current.addSource("isobands", {
                type: "geojson",
                data: points.isobands,
                tolerance: 0.7,
            });
            // map.current.addSource("intersection", {
            //     type: "geojson",
            //     data: points.intersection,
            // });

            map.current.addSource("points", {
                type: "geojson",
                data: points.newPoints,
            });

            map.current.addLayer({
                id: "isobands",
                type: "fill",
                source: "isobands",
                // layout: {
                //     visibility: "none",
                // },
                paint: {
                    "fill-color": ["get", "fill"],
                    "fill-opacity": 0.5,
                    "fill-outline-color": "rgba(0,0,0,0)",
                },
            });
            map.current.addLayer({
                id: "island",
                type: "line",
                source: "island",
                layout: {},
                paint: {
                    "line-width": 2,
                    "line-color": "#4264fb",
                },
            });
            // map.current.addLayer({
            //     id: "intersection",
            //     type: "fill",
            //     source: "intersection",
            //     layout: {},
            //     paint: {
            //         "fill-color": ["get", "fill"],
            //         "fill-opacity": [
            //             "case",
            //             ["boolean", ["feature-state", "hover"], false],
            //             0.8,
            //             0.5,
            //         ],
            //         "fill-outline-color": "rgba(0,0,0,0)",
            //     },
            // });

            map.current.on("move", () => {
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4));
                setZoom(map.current.getZoom().toFixed(2));
            });

            map.current.on("mousemove", "intersection", function (e) {
                if (e.features.length > 0) {
                    if (
                        hoveredStateId.current ||
                        hoveredStateId.current === 0
                    ) {
                        map.current.setFeatureState(
                            {
                                source: "intersection",
                                id: hoveredStateId.current,
                            },
                            { hover: false }
                        );
                    }
                    hoveredStateId.current = e.features[0].id;
                    setFeatTemp(
                        e.features[0].properties.temperature.split("-")
                    );
                    map.current.setFeatureState(
                        { source: "intersection", id: hoveredStateId.current },
                        { hover: true }
                    );
                }
            });
            map.current.addLayer({
                id: "points",
                type: "symbol",
                source: "points",
                layout: {
                    "text-field": ["get", "temperature"],
                    "text-font": [
                        "Open Sans Semibold",
                        "Arial Unicode MS Bold",
                    ],
                    "text-offset": [0, 0.6],
                    "text-anchor": "top",
                },
            });
            map.current.addLayer({
                id: "places",
                type: "circle",
                source: "points",
                paint: {
                    "circle-color": "#4264fb",
                    "circle-radius": 6,
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#ffffff",
                },
            });

            // Create a popup, but don't add it to the map yet.
            popup.current = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false,
            });

            map.current.on("mouseenter", "places", (e) => {
                // Change the cursor style as a UI indicator.
                map.current.getCanvas().style.cursor = "pointer";

                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] +=
                        e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                // Populate the popup and set its coordinates
                // based on the feature found.
                popup.current
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map.current);
            });

            map.current.on("mouseleave", "places", () => {
                map.current.getCanvas().style.cursor = "";
                popup.current.remove();
            });
            map.current.on("click", "places", (e) => {
                // Copy coordinates array.
                console.log(
                    "go to: ",
                    e.features[0].properties.station_long_name
                );
            });
        });
    }, [points, min, max, lng, lat, zoom]);

    return (
        <div className="relative h-full w-full">
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}{" "}
                {featTemp[0] && featTemp[1] && (
                    <>
                        | Isoband Temperature Range:{" "}
                        {parseFloat(featTemp[0]).toFixed(2)}C -{" "}
                        {parseFloat(featTemp[1]).toFixed(2)}C
                    </>
                )}
            </div>
            <div ref={mapContainer} className="h-full w-screen" />
        </div>
    );
};

export default Map;
