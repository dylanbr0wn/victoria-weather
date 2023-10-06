import dynamic from "next/dynamic";
import { WeatherData } from "../utils/weatherData";
import { Badge, Box, Card, Flex, Text } from "@radix-ui/themes";
import MaxMin from "./MaxMin";
import Rain from "./Rain";
import UVIndex from "./UVIndex";
import { dayjs } from "../utils/helper";
import { ClockIcon } from "@radix-ui/react-icons";
import { MapData, PointsData, RainData } from "../utils/types";
import AirQuality from "./AirQuality";
import StationList from "./StationList";
import SunMoonCycle from "./SunMoonCycle";

const Map = dynamic(() => import("./WeatherMap"), {
	ssr: false,
});

type HomeProps = {
	intersection: MapData["intersection"];
	island: MapData["island"];
	points: PointsData;
	rain: RainData;
	weather: WeatherData;
};

function getRelativeTimeString(date: Date | number, lang = "en") {
	const timeMs = typeof date === "number" ? date : date.getTime();
	const deltaSeconds = Math.round((timeMs - dayjs.utc().unix()) / 1000);
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
	return points?.points.features.reduce((mostRecent, point) => {
		const obsrvTime =
			dayjs.utc(point.properties.observation_time).unix() * 1000;
		if (obsrvTime > mostRecent) {
			return obsrvTime;
		}
		return mostRecent;
	}, 0);
}

export default function Home({
	intersection,
	island,
	points,
	weather,
	rain,
}: HomeProps) {
	const observation_time = getMostRecentObservationTime(points);

	return (
		<main className="z-10 h-full flex-grow overflow-hidden p-3">
			<Flex direction="column" gap="4" className="h-full">
				<div className="h-[70vh]">
					<Map intersection={intersection} points={points} island={island} />
				</div>
				<Flex direction="column" gap="4" className="mx-auto w-full max-w-5xl">
					<Flex align="center" gap="3">
						<h2 className="bg-gradient-to-tl from-sky-950 to-sky-600 bg-clip-text font-hubot text-3xl font-bold tracking-normal text-transparent dark:from-sky-200 dark:to-sky-50">
							Current Conditions
						</h2>
						<Badge color="sky">
							<Flex gap="2" align="center" p="1">
								<ClockIcon width={16} height={16} />
								<Text size="2">
									Last Updated: {getRelativeTimeString(observation_time)}
								</Text>
							</Flex>
						</Badge>
					</Flex>

					<Card size="2" className="h-full">
						<Flex direction="column" align="center">
							<Flex align="baseline" gap="1">
								<p className="text-6xl font-bold">
									{points?.average_temp.toFixed(1)}
								</p>
								<Text color="gray" size="6">
									&deg;C
								</Text>
							</Flex>
							<Text color="gray" size="3">
								Average Temperature
							</Text>
						</Flex>
						<Flex direction="column" gap="3" mt="-6">
							{!!points ? <MaxMin points={points} /> : null}
						</Flex>
					</Card>
					<Flex className="w-full" gap="4">
						<Card className="h-[160px] w-1/2">
							{!!rain ? <Rain rain={rain} /> : null}
						</Card>
						<Card className="h-[160px] w-1/2">
							<UVIndex uvData={weather.uv} />
						</Card>
					</Flex>
					<Flex className="w-full" gap="4">
						<Card className="h-[160px] w-1/2">
							<AirQuality weather={weather} />
						</Card>
						<Card className="h-[160px] w-1/2">
							<SunMoonCycle />
						</Card>
					</Flex>
					<Flex direction="column" gap="4">
						<h2 className="bg-gradient-to-tl from-pink-950 to-pink-600 bg-clip-text font-hubot text-3xl font-bold tracking-normal text-transparent dark:from-pink-200 dark:to-pink-50">
							Stations
						</h2>
						<StationList points={points} />
					</Flex>
				</Flex>
			</Flex>
		</main>
	);
}
