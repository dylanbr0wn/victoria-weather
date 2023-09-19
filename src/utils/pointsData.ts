import { cache } from "react";
import "server-only";
import { PointsData } from "./types";

const url =
	"https://us-west-2.aws.data.mongodb-api.com/app/data-hacsi/endpoint/data/v1/action/findOne";

const body = JSON.stringify({
	collection: "points-data",
	database: "weather-test",
	dataSource: "victoria-weather",
});

export function preloadPointsData() {
	void getPointsData();
}

export const getPointsData = cache(async () => {
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
				body,
			})
		).json()
	).document as PointsData | null;
});
