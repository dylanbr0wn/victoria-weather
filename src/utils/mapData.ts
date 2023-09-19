import { cache } from "react";
import "server-only";
import { MapData, RainData } from "./types";

const url =
	"https://us-west-2.aws.data.mongodb-api.com/app/data-hacsi/endpoint/data/v1/action/findOne";

export function preloadMapData() {
	void getMapData();
}

export const getMapData = cache(async () => {
	const [intersection, island] = await Promise.all([
		getIntersection(),
		getIsland(),
	]);
	return { intersection, island };
});

async function getIntersection() {
	return (
		await (
			await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Request-Headers": "*",
					"api-key":
						"J9AlkHAkRX67II6bP3drJCwFQf0JzEdofLvWsNlhyAEaGdbGTb371VUpBkZgM5Gi",
				},
				body: JSON.stringify({
					collection: "intersection",
					database: "weather-test",
					dataSource: "victoria-weather",
				}),
			})
		).json()
	).document as MapData["intersection"];
}

async function getIsland() {
	return (
		await (
			await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Request-Headers": "*",
					"api-key":
						"J9AlkHAkRX67II6bP3drJCwFQf0JzEdofLvWsNlhyAEaGdbGTb371VUpBkZgM5Gi",
				},
				body: JSON.stringify({
					collection: "island",
					database: "weather-test",
					dataSource: "victoria-weather",
				}),
			})
		).json()
	).document as MapData["island"];
}
