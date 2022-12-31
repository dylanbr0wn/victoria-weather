import { GripVertical } from "lucide-react";
import { PointerEventHandler, ReactNode } from "react";

type EdittingWrapperProps = {
	children: ReactNode;
	onPointerDown: PointerEventHandler<HTMLButtonElement>;
	isPreview?: boolean;
};

export function EdittingWrapper({
	children,
	isPreview,
	onPointerDown,
}: EdittingWrapperProps) {
	return (
		<div className="relative ">
			{children}
			{!isPreview && (
				<button
					onPointerDown={onPointerDown}
					className="absolute rounded-md opacity-100 transition-all flex items-center justify-center group/butto z-10 top-2 right-2 p-2 cursor-move group"
				>
					<GripVertical className="text-neutral-400 group-hover:text-neutral-100 h-5 w-5  group-hover/button:scale-105 transition-all group-active/button:scale-95 duration-500" />
				</button>
			)}
		</div>
	);
}
