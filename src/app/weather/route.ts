import { NextResponse } from "next/server";
import { calcAQICategory, getUVIndex } from "../../utils/helper";
import { Weather } from "../../utils/types";
import { getWeatherData } from "../../utils/weatherData";

export async function GET() {
	const weather = await getWeatherData();

	return NextResponse.json({
		...weather,
	});
}
