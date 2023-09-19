"use client";

import { ReactNode } from "react";
import { Check, LayoutDashboard } from "lucide-react";
import { Dialog } from "./common/Dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { Radio } from "./common/Radio";
import { WidthSlider } from "./common/Slider";
import * as Checkbox from "@radix-ui/react-checkbox";
import {
	buildWidget,
	useEditStore,
	useLayoutStore,
	Widgets,
} from "../utils/zustand";
import AirQuality from "./AirQuality";
import Rain from "./Rain";
import SunMoonCycle from "./SunMoonCycle";
import UVIndex from "./UVIndex";
import MaxMin from "./MaxMin";
import Current from "./Current";

function getWidgetPreview(type: Widgets): ReactNode {
	switch (type) {
		case Widgets.AQI:
			return <AirQuality />;
		case Widgets.Rain:
			return <Rain isPreview />;
		case Widgets.UV:
			return <UVIndex isPreview />;
		case Widgets.Sun:
			return <SunMoonCycle />;
		case Widgets.Temp:
			return <Current isPreview />;
		case Widgets.MaxMin:
			return <MaxMin />;
		default:
			return null;
	}
}

export function ConfigureDialog() {
	const { layout, updateLayout, layoutType } = useLayoutStore();

	const { isConfigureDialogOpen, setIsConfigureDialogOpen } = useEditStore(
		(s) => ({
			isConfigureDialogOpen: s.isConfigureDialogOpen,
			setIsConfigureDialogOpen: s.setIsConfigureDialogOpen,
		})
	);

	function isInLayout(widget: Widgets) {
		return layout.info.some((w) => w.type === widget);
	}

	return (
		<Dialog
			open={isConfigureDialogOpen}
			setOpen={setIsConfigureDialogOpen}
			title="Settings"
		>
			<Tabs.Root defaultValue="layout" className="flex h-[400px]">
				<Tabs.List className="flex flex-col border-r rounded-bl-xl w-32 border-indigo-400/40 dark:bg-base bg-white divide-y">
					<Tabs.Trigger
						value="layout"
						className=" aria-selected:text-lighter flex gap-3 items-center p-3 text-neutral-400 dark:aria-selected:hover:text-neutral-100 dark:hover:text-neutral-100 hover:text-mute aria-selected:hover:text-mute transition-colors"
					>
						<LayoutDashboard className="h-4 w-4" />
						<span className="text-lg font-bold">Layout</span>
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="layout" className="w-full overflow-scroll">
					<div className="flex flex-col gap-3 dark:text-lighter text-base p-3 ">
						<p className="text-sm">Configure your dashboard as you please! </p>
						<div>
							<h3 className="text-lg font-bold ">Map Location</h3>
							<p className="text-sm">
								Which side of the dashboard should the map be?
							</p>
							<Radio
								onChange={(position) =>
									updateLayout((layout) => ({
										...layout,
										map: {
											...layout.map,
											position,
										},
									}))
								}
								value={layout.map.position}
								options={[
									{ label: "Left", value: "left" },
									{ label: "Right", value: "right" },
								]}
							/>
						</div>
						<div className="pb-3">
							<h3 className="text-lg font-bold ">Map Size</h3>
							<p className="text-sm">
								How much of the dashboard should the map take up?
							</p>
							<WidthSlider
								value={layout.map.width}
								handleChange={(width) =>
									updateLayout((layout) => {
										return {
											...layout,
											map: {
												...layout.map,
												width,
											},
										};
									})
								}
							/>
						</div>
						<div>
							<h3 className="text-lg font-bold">Widgets</h3>
							<p className="text-sm">Which widgets should be displayed?</p>

							<ul className="flex flex-wrap gap-3 justify-between">
								{Object.keys(Widgets)
									.filter((v) => isNaN(Number(v)))
									.map((item) => (
										<li className="w-2/5 h-[115px]" key={item}>
											<Checkbox.Root
												checked={isInLayout(Widgets[item])}
												onCheckedChange={(checked) => {
													if (checked) {
														updateLayout((layout) => ({
															...layout,
															info: [
																...layout.info,
																buildWidget(Widgets[item]),
															],
														}));
													} else {
														updateLayout((layout) => ({
															...layout,
															info: layout.info.filter(
																(widget) => widget.type !== Widgets[item]
															),
														}));
													}
												}}
												className="w-full relative"
											>
												<Checkbox.Indicator className="absolute top-0 left-0 w-full h-full border-4 border-indigo-400 rounded-lg z-50">
													<div className="absolute top-0 left-0 p-1 bg-indigo-400 rounded-br-xl">
														<Check className="h-6 w-6 text-base" />
													</div>
												</Checkbox.Indicator>
												<span className="pointer-events-none">
													{getWidgetPreview(Widgets[item])}
												</span>
											</Checkbox.Root>
										</li>
									))}
							</ul>
						</div>
					</div>
				</Tabs.Content>
			</Tabs.Root>
		</Dialog>
	);
}
