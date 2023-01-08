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
					<div className="dark:bg-black/50 bg-white/50 py-1 px-2 border rounded-lg backdrop-blur-lg dark:text-white border-indigo-400/40">
						{content}
					</div>

					{/* <RTooltip.Arrow className="text-neutral-800 z-50 bg-transparent fill-current backdrop-blur" /> */}
				</RTooltip.Content>
			</RTooltip.Portal>
		</RTooltip.Root>
	);
}
