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
import { ReactNode } from "react";
import { Plus, Trash } from "lucide-react";
import Map from "./Map2";
import { Reorder, motion, AnimatePresence } from "framer-motion";
import { Dialog } from "./common/Dialog";

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

function getWidgetPreview(type: Widgets): ReactNode {
	switch (type) {
		case Widgets.AQI:
			return <AirQuality isPreview id={type.toString()} />;
		case Widgets.Rain:
			return <Rain isPreview id={type.toString()} />;
		case Widgets.UV:
			return <UVIndex isPreview id={type.toString()} />;
		case Widgets.Sun:
			return <SunMoonCycle isPreview id={type.toString()} />;
		case Widgets.Temp:
			return <Current isPreview id={type.toString()} />;
		default:
			return null;
	}
}

const Home = () => {
	const { layout, updateLayout, layoutType } = useLayoutStore();

	const {
		isEdit,
		selectedRow,
		selectedWidget,
		setIsReplaceDialogOpen,
		setIsSelectDialogOpen,
		isReplaceDialogOpen,
		isSelectDialogOpen,
		setSelectedRow,
	} = useEditStore((s) => ({
		isEdit: s.editMode,
		selectedRow: s.selectedRow,
		selectedWidget: s.selectedWidget,
		setSelectedRow: s.setSelectedRow,
		setIsSelectDialogOpen: s.setOpenAddWidget,
		setIsReplaceDialogOpen: s.setOpenChangeWidget,
		isReplaceDialogOpen: s.openChangeWidget,
		isSelectDialogOpen: s.openAddWidget,
	}));

	const isPage = layoutType === LayoutType.Page;

	function addToRow(id: string, widget: Widgets) {
		const newLayout: WidgetRow[] = [...layout.info];
		newLayout.forEach((row) => {
			if (row.id === id) {
				row.widgets.push(buildWidget(widget));
			}
		});
		updateLayout((layout) => ({
			...layout,
			info: newLayout,
		}));
	}

	function replaceWidget(id: string, widget: Widgets) {
		let newLayout: WidgetRow[] = [...layout.info];
		newLayout = newLayout.map((row) => ({
			...row,
			widgets: row.widgets.map((w) => {
				if (w.id === id) {
					return {
						...w,
						type: widget,
					};
				}
				return w;
			}),
		}));
		updateLayout((layout) => ({
			...layout,
			info: newLayout,
		}));
	}

	// function removeFromRow(index: number, id: string) {
	// 	const newLayout = [...layout.info];
	// 	newLayout[index] = {
	// 		...newLayout[index],
	// 		widgets: newLayout[index].widgets.filter((item) => id !== item.id),
	// 	};
	// 	updateLayout((layout) => ({
	// 		...layout,
	// 		info: newLayout,
	// 	}));
	// }
	function addRow() {
		const newLayout = [...layout.info];
		newLayout.push(buildWidgetRow([buildWidget(Widgets.Rain)]));
		updateLayout((layout) => ({
			...layout,
			info: newLayout,
		}));
	}
	// function removeRow(index: number) {
	// 	const newLayout = [...layout.info];
	// 	newLayout.splice(index, 1);
	// 	updateLayout((layout) => ({
	// 		...layout,
	// 		info: newLayout,
	// 	}));
	// }

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
								values={row.widgets}
								onReorder={(order) => updateRow(i, order)}
								className="flex-grow flex gap-3"
							>
								<AnimatePresence>
									{row.widgets.map((item) => (
										<Reorder.Item
											key={item.id}
											layout
											drag
											initial={{ opacity: 0, x: 50 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: 50 }}
											value={item}
											className="w-full"
										>
											{getWidget(item)}
										</Reorder.Item>
									))}
									{row.widgets.length === 0 && (
										<motion.div
											key="empty"
											className="w-full h-[115px] bg-base border border-neutral-400/40 rounded-lg flex items-center justify-center p-1"
											layout
										>
											<button className="h-full w-full rounded-md flex items-center justify-center hover:bg-rose-500/30 gap-3">
												<div className="text-lg text-rose-500">Remove Row</div>{" "}
												<Trash className="h-6 w-6 text-rose-500" />
											</button>
										</motion.div>
									)}
								</AnimatePresence>
							</Reorder.Group>
							{isEdit && (
								<motion.button
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									onClick={() => {
										setIsSelectDialogOpen(true);
										setSelectedRow(row.id);
									}}
									className="px-0.5 flex-shrink-0 h-full rounded-lg  border-indigo-400/30 hover:border-indigo-400/40 border-2 backdrop-blur-lg flex items-center justify-center shadow-lg shadow-transparent hover:shadow-indigo-400/30 active:scale-95 transition duration-500"
								>
									<Plus className="h-8 w-8 text-indigo-300" />
								</motion.button>
							)}
						</div>
					))}
					{isEdit && (
						<button
							className="py-1 w-full rounded-lg  border-indigo-400/30 hover:border-indigo-400/40 border-2 backdrop-blur-lg flex items-center justify-center shadow-lg shadow-transparent hover:shadow-indigo-400/30 active:scale-95 transition duration-500"
							onClick={() => addRow()}
						>
							<Plus className="h-7 w-7 text-indigo-300" />
						</button>
					)}
				</div>
			</div>
			<Dialog
				open={isSelectDialogOpen}
				setOpen={setIsSelectDialogOpen}
				title={<h3 className="text-2xl text-white font-bold">Add a widget</h3>}
			>
				<div className="flex flex-wrap mt-2 z-50">
					{Object.values(Widgets).map((widget) => (
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							key={widget}
							onClick={() => {
								addToRow(selectedRow, Widgets[widget]);
								setIsSelectDialogOpen(false);
							}}
							className="w-1/2 p-2"
						>
							{getWidgetPreview(Widgets[widget])}
						</motion.button>
					))}
				</div>
			</Dialog>
			<Dialog
				open={isReplaceDialogOpen}
				setOpen={setIsReplaceDialogOpen}
				title={
					<h3 className="text-2xl text-white font-bold">Replace widget</h3>
				}
			>
				<div className="flex flex-wrap mt-2 z-50">
					{Object.values(Widgets).map((widget) => (
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							key={widget}
							onClick={() => {
								replaceWidget(selectedWidget, Widgets[widget]);
								setIsReplaceDialogOpen(false);
							}}
							className="w-1/2 p-2"
						>
							{getWidgetPreview(Widgets[widget])}
						</motion.button>
					))}
				</div>
			</Dialog>
		</main>
	);
};

export default Home;
