import dynamic from "next/dynamic";
import { WeatherData } from "../utils/weatherData";
import {
	Badge,
	Box,
	Card,
	Flex,
	Heading,
	Separator,
	Strong,
	Text,
} from "@radix-ui/themes";
import MaxMin from "./MaxMin";
import Rain from "./Rain";
import UVIndex from "./UVIndex";
import dayjs from "dayjs";
import { ClockIcon } from "@radix-ui/react-icons";
import { MapData, PointsData, RainData } from "../utils/types";

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
	const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);
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

export default function Home({
	intersection,
	island,
	points,
	weather,
	rain,
}: HomeProps) {
	const observation_time = dayjs(points?.points[0]?.observation_time);

	return (
		<main className="z-10 flex-grow overflow-hidden p-3">
			<Flex direction="column" gap="4" className="h-full">
				<div className="h-[calc(100vh*0.5)]">
					<Map intersection={intersection} points={points} island={island} />
				</div>
				<Flex direction="column" gap="4" className="max-w-5xl mx-auto w-full">
					<Flex align="center" gap="3">
						<h2 className="font-hubot text-3xl font-bold tracking-normal text-transparent bg-clip-text bg-gradient-to-tl from-sky-200 to-sky-50" >Current Conditions</h2>
						<Badge color="sky">
							<Flex gap="2" align="center" p="1">
								<ClockIcon width={16} height={16} />
								<Text size="2">
                  Last Updated: {getRelativeTimeString(observation_time.toDate())}
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
						<Card className="w-1/2">
							{!!rain ? <Rain rain={rain} /> : null}
						</Card>
						<Card className="w-1/2">
							<UVIndex uvData={weather.uv} />
						</Card>
					</Flex>
				</Flex>
			</Flex>
		</main>
	);
}
