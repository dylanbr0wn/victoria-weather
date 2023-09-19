"use client";

import { ReactNode } from "react";
import * as RTooltip from "@radix-ui/react-tooltip";

type PointToolTipProps = {
	content: ReactNode;
	children: ReactNode;
};

export default function Tooltip({ children, content }: PointToolTipProps) {
	return (
		<RTooltip.Root delayDuration={0}>
			<RTooltip.Trigger asChild>{children}</RTooltip.Trigger>
			<RTooltip.Portal>
				<RTooltip.Content className=" z-50" sideOffset={5}>
					<div className="rounded-lg border border-indigo-400/40 bg-white/50 px-2 py-1 backdrop-blur-lg dark:bg-black/50 dark:text-white">
						{content}
					</div>

					{/* <RTooltip.Arrow className="text-neutral-800 z-50 bg-transparent fill-current backdrop-blur" /> */}
				</RTooltip.Content>
			</RTooltip.Portal>
		</RTooltip.Root>
	);
}

export const TooltipProvider = RTooltip.TooltipProvider;
