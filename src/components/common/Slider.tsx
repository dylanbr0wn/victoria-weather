import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";
import { useLayoutStore } from "../../utils/zustand";

type SliderProps = {
	handleChange: (value: number) => void;
	value: number;
};

export function WidthSlider({ handleChange, value }: SliderProps) {
	const { updateLayout, layout } = useLayoutStore((s) => ({
		updateLayout: s.updateLayout,
		layout: s.layout,
	}));

	return (
		<Slider.Root
			max={80}
			min={50}
			step={1}
			value={[layout.map.width]}
			onValueChange={(value) =>
				updateLayout((layout) => ({
					...layout,
					map: {
						...layout.map,
						width: value[0],
					},
				}))
			}
			className="select-none touch-none flex items-center w-full relative mt-3 py-2"
		>
			<Slider.Track className="relative flex-grow rounded-full bg-white/30 w-full h-1.5">
				<Slider.Range className="absolute bg-white rounded-full h-full" />
			</Slider.Track>
			<Slider.Thumb className="block h-6 w-6 bg-white shadow rounded-full relative active:shadow-md active:shadow-indigo-400 transition-shadow">
				<div className="absolute top-full left-1/2 -translate-x-1/2 text-sm ">
					{layout.map.width}%
				</div>
			</Slider.Thumb>
		</Slider.Root>
	);
}
