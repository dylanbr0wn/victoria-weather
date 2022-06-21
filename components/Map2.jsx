import { useEffect, useState, useCallback, useRef } from "react";
import Map, { Source } from "react-map-gl";
import { Popup } from "react-map-gl";
import { Layer } from "react-map-gl";

const CustMap = ({ isobands, island, points, intersection }) => {
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
        <Map
            onLoad={onMapLoad}
            ref={mapRef}
            className="w-full h-full"
            initialViewState={{
                longitude: -123.4,
                latitude: 48.45,
                zoom: 12,
            }}
            mapStyle="mapbox://styles/dylanbrown/ckukftmpa1mlg17mlkvo86j4x"
            mapboxAccessToken={
                "pk.eyJ1IjoiZHlsYW5icm93biIsImEiOiJjbDRua2dwdzIwM2xwM2JtcHNpdXYwZTF3In0.2zd_5VVn2rjFNe94WVPtaQ"
            }
        >
            {/* <Source id="isobands" type="geojson" data={isobands}>
                <Layer
                    type="fill"
                    paint={{
                        "fill-color": ["get", "fill"],
                        "fill-opacity": 0.5,
                    }}
                />
            </Source> */}
            <Source id="isobands" type="geojson" data={intersection}>
                <Layer
                    type="fill"
                    paint={{
                        "fill-color": ["get", "fill"],
                        "fill-opacity": 0.5,
                    }}
                />
            </Source>
            <Source id="islands" type="geojson" data={island}>
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
                data={points}
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
        // <MapContainer
        //     className="w-full h-full"
        //     // style={{ width: "100vw", height: "90vh" }}
        //     center={[48.45, -123.4]}
        //     zoom={12}
        //     // maxZoom={18}
        //     scrollWheelZoom={false} // disable original zoom function
        //     // smoothWheelZoom={true} // enable smooth zoom
        //     // smoothSensitivity={1} // zoom speed. default is 1
        //     // zoomSnap={0}
        //     // wheelPxPerZoomLevel={10}
        // >
        //     <TileLayer
        //         className="w-full h-full"
        //         detectRetina={true}
        //         // updateInterval={200}
        //         // keepBuffer={3}
        //         attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        //         // maxZoom={18}
        //         id="dylanbrown/ckukftmpa1mlg17mlkvo86j4x"
        //         // tileSize={512}
        //         url={
        //             "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        //         }
        //         accessToken={
        //             "pk.eyJ1IjoiZHlsYW5icm93biIsImEiOiJja3R4bXc2aTYyOW8wMm9sNTV5d3lyZXFhIn0.D4wgzD-IpyjiRUu9s63KzA"
        //         }
        //     />
        //
        //     {island && (
        //         <GeoJSON
        //             data={island}
        //             style={(feature) => {
        //                 return { color: "#119DA4", opacity: 1, fill: false };
        //             }}
        //         />
        //     )}
        //     {points && (
        //         <>

        //             <MarkerClusterGroup
        //                 chunkedLoading
        //                 iconCreateFunction={(cluster) => {
        //                     const markers = cluster.getAllChildMarkers();
        //                     const number = markers.length;
        //                     let average = 0;

        //                     markers.forEach((marker) => {
        //                         average += marker.options.temperature;
        //                     });
        //                     average = (average / number).toFixed(1);

        //                     return new L.DivIcon({
        //                         html:
        //                             "<div style=''><span >" +
        //                             average +
        //                             "</span></div>",
        //                         className:
        //                             "bg-gray-800 rounded-full text-white text-center font-bold text-sm leading-8 border-4 border-gray-500 border-opacity-70 shadow-xl",
        //                         iconSize: new L.Point(40, 40),
        //                     });
        //                 }}
        //             >
        //                 {points.features.map((point, i) => {
        //                     var blackIcon = new L.DivIcon({
        //                         html: `<div class='flex flex-col'><svg style='position: relative !important' class=' block fill-current text-gray-800 filter drop-shadow-lg' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="25 13 70 100" ><path d="M60,14.147c-17.855,0-32.331,14.475-32.331,32.331C27.669,76.314,60,107.292,60,107.292s32.331-34.111,32.331-60.815  C92.331,28.622,77.855,14.147,60,14.147z M60.001,58.015c-7.4,0-13.398-5.999-13.398-13.398c0-7.399,5.999-13.398,13.398-13.398  c7.399,0,13.397,5.999,13.397,13.398C73.398,52.016,67.4,58.015,60.001,58.015z"/></svg><div class='w-full font-bold text-center block'>${point.properties.temperature}</div></div>`,
        //                         className:
        //                             "fill-current color-gray-800 hover:scale-105 transform ",
        //                         iconSize: [30, 37.5],
        //                         tooltipAnchor: [1, -10],
        //                     });

        //                     return (
        //                         <Marker
        //                             icon={blackIcon}
        //                             key={i}
        //                             position={[
        //                                 point.geometry.coordinates[1],
        //                                 point.geometry.coordinates[0],
        //                             ]}
        //                             temperature={point.properties.temperature}
        //                         >
        //                             <Tooltip
        //                                 direction="top"
        //                                 className="h-auto w-72 break-normal whitespace-pre-line shadow-lg"
        //                             >
        //                                 {point.properties.description}
        //                             </Tooltip>
        //                         </Marker>
        //                     );
        //                 })}
        //             </MarkerClusterGroup>
        //         </>
        //     )}

        // </MapContainer>
    );
};

export default CustMap;
