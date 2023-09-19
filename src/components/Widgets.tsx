import { getMapData } from "../utils/mapData";
import clientPromise from "../utils/mongo";
import { getPointsData } from "../utils/pointsData";
import { getRainData } from "../utils/rainData";
import { MapData, PointsData, RainData } from "../utils/types";
import { getWeatherData } from "../utils/weatherData";
import { WidgetsList } from "./WidgetsList";

export async function Widgets() {
	const { intersection, island } = await getMapData();
	const points = await getPointsData();
	const rain = await getRainData();
	const weather = await getWeatherData();

	return <WidgetsList />;
}
