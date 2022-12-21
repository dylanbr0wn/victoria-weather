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
	map: {},
	info: [
		{
			id: cuid(),
			widgets: [buildWidget(Widgets.Temp)],
		},
		{ id: cuid(), widgets: [buildWidget(Widgets.Rain)] },
		{ id: cuid(), widgets: [buildWidget(Widgets.UV)] },
		{ id: cuid(), widgets: [buildWidget(Widgets.Sun)] },
		{ id: cuid(), widgets: [buildWidget(Widgets.AQI)] },
	],
};

export type Layout = {
	map: {};
	info: WidgetRow[];
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
	setEditMode: (editMode: boolean) => void;
};

export const useEditStore = create<EditStore>((set) => ({
	editMode: false,
	setEditMode: (editMode: boolean) => set({ editMode }),
}));
