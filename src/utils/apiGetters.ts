import { MapData, PointsData, RainData, Weather } from "./types";

export const getMapData = async (): Promise<MapData> => {
	const data = await fetch("/api/map-data");

	return await data.json();
};

export const getPointsData = async (): Promise<PointsData> => {
	const data = await fetch("/api/points-data");

	return await data.json();
};

export const getRainData = async (): Promise<RainData> => {
	const data = await fetch("/api/rain-data");

	return await data.json();
};

export const getWeatherData = async (): Promise<Weather> => {
	const data = await fetch("/api/weather-data");

	return await data.json();
};
