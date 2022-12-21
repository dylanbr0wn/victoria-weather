import { Menu, Move, MoveHorizontal, Trash } from "lucide-react";
import { ReactNode } from "react";
import { useEditStore, useLayoutStore } from "../utils/zustand";

type EdittingWrapperProps = {
	children: ReactNode;
	alternate?: ReactNode;
	id: string;
};

export function EdittingWrapper({
	children,
	alternate,
	id,
}: EdittingWrapperProps) {
	const { isEdit } = useEditStore((s) => ({
		isEdit: s.editMode,
	}));
	const { updateLayout } = useLayoutStore((s) => ({
		updateLayout: s.updateLayout,
	}));

	function removeWidget() {
		updateLayout((layout) => {
			const newLayout = layout.info
				.map((row) => {
					return {
						...row,
						widgets: row.widgets.filter((w) => w.id !== id),
					};
				})
				.filter((row) => row.widgets.length > 0);
			return {
				...layout,
				info: newLayout,
			};
		});
	}

	if (isEdit)
		return (
			<div className="relative group">
				{alternate}
				<div className="absolute top-0 left-0 w-full h-full flex-row flex p-1 gap-1 hover:opacity-100 opacity-0">
					<button className="h-full w-full peer bg-white/30 backdrop-blur-xl rounded-md opacity-0 group-hover:opacity-100 group-hover:active:opacity-30 transition-all flex items-center justify-center group/button hover:bg-white/50 group-hover:active:cursor-move">
						<MoveHorizontal className="text-base h-7 w-7  group-hover/button:scale-105 transition-all group-active/button:scale-95" />
					</button>

					<button className="h-full w-full peer-active:opacity-0  bg-white/30 backdrop-blur-xl rounded-md opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center group/button hover:bg-white/50 ">
						<Menu className="text-base h-7 w-7  group-hover/button:scale-105 transition-all group-active/button:scale-95" />
					</button>
					<button
						onClick={removeWidget}
						className="h-full w-full bg-white/30 peer-active:opacity-0 backdrop-blur-xl rounded-lg opacity-0 transition-all flex items-center justify-center group/button hover:bg-white/50 group-hover:opacity-100 order-first"
					>
						<Trash className="text-rose-900 h-7 w-7 group-hover/button:scale-105 transition-all group-active/button:scale-95" />
					</button>
				</div>
			</div>
		);

	return <>{children}</>;
}
