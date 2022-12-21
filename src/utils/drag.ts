import { config, useSprings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useRef } from "react";
import { Layout, WidgetRow } from "./zustand";

function getRowColFromIndex(
	index: number,
	layout: WidgetRow[]
): [number, number] {
	let row = 0;
	let col = 0;
	let curIndex = 0;
	let found = false;
	for (let i = 0; i < layout.length; i++) {
		for (let j = 0; j < layout[i].widgets.length; j++) {
			if (curIndex === index) {
				row = i;
				col = j;
				found = true;
				break;
			}
			curIndex++;
		}
		if (found) break;
	}
	return [row, col];
}

export function getIndexFromRowCol(
	row: number,
	col: number,
	layout: WidgetRow[]
): number {
	let index = 0;
	for (let i = 0; i < row; i++) {
		index += layout[i].widgets.length;
	}
	index += col;
	return index;
}

function getRowColFromId(id: string, layout: WidgetRow[]): [number, number] {
	let row = 0;
	let col = 0;
	let found = false;
	for (let i = 0; i < layout.length; i++) {
		for (let j = 0; j < layout[i].widgets.length; j++) {
			if (layout[i].widgets[j].id === id) {
				row = i;
				col = j;
				found = true;
				break;
			}
		}
		if (found) break;
	}
	return [row, col];
}

const update =
	(
		newGrid: WidgetRow[],
		oldGrid: WidgetRow[],
		immediate = false,
		active = false,
		originalIndex = -1,
		x = 0,
		y = 0
	) =>
	(index: number) => {
		const [ogRow, ogCol] = getRowColFromIndex(index, oldGrid);

		const item = oldGrid[ogRow].widgets[ogCol];
		const [compRow, compCol] = getRowColFromId(item.id, newGrid);

		const newRowWidth = newGrid[compRow].widgets.length;
		const itemWidth = (500 - newRowWidth * 8) / newRowWidth;

		const ogItemSpacing = 500 / oldGrid[ogRow].widgets.length;
		const itemSpacing = 500 / newRowWidth;

		const xAdjustment = (ogItemSpacing - itemSpacing) / 2;

		return active && index === originalIndex
			? {
					y: y,
					x: ogCol * ogItemSpacing + x + xAdjustment,
					scale: 1.1,
					zIndex: 1000,
					shadow: 15,
					width: itemWidth,
					// opacity: 1,
					immediate: (key: string) => key === "zIndex",
					config: (key: string) =>
						key === "y" ? config.stiff : config.default,
			  }
			: {
					y: 0,
					x: compCol * itemSpacing,
					scale: 1,
					width: itemWidth,
					zIndex: 0,
					// opacity: curRow === order.indexOf(index) ? 0.5 : 1,
					shadow: 1,
					immediate,
			  };
	};

function getNumItems(grid: WidgetRow[]) {
	return grid.reduce((acc, row) => acc + row.widgets.length, 0);
}

function clamp(num: number, min: number, max: number) {
	return Math.min(Math.max(num, min), max);
}

function calcNewRowCol(
	layout: WidgetRow[],
	y: number,
	x: number,
	rowIndex: number,
	colIndex: number
): [number, number] {
	const oldRowItemWidth = 500 / layout[rowIndex].widgets.length;

	const newRow = clamp(
		Math.floor((rowIndex * 116 + 116 / 2 + y) / 116),
		0,
		layout.length - 1
	);

	const newRowItemWidth =
		newRow !== rowIndex
			? 500 / (layout[newRow].widgets.length + 1)
			: 500 / layout[newRow].widgets.length;

	const newCol = clamp(
		Math.floor(
			(colIndex * oldRowItemWidth + oldRowItemWidth / 2 + x) / newRowItemWidth
		),
		0,
		layout[newRow].widgets.length
	);

	return [newRow, newCol];
}

function moveItemInGrid(
	grid: WidgetRow[],
	row: number,
	col: number,
	newRow: number,
	newCol: number
) {
	const newGrid = grid.map((row) => ({
		...row,
		widgets: [...row.widgets],
	}));
	const item = newGrid[row].widgets[col];
	newGrid[row].widgets.splice(col, 1);
	newGrid[newRow].widgets.splice(newCol, 0, item);
	console.log(newGrid);
	return newGrid;
}

type useDragGridConfig = {
	updateLayout: (fn: (layout: Layout) => Layout) => void;
	enabled?: boolean;
};

export function useDragGrid(
	layout: WidgetRow[],
	{ updateLayout, enabled = true }: useDragGridConfig
) {
	const [springs, api] = useSprings(
		getNumItems(layout),
		update(layout, layout, true),
		[layout]
	);

	// Set the drag hook and define component movement based on gesture data
	const bind = useDrag(
		({ args: [rowIndex, colIndex], active, movement: [x, y] }) => {
			// want to calc center of the item
			if (!enabled) return;

			const [newRow, newCol] = calcNewRowCol(layout, y, x, rowIndex, colIndex);

			let newGrid = layout;
			if (newRow !== rowIndex || newCol !== colIndex) {
				newGrid = moveItemInGrid(layout, rowIndex, colIndex, newRow, newCol);
				// console.log(layout, newGrid, rowIndex, colIndex, newRow, newCol);
			}
			const originalIndex = getIndexFromRowCol(rowIndex, colIndex, layout);

			api.start(update(newGrid, layout, false, active, originalIndex, x, y)); // Feed springs new style data, they'll animate the view without causing a single render

			if (!active) {
				updateLayout((layout) => ({
					...layout,
					info: newGrid,
				}));
			}
		}
	);

	return { springs, bind };
}
