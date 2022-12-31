import cuid from "cuid";
import create from "zustand";
import { persist } from "zustand/middleware";

export enum LayoutType {
	DashBoard,
	Page,
}

export enum Widgets {
	Sun,
	UV,
	AQI,
	Rain,
	Temp,
}

export type WidgetRow = {
	id: string;
	widgets: WidgetInfo[];
};

export function buildRow(): WidgetRow {
	return {
		id: cuid(),
		widgets: [],
	};
}

const defaultDashboardLayout: Layout = {
	map: {
		position: "left",
		width: 66,
	},
	info: [
		buildWidget(Widgets.Temp),
		buildWidget(Widgets.Rain),
		buildWidget(Widgets.UV),
		buildWidget(Widgets.Sun),
		buildWidget(Widgets.AQI),
	],
};

export type Layout = {
	map: { position: "left" | "right"; width: number };
	info: WidgetInfo[];
};

export type WidgetInfo = { type: Widgets; w: number; h: number; id: string };

type LayoutStore = {
	layoutType: LayoutType;
	layout: Layout;
	updateLayout: (update: (layout: Layout) => Layout) => void;
};

export function buildWidget(
	type: Widgets = Widgets.Temp,
	w = 1,
	h = 1
): WidgetInfo {
	return { type, w, h, id: cuid() };
}

export function buildWidgetRow(widgets: WidgetInfo[]): WidgetRow {
	return { id: cuid(), widgets };
}

export const useLayoutStore = create<LayoutStore>()(
	persist((set, get) => ({
		layoutType: LayoutType.DashBoard,
		layout: defaultDashboardLayout,
		updateLayout: (update: (layout: Layout) => Layout) => {
			set({ layout: update(get().layout) });
		},
	}))
);

type EditStore = {
	isConfigureDialogOpen: boolean;
	setIsConfigureDialogOpen: (isConfigureDialogOpen: boolean) => void;
};

export const useEditStore = create<EditStore>((set, get) => ({
	isConfigureDialogOpen: false,
	setIsConfigureDialogOpen: (isConfigureDialogOpen: boolean) => {
		set({ isConfigureDialogOpen });
	},
}));

type MapStore = {
	hoveredMarker: string | null;
	setHoveredMarker: (hoveredMarker: string | null) => void;
};

export const useMapStore = create<MapStore>((set) => ({
	hoveredMarker: null,
	setHoveredMarker: (hoveredMarker: string | null) => {
		set({ hoveredMarker });
	},
}));
