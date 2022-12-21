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

function getWidget(info: WidgetInfo): ReactNode {
	switch (info.type) {
		case Widgets.AQI:
			return <AirQuality />;
		case Widgets.Rain:
			return <Rain />;
		case Widgets.UV:
			return <UVIndex />;
		case Widgets.Sun:
			return <SunMoonCycle />;
		case Widgets.Temp:
			return <Current />;
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

	const [hover, setHover] = useState(false);

	const isPage = layoutType === LayoutType.Page;

	const { springs, bind } = useDragGrid(layout.info, {
		updateLayout,
		enabled: isEdit && !hover,
	});

	const bindHover = useGesture({
		onMouseEnter: () => setHover(true),
		onMouseLeave: () => setHover(false),
	});

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

	return (
		<main className="flex-grow z-10 overflow-hidden">
			<div className={`flex ${isPage ? "flex-col" : "flex-row"} h-full`}>
				<div className="flex-grow px-3">
					<Map />
				</div>
				<div
					className={`flex flex-col ${isEdit ? "w-[560px]" : "w-[500px]"} 
					 `}
				>
					{layout.info.map((row, i) => (
						<animated.div key={i} className="flex h-[120px] w-full gap-3">
							{isEdit && (
								<div className="flex flex-col gap-3 justify-center mb-1">
									<animated.button
										onClick={() => addToRow(i)}
										className="h-12 w-12 bg-green-900/20 rounded-lg opacity-50 transition-all
                    hover:opacity-100 border-green-600 border duration-500 shadow-transparent shadow-lg hover:shadow-green-600/30"
									>
										<PlusSquare className="h-5 w-5 text-green-600 mx-auto" />
									</animated.button>
									<animated.button
										onClick={() => removeRow(i)}
										className="h-12 w-12 bg-rose-900/20 rounded-lg opacity-50 transition-all
                    hover:opacity-100 border-rose-600 border duration-500 shadow-transparent shadow-lg hover:shadow-rose-600/30"
									>
										<Trash className="h-5 w-5 text-rose-600 mx-auto" />
									</animated.button>
								</div>
							)}
							<div className="relative h-[120px]">
								{row.widgets.map((item, j) => {
									const index = getIndexFromRowCol(i, j, layout.info);
									return (
										<animated.div
											{...bind(i, j)}
											style={springs[index]}
											className="h-28 touch-none absolute origin-center"
											key={item.id}
										>
											{getWidget(item)}
											{isEdit && (
												<button
													{...bindHover()}
													onClick={(e) => {
														e.stopPropagation();

														removeFromRow(i, item.id);
													}}
													className="absolute top-2 right-2 opacity-50 p-1 rounded-md  transition-all duration-500 border border-rose-800 hover:opacity-100 shadow-md shadow-transparent hover:shadow-rose-800/50"
												>
													<Trash className="h-4 w-4 text-rose-600" />
												</button>
											)}
										</animated.div>
									);
								})}
							</div>
						</animated.div>
					))}
					<button onClick={() => addRow()}>
						<PlusCircle className="h-5 w-5 text-white" />
					</button>
				</div>
			</div>
		</main>
	);
};

export default Home;
