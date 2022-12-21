import Rain from "../components/Rain";
import AirQuality from "../components/AirQuality";
import UVIndex from "../components/UVIndex";
import SunMoonCycle from "../components/SunMoonCycle";
import Current from "./Current";
import {
	buildWidget,
	buildWidgetRow,
	LayoutType,
	useEditStore,
	useLayoutStore,
	WidgetInfo,
	WidgetRow,
	Widgets,
} from "../utils/zustand";
import { ReactNode, useRef, useState } from "react";
import { Minus, Plus, PlusCircle, PlusSquare, Trash, X } from "lucide-react";
import { animated } from "@react-spring/web";
import { getIndexFromRowCol, useDragGrid } from "../utils/drag";
import Map from "./Map2";
import { useGesture, useHover } from "@use-gesture/react";
import { Reorder, motion, AnimatePresence } from "framer-motion";

function getWidget(info: WidgetInfo): ReactNode {
	switch (info.type) {
		case Widgets.AQI:
			return <AirQuality id={info.id} />;
		case Widgets.Rain:
			return <Rain id={info.id} />;
		case Widgets.UV:
			return <UVIndex id={info.id} />;
		case Widgets.Sun:
			return <SunMoonCycle id={info.id} />;
		case Widgets.Temp:
			return <Current id={info.id} />;
		default:
			return null;
	}
}

const Home = () => {
	const { layout, updateLayout, layoutType } = useLayoutStore();

	const { isEdit } = useEditStore((s) => ({
		isEdit: s.editMode,
		setEditMode: s.setEditMode,
	}));

	const isPage = layoutType === LayoutType.Page;

	function addToRow(index: number) {
		const newLayout: WidgetRow[] = [...layout.info];
		newLayout[index].widgets.push(buildWidget());
		updateLayout((layout) => ({
			...layout,
			info: newLayout,
		}));
	}

	function removeFromRow(index: number, id: string) {
		const newLayout = [...layout.info];
		newLayout[index] = {
			...newLayout[index],
			widgets: newLayout[index].widgets.filter((item) => id !== item.id),
		};
		updateLayout((layout) => ({
			...layout,
			info: newLayout,
		}));
	}
	function addRow() {
		const newLayout = [...layout.info];
		newLayout.push(buildWidgetRow([buildWidget(Widgets.Rain)]));
		updateLayout((layout) => ({
			...layout,
			info: newLayout,
		}));
	}
	function removeRow(index: number) {
		const newLayout = [...layout.info];
		newLayout.splice(index, 1);
		updateLayout((layout) => ({
			...layout,
			info: newLayout,
		}));
	}

	function updateRow(index: number, widgets: WidgetInfo[]) {
		const newLayout = [...layout.info];
		newLayout[index] = {
			...newLayout[index],
			widgets,
		};
		updateLayout((layout) => ({
			...layout,
			info: newLayout,
		}));
	}

	return (
		<main className="flex-grow z-10 overflow-hidden">
			<div className={`flex ${isPage ? "flex-col" : "flex-row"} h-full`}>
				<div className="flex-grow px-3">
					<Map />
				</div>
				<div
					className={`flex flex-col gap-3 px-3 w-[500px]
					 `}
				>
					{layout.info.map((row, i) => (
						<div key={row.id} className="flex gap-3">
							<Reorder.Group
								axis="x"
								values={row.widgets}
								onReorder={(order) => updateRow(i, order)}
								className="flex-grow flex gap-3"
							>
								<AnimatePresence>
									{row.widgets.map((item) => (
										<Reorder.Item
											key={item.id}
											layout
											initial={{ opacity: 0, x: 50 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: 50 }}
											value={item}
											className="w-full"
										>
											{getWidget(item)}
										</Reorder.Item>
									))}
								</AnimatePresence>
							</Reorder.Group>
							{isEdit && (
								<motion.button
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									onClick={() => addToRow(i)}
									className="px-0.5 flex-shrink-0 h-full rounded-lg  border-indigo-400/30 hover:border-indigo-400/40 border-2 backdrop-blur-lg flex items-center justify-center shadow-lg shadow-transparent hover:shadow-indigo-400/30 active:scale-95 transition duration-500"
								>
									<Plus className="h-8 w-8 text-indigo-300" />
								</motion.button>
							)}
						</div>
					))}

					<button
						className="py-1 w-full rounded-lg  border-indigo-400/30 hover:border-indigo-400/40 border-2 backdrop-blur-lg flex items-center justify-center shadow-lg shadow-transparent hover:shadow-indigo-400/30 active:scale-95 transition duration-500"
						onClick={() => addRow()}
					>
						<Plus className="h-7 w-7 text-indigo-300" />
					</button>
				</div>
			</div>
		</main>
	);
};

export default Home;
