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

// const defaultDashboardLayout: Layout = {
// 	map: {},
// 	info: [
// 		{
// 			id: cuid(),
// 			widgets: [buildWidget(Widgets.Temp)],
// 		},
// 		{ id: cuid(), widgets: [buildWidget(Widgets.Rain)] },
// 		{ id: cuid(), widgets: [buildWidget(Widgets.UV)] },
// 		{ id: cuid(), widgets: [buildWidget(Widgets.Sun)] },
// 		{ id: cuid(), widgets: [buildWidget(Widgets.AQI)] },
// 	],
// };

const defaultDashboardLayout: Layout = {
	map: {},
	info: [
		buildWidget(Widgets.Temp),
		buildWidget(Widgets.Rain),
		buildWidget(Widgets.UV),
		buildWidget(Widgets.Sun),
		buildWidget(Widgets.AQI),
	],
};

export type Layout = {
	map: {};
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
	editMode: boolean;
	setEditMode: (editMode: boolean | ((editMode: boolean) => boolean)) => void;
	selectedRow: string | null;
	setSelectedRow: (selectedRow: string | null) => void;
	selectedWidget: string | null;
	setSelectedWidget: (selectedWidget: string | null) => void;
	openAddWidget: boolean;
	setOpenAddWidget: (openAddWidget: boolean) => void;
	openChangeWidget: boolean;
	setOpenChangeWidget: (openChangeWidget: boolean) => void;
};

export const useEditStore = create<EditStore>((set, get) => ({
	editMode: false,
	setEditMode: (editMode) => {
		if (typeof editMode === "function") {
			set({ editMode: editMode(get().editMode) });
		} else {
			set({ editMode });
		}
	},
	selectedRow: null,
	setSelectedRow: (selectedRow) => {
		set({ selectedRow });
	},
	selectedWidget: null,
	setSelectedWidget: (selectedWidget) => {
		set({ selectedWidget });
	},
	openAddWidget: false,
	setOpenAddWidget: (openAddWidget) => {
		set({ openAddWidget });
	},
	openChangeWidget: false,
	setOpenChangeWidget: (openChangeWidget) => {
		set({ openChangeWidget });
	},
}));
