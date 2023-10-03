"use client";
import { useState } from "react";
import { PointsData } from "../utils/types";
import {
	Box,
	Button,
	Card,
	Flex,
	Link,
	Select,
	Text,
	TextField,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ExternalLink } from "lucide-react";

type StationData = {
	name: string;
	id: string;
	elevation: string | null;
	rain: string | null;
	temperature: string | null;
	pressure: string | null;
};

function getStationData(
	points: PointsData,
	search: string,
	{ count, offset }: { offset: number; count: number }
): StationData[] {
	const stations: StationData[] = [];
	points.points.features.slice(offset, offset + count).forEach((s) => {
		if (
			s.properties.station_long_name
				.toLowerCase()
				.includes(search.toLowerCase())
		) {
			stations.push({
				temperature: s.properties?.temperature
					? `${Number(s.properties?.temperature)}°C`
					: null,
				rain: s.properties?.rain
					? `${Number(s.properties?.rain)?.toFixed(1)} ${
							s.properties.rain_units
					  }`
					: null,
				id: s.properties.station_id,
				name: s.properties.station_long_name,
				elevation: s.properties.elevation ? `${s.properties.elevation}m` : null,
				pressure: s.properties.pressure
					? `${s.properties.pressure} ${s.properties.pressure_units}`
					: null,
			});
		}
	});
	return stations;
}

export default function StationList({ points }: { points: PointsData }) {
	const [search, setSearch] = useState("");
	const [pagination, setPagination] = useState({ offset: 0, count: 10 });

	function onSearch({ target }) {
		setSearch(target.value);
	}

	const stations = getStationData(points, search, pagination);

	return (
		<Box>
			<Flex direction="column" gap="2">
				<TextField.Root size="3">
					<TextField.Slot>
						<MagnifyingGlassIcon height="16" width="16" />
					</TextField.Slot>
					<TextField.Input
						placeholder="Search stations..."
						value={search}
						onChange={onSearch}
					/>
				</TextField.Root>
				{stations.map(
					({ elevation, name, id, temperature, rain, pressure }, i) => (
						<Box key={id}>
							{/* {i !== 0 && <Separator className="seperator" my="4" size="4" />} */}
							<Card>
								<Flex justify="between" align="center" gap="3">
									<Flex direction="column" align="start" gap="1">
										<Text as="div" size="3" weight="bold">
											{name}
										</Text>
										<Flex wrap="wrap" gap="2" className="pr-3">
											{/* <Text as="div" size="2" color="gray">
                        📍 {coordinates}
                      </Text> */}
											{elevation && (
												<Text as="div" size="2" color="gray">
													⬆ {elevation}
												</Text>
											)}
											{temperature && (
												<Text as="div" size="2">
													🌡️ {temperature}
												</Text>
											)}
											{rain && (
												<Text as="div" size="2" color="sky">
													💧 {rain}
												</Text>
											)}
											{pressure && (
												<Text as="div" size="2">
													☁️ {pressure}
												</Text>
											)}
										</Flex>
									</Flex>
									<Box px="2">
										<Button asChild variant="outline">
											<Link
												rel="noopener noreferrer"
												target="_blank"
												href={`https://www.victoriaweather.ca/station.php?id=${id}`}
											>
												<Flex justify="center" align="center" gap="1">
													<span>details</span>
													<ExternalLink height={12} width={12} />
												</Flex>
											</Link>
										</Button>
									</Box>
								</Flex>
							</Card>
						</Box>
					)
				)}
				<Flex justify="center" my="5" align="center" gap="6">
					<Select.Root size="3" defaultValue="10">
						<Select.Trigger variant="ghost" />
						<Select.Content>
							<Select.Item value="10">10 results</Select.Item>
							<Select.Item value="20">20 results</Select.Item>
							<Select.Item value="30">30 results</Select.Item>
						</Select.Content>
					</Select.Root>
				</Flex>
			</Flex>
		</Box>
	);
}
