"use client";

import { Command, useCommandState } from "cmdk";
import { Feature, FeatureCollection, Point } from "geojson";
import { Building, Droplet, Search, Thermometer, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePointsData } from "../pages/api/points.swr";
import { PointProperties } from "../utils/types";

function CommandItem({ point }: { point: Feature<Point, PointProperties> }) {
	return (
		<Command.Item
			value={point?.properties.station_long_name}
			className=" py-3 px-4  border border-t-transparent border-x-transparent border-mute hover:border-light last:border-b-transparent last:rounded-b-lg transition-all  cursor-pointer hover:scale-105 dark:bg-base bg-white hover:rounded-lg z-10 hover:z-50 group/item relative shadow-lg shadow-transparent hover:shadow-indigo-700/30"
		>
			<a
				className=" flex items-center gap-3"
				rel="noopener noreferrer"
				target="_blank"
				href={`https://www.victoriaweather.ca/station.php?id=${point?.properties.station_id}`}
			>
				<Building className="h-5 w-5 text-light" />
				<div className="dark:text-lighter text-light">
					{point?.properties?.station_long_name}
				</div>
				<div className="flex-grow" />
				<div className="ml-6 text-xs text-sky-500 flex items-center opacity-70 group-hover/item:opacity-100 transition-opacity gap-2">
					<Droplet className="h-3 w-3" />
					<div>
						{point?.properties.rain}
						{point?.properties.rain_units}
					</div>
				</div>
				<div className="text-xs text-red-500 flex items-center opacity-70 group-hover/item:opacity-100 transition-opacity ">
					<Thermometer className="h-3 w-3" />
					<div>
						{point?.properties.temperature}°
						{point?.properties.temperature_units}
					</div>
				</div>
			</a>
		</Command.Item>
	);
}

function EmptyCommandItem({ search }: { search: string }) {
	return (
		<Command.Empty className=" py-3 px-4  flex items-center gap-3 border border-t-transparent border-x-transparent border-mute last:border-b-transparent last:rounded-b-lg transition-all dark:bg-base bg-white  z-10  relative shadow-lg shadow-transparent">
			<X className="h-5 w-5 text-light" />
			<div className="text-lighter ">
				No results found for{" "}
				<pre className="inline font-bold italic">{search}</pre>.
			</div>
		</Command.Empty>
	);
}

function CommandList({
	points,
}: {
	points: FeatureCollection<Point, PointProperties>;
}) {
	const truncated = points.features.slice(0, 10);

	const search = useCommandState((state) => state.search);
	return (
		<Command.List
			onClick={(e) => {
				e.stopPropagation();
			}}
			className="border-mute border-x border-b transition-all duration-500 shadow-lg shadow-transparent dark:bg-base bg-white w-3/4 rounded-b-lg "
		>
			<EmptyCommandItem search={search} />
			{truncated.map((point) => {
				return (
					<CommandItem key={point.properties.station_long_name} point={point} />
				);
			})}
		</Command.List>
	);
}

export default function CommandMenu() {
	const [open, setOpen] = useState(false);

	// Toggle the menu when ⌘K is pressed
	useEffect(() => {
		const down = (e) => {
			if (e.key === "k" && e.metaKey) {
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const { data } = usePointsData();

	if (!data) return null;

	const { points } = data;

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className="flex gap-2 border dark:border-indigo-400/40 border-indigo-600/40 rounded-lg px-2 py-1 h-10 items-center hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-indigo-700/10"
			>
				<p className="opacity-40 text-sm font-semibold dark:text-indigo-200 text-indigo-800">
					Search Stations...
				</p>

				<kbd className="py-0.5 px-1 rounded bg-neutral-400/10 text-xs font-bold">
					CMD + K
				</kbd>
				{/* <input className="bg-transparent focus-visible:outline-none px-2" /> */}
				<Search className="h-5 w-5 dark:text-white opacity-70" />
			</button>
			<Command.Dialog
				open={open}
				onOpenChange={setOpen}
				label="Global Command Menu"
				onClick={() => {
					setOpen(false);
				}}
				className="z-10 fixed top-0 left-0 bg-black/70 w-full h-full "
			>
				<div className="absolute top-[15%] left-1/2 -translate-x-1/2  rounded-lg  w-1/2 flex flex-col items-center justify-center">
					<div
						onClick={(e) => {
							e.stopPropagation();
						}}
						className=" w-full rounded-lg dark:bg-base bg-white dark:text-white text-lg p-3 border-mute border group outline-non focus-within:border-light focus-within:ring-0 flex items-center gap-3 shadow-lg shadow-transparent focus-within:shadow-indigo-700/30 transition-all duration-300"
					>
						<Search className="pointer-events-auto text-light group-focus-within:text-lighter stroke-current transition-colors duration-300" />
						<Command.Input
							className="bg-transparent border-none outline-none ring-0 focus-visible:ring-0 w-full  placeholder:text-light text-lighter"
							placeholder="Search for a station..."
						/>
					</div>

					<CommandList points={points} />
				</div>
			</Command.Dialog>
		</>
	);
}
