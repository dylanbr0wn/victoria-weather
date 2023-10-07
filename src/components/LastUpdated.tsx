"use client";
import { Text } from "@radix-ui/themes";
import { dayjs } from "../utils/helper";
import { PointsData } from "../utils/types";

function getRelativeTimeString(date: Date | number, lang = "en") {
	const timeMs = typeof date === "number" ? date : date.getTime();
	const deltaSeconds = Math.round(
		(timeMs - dayjs().tz("America/Vancouver").unix() * 1000) / 1000
	);
	const cutoffs = [
		60,
		3600,
		86400,
		86400 * 7,
		86400 * 30,
		86400 * 365,
		Infinity,
	];
	const units: Intl.RelativeTimeFormatUnit[] = [
		"second",
		"minute",
		"hour",
		"day",
		"week",
		"month",
		"year",
	];

	const unitIndex = cutoffs.findIndex(
		(cutoff) => cutoff > Math.abs(deltaSeconds)
	);

	const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

	const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
	return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}

function getMostRecentObservationTime(points: PointsData) {
	return getRelativeTimeString(
		points?.points.features.reduce((mostRecent, point) => {
			const obsrvTime =
				dayjs(point.properties.observation_time, "YYYY/MM/DD, HH:ss")
					.tz("America/Vancouver")
					.unix() * 1000;
			if (obsrvTime > mostRecent) {
				return obsrvTime;
			}
			return mostRecent;
		}, 0)
	);
}

export default function LastUpdated({ points }: { points: PointsData }) {
	const observation_time = getMostRecentObservationTime(points);
	return <Text size="2">Last Updated: {observation_time}</Text>;
}
