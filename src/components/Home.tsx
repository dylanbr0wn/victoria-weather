import dynamic from "next/dynamic";
import { ConfigureDialog } from "./ConfigureDialog";
import { getMapData } from "../utils/mapData";
import { getPointsData } from "../utils/pointsData";
import { getRainData } from "../utils/rainData";
import { getWeatherData } from "../utils/weatherData";
import { WidgetsList } from "./WidgetsList";
import { Badge, Card, Em, Flex, Heading, Strong, Text } from "@radix-ui/themes";
import Current from "./Current";
import MaxMin from "./MaxMin";
import Rain from "./Rain";
import UVIndex from "./UVIndex";
import SunMoonCycle from "./SunMoonCycle";
import AirQuality from "./AirQuality";
import { useLayoutStore } from "../utils/zustand";
import dayjs from "dayjs";
import { ClockIcon, SewingPinFilledIcon } from "@radix-ui/react-icons";

const Map = dynamic(() => import("./WeatherMap"), {
	ssr: false,
});

export default async function Home() {
	const { intersection, island } = await getMapData();
	const points = await getPointsData();
	const rain = await getRainData();
	const weather = await getWeatherData();

	const observation_time = dayjs(points?.points[0]?.observation_time);

	return (
		<main className="z-10 flex-grow overflow-hidden p-3">
			<div className={`flex h-full gap-3 `}>
				<div className="flex-grow">
					<Map intersection={intersection} points={points} island={island} />
				</div>
				<Flex direction="column" gap="2" className="w-1/3">
					<Card size="2" variant="ghost" className="h-full">
						<Flex direction="column" gap="6">
							<Flex justify="center">
								<Flex direction="column" align="start">
									<Badge>
										<ClockIcon height={12} width={12} />
										<Text>{observation_time.format("DD/MM HH:MM A")}</Text>
									</Badge>
									<Flex align="baseline">
										<Text size="9">
											<Strong>{points?.average_temp.toFixed(1)}</Strong>
										</Text>
										<Text size="8">℃</Text>
									</Flex>
									<Text size="2" color="gray">
										Average Temperature
									</Text>
								</Flex>
							</Flex>
							<MaxMin />
							<Flex gap="6" pt="5">
								<Rain />
								<UVIndex />
							</Flex>
						</Flex>
					</Card>
					{/* <Current />
					<MaxMin />
					<Rain />
					
					<SunMoonCycle />
					<AirQuality weatherData={weather} /> */}
				</Flex>
			</div>
			<ConfigureDialog />
		</main>
	);
}
