"use client";

import Rain from "../components/Rain";
import AirQuality from "../components/AirQuality";
import UVIndex from "../components/UVIndex";
import SunMoonCycle from "../components/SunMoonCycle";
import Current from "./Current";
import MaxMin from "./MaxMin";
import { Reorder, useDragControls } from "framer-motion";
import { useLayoutStore, WidgetInfo, Widgets } from "../utils/zustand";
import { MapData, PointsData, RainData, Weather } from "../utils/types";
import { WeatherData } from "../utils/weatherData";

function Widget({
	info,
	handleDrag,
	data,
}: {
	data: WidgetListProps;
	info: WidgetInfo;
	handleDrag: React.PointerEventHandler<HTMLButtonElement>;
}) {
	switch (info.type) {
		case Widgets.AQI:
			return <AirQuality weatherData={data.weather} handleDrag={handleDrag} />;
		case Widgets.Rain:
			return <Rain handleDrag={handleDrag} />;
		case Widgets.UV:
			return <UVIndex handleDrag={handleDrag} />;
		case Widgets.Sun:
			return <SunMoonCycle handleDrag={handleDrag} />;
		case Widgets.Temp:
			return <Current handleDrag={handleDrag} />;
		case Widgets.MaxMin:
			return <MaxMin handleDrag={handleDrag} />;
		default:
			return null;
	}
}

function DraggableItem({
	widget,
	data,
}: {
	widget: WidgetInfo;
	data: WidgetListProps;
}) {
	const controls = useDragControls();

	return (
		<Reorder.Item
			key={widget.id}
			layout
			drag
			dragControls={controls}
			dragListener={false}
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 50 }}
			value={widget}
			style={{ width: `${widget.w * 100}%` }}
			className="flex-grow"
		>
			<Widget data={data} info={widget} handleDrag={(e) => controls.start(e)} />
		</Reorder.Item>
	);
}

type WidgetListProps = {
	rain: RainData | null;
	points: PointsData | null;
	weather: WeatherData;
	island: MapData["island"] | null;
	intersection: MapData["intersection"] | null;
};

export function WidgetsList(props: WidgetListProps) {
	const { layout, updateLayout, layoutType } = useLayoutStore();

	function updateRow(widgets: WidgetInfo[]) {
		updateLayout((layout) => ({
			...layout,
			info: widgets,
		}));
	}
	return (
		<div
			className="flex flex-col gap-3 overflow-scroll"
			style={{ width: `${100 - layout.map.width}%` }}
		>
			<Reorder.Group
				onReorder={updateRow}
				values={layout.info}
				className="w-full flex flex-wrap gap-3"
			>
				{layout.info.map((widget) => (
					<DraggableItem data={props} key={widget.id} widget={widget} />
				))}
			</Reorder.Group>
		</div>
	);
}
