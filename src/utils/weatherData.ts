import { cache } from "react";
import "server-only";
import { calcAQICategory, getUVIndex } from "./helper";
import { Weather } from "./types";

const url =
	"https://api.weatherapi.com/v1/forecast.json?key=236a08e4d6dc414092a40006211210&q=Victoria%20BC&days=4&aqi=yes&alerts=no";

export function preloadWeatherData() {
	void getWeatherData();
}

export const getWeatherData = cache(async () => {
	const weather = (await (await fetch(url)).json()) as unknown as Weather;
	return {
		weather,
		aqi: calcAQICategory(weather.current.air_quality.pm2_5),
		uv: getUVIndex(weather.current.uv),
	};
});

export type WeatherData = Awaited<ReturnType<typeof getWeatherData>>;
