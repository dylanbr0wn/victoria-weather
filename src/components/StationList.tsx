"use client";
import { useMemo, useState } from "react";
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
import {
	AirVent,
	Droplets,
	ExternalLink,
	GlassWater,
	Locate,
	MoveHorizontal,
	MoveVertical,
	Shrink,
	Sun,
	Thermometer,
} from "lucide-react";

type StationData = {
	name: string;
	id: string;
	elevation: string | null;
	rain: string | null;
	temperature: string | null;
	pressure: string | null;
	coordinates: {
		long: string;
		lat: string;
	};
	wind: string | null;
	humidity: string | null;
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
			stations.push();
		}
	});
	return stations;
}

export default function StationList({ points }: { points: PointsData }) {
	const [search, setSearch] = useState("");
	const [pagination, setPagination] = useState({ offset: 0, count: 10 });

	const parsedPoints = useMemo(
		() =>
			points.points.features.map((s) => ({
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
				coordinates: {
					long: s.geometry.coordinates[1].toFixed(7),
					lat: s.geometry.coordinates[0].toFixed(7),
				},
				wind: s.properties.wind_speed
					? `${s.properties.wind_speed} ${s.properties.wind_speed_units} ${
							Number(s.properties.wind_speed) !== 0
								? s.properties.wind_speed_heading
								: ""
					  }`
					: null,
				humidity: s.properties.humidity
					? `${s.properties.humidity} ${s.properties.humidity_units}`
					: null,
				insolation: s.properties.insolation
					? `${s.properties.insolation} ${s.properties.insolation_units}`
					: null,
			})),
		[points]
	);

	function onSearch({ target }) {
		setSearch(target.value);
	}

	const stations = parsedPoints.filter((s) =>
		s.name.toLowerCase().includes(search.toLowerCase())
	);

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
				{stations
					.slice(0, pagination.count)
					.map(
						(
							{
								elevation,
								name,
								id,
								temperature,
								rain,
								pressure,
								coordinates,
								wind,
								humidity,
								insolation,
							},
							i
						) => (
							<Box key={id}>
								{/* {i !== 0 && <Separator className="seperator" my="4" size="4" />} */}
								<Card>
									<Flex justify="between" align="center" gap="3">
										<Flex direction="column" align="start" gap="1">
											<Text as="div" size="3" weight="bold">
												{name}
											</Text>

											<Flex gap="4" className="w-full">
												<Flex gap="1" align="center">
													<Locate className="h-4 w-4 text-gray-400" />
													<Flex gap="1" align="center">
														<Text size="2">
															{coordinates.long}, {coordinates.lat}
														</Text>
													</Flex>
												</Flex>
												<Flex gap="1" align="center">
													<Thermometer className="h-4 w-4 text-gray-400" />
													<Text size="2">{temperature}</Text>
												</Flex>
												<Flex gap="2" align="center">
													<Droplets className="h-4 w-4 text-gray-400" />
													<Text color="sky" size="2">
														{rain}
													</Text>
												</Flex>
												<Flex gap="2" align="center">
													<Shrink className="h-4 w-4 text-gray-400" />
													<Text color="violet" size="2">
														{pressure}
													</Text>
												</Flex>
												<Flex gap="2" align="center">
													<GlassWater className="h-4 w-4 text-gray-400" />
													<Text color="cyan" size="2">
														{humidity}
													</Text>
												</Flex>
												<Flex gap="2" align="center">
													<AirVent className="h-4 w-4 text-gray-400" />
													<Text color="indigo" size="2">
														{wind}
													</Text>
												</Flex>
												<Flex gap="2" align="center">
													<Sun className="h-4 w-4 text-gray-400" />
													<Text color="amber" size="2">
														{insolation}
													</Text>
												</Flex>
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
					<Select.Root
						size="3"
						onValueChange={(val) =>
							setPagination({
								...pagination,
								count: Number(val),
							})
						}
						value={`${pagination.count}`}
					>
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
