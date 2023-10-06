import { NextResponse } from "next/server";
import { getWeatherData } from "../../utils/weatherData";

export const revalidate = 60;

export async function GET() {
	const weather = await getWeatherData();

	return NextResponse.json({
		...weather,
	});
}
