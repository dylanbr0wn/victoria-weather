import axios from "axios";
import { useEffect, useState } from "react";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    GeoJSON,
    Tooltip,
} from "react-leaflet";
import * as L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

L.Map.mergeOptions({
    // @section Mousewheel options
    // @option smoothWheelZoom: Boolean|String = true
    // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
    // it will zoom to the center of the view regardless of where the mouse was.
    smoothWheelZoom: true,

    // @option smoothWheelZoom: number = 1
    // setting zoom speed
    smoothSensitivity: 1,
});

L.Map.SmoothWheelZoom = L.Handler.extend({
    addHooks: function () {
        L.DomEvent.on(this._map._container, "wheel", this._onWheelScroll, this);
    },

    removeHooks: function () {
        L.DomEvent.off(
            this._map._container,
            "wheel",
            this._onWheelScroll,
            this
        );
    },

    _onWheelScroll: function (e) {
        if (!this._isWheeling) {
            this._onWheelStart(e);
        }
        this._onWheeling(e);
    },

    _onWheelStart: function (e) {
        var map = this._map;
        this._isWheeling = true;
        this._wheelMousePosition = map.mouseEventToContainerPoint(e);
        this._centerPoint = map.getSize()._divideBy(2);
        this._startLatLng = map.containerPointToLatLng(this._centerPoint);
        this._wheelStartLatLng = map.containerPointToLatLng(
            this._wheelMousePosition
        );
        this._startZoom = map.getZoom();
        this._moved = false;
        this._zooming = true;

        map._stop();
        if (map._panAnim) map._panAnim.stop();

        this._goalZoom = map.getZoom();
        this._prevCenter = map.getCenter();
        this._prevZoom = map.getZoom();

        this._zoomAnimationId = requestAnimationFrame(
            this._updateWheelZoom.bind(this)
        );
    },

    _onWheeling: function (e) {
        var map = this._map;

        this._goalZoom =
            this._goalZoom +
            L.DomEvent.getWheelDelta(e) * 0.003 * map.options.smoothSensitivity;
        if (
            this._goalZoom < map.getMinZoom() ||
            this._goalZoom > map.getMaxZoom()
        ) {
            this._goalZoom = map._limitZoom(this._goalZoom);
        }
        this._wheelMousePosition = this._map.mouseEventToContainerPoint(e);

        clearTimeout(this._timeoutId);
        this._timeoutId = setTimeout(this._onWheelEnd.bind(this), 200);

        L.DomEvent.preventDefault(e);
        L.DomEvent.stopPropagation(e);
    },

    _onWheelEnd: function (e) {
        this._isWheeling = false;
        cancelAnimationFrame(this._zoomAnimationId);
        this._map._moveEnd(true);
    },

    _updateWheelZoom: function () {
        var map = this._map;

        if (
            !map.getCenter().equals(this._prevCenter) ||
            map.getZoom() != this._prevZoom
        )
            return;

        this._zoom = map.getZoom() + (this._goalZoom - map.getZoom()) * 0.3;
        this._zoom = Math.floor(this._zoom * 100) / 100;

        var delta = this._wheelMousePosition.subtract(this._centerPoint);
        if (delta.x === 0 && delta.y === 0) return;

        if (map.options.smoothWheelZoom === "center") {
            this._center = this._startLatLng;
        } else {
            this._center = map.unproject(
                map.project(this._wheelStartLatLng, this._zoom).subtract(delta),
                this._zoom
            );
        }

        if (!this._moved) {
            map._moveStart(true, false);
            this._moved = true;
        }

        map._move(this._center, this._zoom);
        this._prevCenter = map.getCenter();
        this._prevZoom = map.getZoom();

        this._zoomAnimationId = requestAnimationFrame(
            this._updateWheelZoom.bind(this)
        );
    },
});

L.Map.addInitHook("addHandler", "smoothWheelZoom", L.Map.SmoothWheelZoom);

const Map = ({ isobands, island, points }) => {
    return (
        <MapContainer
            className="w-full h-full"
            center={[48.45, -123.4]}
            zoom={12}
            scrollWheelZoom={false} // disable original zoom function
            smoothWheelZoom={true} // enable smooth zoom
            smoothSensitivity={1} // zoom speed. default is 1
            // zoomSnap={0}
            // wheelPxPerZoomLevel={10}
        >
            <TileLayer
                detectRetina={true}
                updateInterval={200}
                keepBuffer={3}
                attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                maxZoom={18}
                id="dylanbrown/ckukftmpa1mlg17mlkvo86j4x"
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
                            fillOpacity: 0.7,

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
                    {/* <GeoJSON
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
                    /> */}
                    <MarkerClusterGroup
                        iconCreateFunction={(cluster) => {
                            const markers = cluster.getAllChildMarkers();
                            const number = markers.length;
                            let average = 0;

                            markers.forEach((marker) => {
                                average += marker.options.temperature;
                            });
                            average = (average / number).toFixed(1);

                            console.log(markers);

                            // var c = " marker-cluster-";
                            // if (number < 10) {
                            //     c += "small";
                            // } else if (number < 100) {
                            //     c += "medium";
                            // } else {
                            //     c += "large";
                            // }

                            return new L.DivIcon({
                                html:
                                    "<div style=''><span >" +
                                    average +
                                    "</span></div>",
                                className:
                                    "bg-gray-800 rounded-full text-white text-center font-bold text-sm leading-8 border-4 border-gray-500 border-opacity-70 shadow-xl",
                                iconSize: new L.Point(40, 40),
                            });
                        }}
                    >
                        {points.features.map((point, i) => {
                            var blackIcon = new L.DivIcon({
                                html: `<div class='flex flex-col'><svg style='position: relative !important' class=' block fill-current text-gray-800 filter drop-shadow-lg' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="25 13 70 100" ><path d="M60,14.147c-17.855,0-32.331,14.475-32.331,32.331C27.669,76.314,60,107.292,60,107.292s32.331-34.111,32.331-60.815  C92.331,28.622,77.855,14.147,60,14.147z M60.001,58.015c-7.4,0-13.398-5.999-13.398-13.398c0-7.399,5.999-13.398,13.398-13.398  c7.399,0,13.397,5.999,13.397,13.398C73.398,52.016,67.4,58.015,60.001,58.015z"/></svg><div class='w-full font-bold text-center block'>${point.properties.temperature}</div></div>`,
                                className:
                                    "fill-current color-gray-800 hover:scale-105 transform ",
                                iconSize: [30, 37.5],
                                tooltipAnchor: [1, -10],
                            });

                            return (
                                <Marker
                                    icon={blackIcon}
                                    key={i}
                                    position={[
                                        point.geometry.coordinates[1],
                                        point.geometry.coordinates[0],
                                    ]}
                                    temperature={point.properties.temperature}
                                >
                                    <Tooltip
                                        direction="top"
                                        className="h-auto w-72 break-normal whitespace-pre-line shadow-lg"
                                    >
                                        {point.properties.description}
                                    </Tooltip>
                                </Marker>
                            );
                        })}
                    </MarkerClusterGroup>
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
