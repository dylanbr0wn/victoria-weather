"use client";
import { useEffect, useState } from "react";
import { PointsData } from "../utils/types";
import {
	Box,
	Button,
	Card,
	Flex,
	Inset,
	Link,
	Popover,
	ScrollArea,
	Separator,
	Text,
	TextField,
} from "@radix-ui/themes";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ExternalLink } from "lucide-react";
import { Command } from "cmdk";

const Search = ({ points }: { points: PointsData }) => {
	const [search, setSearch] = useState("");

	const [popoverOpen, setPopoverOpen] = useState(false);

	const [container, setContainer] = useState<HTMLElement | null>(null);

	useEffect(() => {
		setContainer(document.getElementById("page-root"));
	}, []);

	const onSearch = ({ target }) => {
		setSearch(target.value);
		setPopoverOpen(true);
	};

	return (
		<Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
			<Command label="Command Menu">
				<PopoverAnchor asChild>
					<TextField.Root size="3">
						<TextField.Slot>
							<MagnifyingGlassIcon height="16" width="16" />
						</TextField.Slot>
						<TextField.Input
							variant="soft"
							placeholder="Search stations..."
							onFocus={() => setPopoverOpen(true)}
							value={search}
							onChange={onSearch}
						/>
						<Command.Input
							className="hidden"
							value={search}
							onValueChange={setSearch}
						/>
					</TextField.Root>
				</PopoverAnchor>
				<Popover.Content
					container={container}
					align="end"
					onOpenAutoFocus={(e) => e.preventDefault()}
					className="z-50 w-full md:w-[600px]"
				>
					<Inset>
						<ScrollArea
							type="auto"
							scrollbars="vertical"
							className="max-h-[400px]"
						>
							<Box grow="1" p="4">
								<Command.List className="group flex flex-col gap-1">
									<Command.Empty>No results found.</Command.Empty>

									{points.points.features.map(({ properties, geometry }, i) => {
										const coordinates = `${geometry.coordinates[1].toFixed(
											7
										)}, ${geometry.coordinates[0].toFixed(7)}`;
										const temperature = Number(properties?.temperature) || null;
										const rain = Number(properties?.rain)?.toFixed(1) || null;
										const elevation = properties.elevation || null;

										const pressure = properties.pressure
											? `${properties.pressure} ${properties.pressure_units}`
											: null;

										return (
											<Command.Item
												value={properties.station_long_name}
												key={properties.station_id}
												className="search-item"
											>
												{i !== 0 && (
													<Separator className="seperator" my="2" size="4" />
												)}
												<Box>
													<Flex justify="between" align="center" gap="3">
														<Flex direction="column" align="start" gap="1">
															<Text as="div" size="3" weight="bold">
																{properties.station_long_name}
															</Text>
															<Flex wrap="wrap" gap="2" className="pr-3">
																{/* <Text as="div" size="2" color="gray">
                        📍 {coordinates}
                      </Text> */}
																{elevation && (
																	<Text as="div" size="2" color="gray">
																		⬆ {elevation}m
																	</Text>
																)}
																{temperature && (
																	<Text
																		as="div"
																		size="2"
																		color={
																			temperature < 10
																				? "blue"
																				: temperature < 20
																				? "yellow"
																				: temperature < 30
																				? "green"
																				: "red"
																		}
																	>
																		🌡 {temperature.toFixed(1)}℃
																	</Text>
																)}
																{rain && (
																	<Text as="div" size="2" color="sky">
																		💧 {rain}mm
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
															<Button asChild variant="ghost">
																<Link
																	rel="noopener noreferrer"
																	target="_blank"
																	href={`https://www.victoriaweather.ca/station.php?id=${properties.station_id}`}
																>
																	<Flex justify="center" align="center" gap="1">
																		<span>details</span>
																		<ExternalLink height={12} width={12} />
																	</Flex>
																</Link>
															</Button>
														</Box>
													</Flex>
												</Box>
											</Command.Item>
										);
									})}
								</Command.List>
							</Box>
						</ScrollArea>
					</Inset>
				</Popover.Content>
			</Command>
		</Popover.Root>
	);
};

export default Search;
