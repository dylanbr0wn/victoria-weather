import axios from "axios";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import * as L from "leaflet";

const Map = () => {
    const [isobands, setIsobands] = useState(null);
    const [island, setIsland] = useState(null);
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
            setIsobands(data.isobands);
            setIsland(data.island);
            setPoints(data.newPoints);
        });
    }, []);

    return (
        <MapContainer
            className="w-full h-full"
            center={[48.5, -123.5]}
            zoom={10}
        >
            <TileLayer
                attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                maxZoom={18}
                id="mapbox/streets-v11"
                // tileSize={512}
                url={
                    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
                }
                accessToken={
                    "pk.eyJ1IjoiZHlsYW5icm93biIsImEiOiJja3R4bXc2aTYyOW8wMm9sNTV5d3lyZXFhIn0.D4wgzD-IpyjiRUu9s63KzA"
                }
            />
            {isobands && (
                <GeoJSON
                    data={isobands}
                    style={(feature) => {
                        return {
                            fillColor: feature.properties.fill,
                            fill: true,
                            // borderRadius: 0,
                            // backgroundColor: feature.properties.fill,
                            fillOpacity: 0.5,

                            // opacity: 1,
                            stroke: false,
                        };
                    }}
                />
            )}
            {island && (
                <GeoJSON
                    data={island}
                    style={(feature) => {
                        return { color: "#119DA4", opacity: 1 };
                    }}
                />
            )}
            {points && (
                <>
                    <GeoJSON
                        data={points}
                        pointToLayer={(point, latlng) => {
                            const icon = L.divIcon({
                                html: `<div>${point.properties.temperature}</div>`,
                                className:
                                    "icon-class text-lg font-bold left-0",
                            });
                            return L.marker(latlng, {
                                icon,
                            }).bindPopup(point.properties.description);
                        }}
                    />
                    <GeoJSON
                        data={points}
                        pointToLayer={(point, latlng) => {
                            return L.marker(latlng, {
                                riseOnHover: true,
                            }).bindPopup(point.properties.description);
                        }}
                    />
                </>
            )}

            {/* <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker> */}
        </MapContainer>
    );
};

export default Map;
