import { query } from "@next-fetch/swr";
import { calcAQICategory, getUVIndex } from "../../utils/helper";
import { Weather } from "../../utils/types";

export const useWeatherData = query(async () => {
	const weather = (await (
		await fetch(
			"https://api.weatherapi.com/v1/forecast.json?key=236a08e4d6dc414092a40006211210&q=Victoria%20BC&days=3&aqi=yes&alerts=no"
		)
	).json()) as unknown as Weather;

	return {
		weather,
		aqi: calcAQICategory(weather.current.air_quality.pm2_5),
		uv: getUVIndex(weather.current.uv),
	};
});
