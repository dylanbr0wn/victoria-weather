import { Menu, MoveHorizontal, Trash } from "lucide-react";
import { ReactNode } from "react";
import { useEditStore, useLayoutStore } from "../utils/zustand";

type EdittingWrapperProps = {
	children: ReactNode;
	alternate?: ReactNode;
	id: string;
	isPreview?: boolean;
};

export function EdittingWrapper({
	children,
	id,
	isPreview,
}: EdittingWrapperProps) {
	const { isEdit, setSelectedWidget, setIsChangeDialogOpen } = useEditStore(
		(s) => ({
			isEdit: s.editMode,
			setSelectedWidget: s.setSelectedWidget,
			setIsChangeDialogOpen: s.setOpenChangeWidget,
		})
	);
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

	if (isEdit && !isPreview)
		return (
			<div className="relative group">
				{children}
				<div className="absolute top-0 left-0 w-full h-full flex-row flex p-1 gap-1 hover:opacity-100 opacity-0">
					<button className="h-full w-full peer bg-white/10 backdrop-blur-xl rounded-md opacity-0 group-hover:opacity-100 group-hover:active:opacity-30 transition-all flex items-center justify-center group/button hover:bg-white/30 group-hover:active:cursor-move">
						<MoveHorizontal className="text-white h-7 w-7  group-hover/button:scale-105 transition-all group-active/button:scale-95" />
					</button>

					<button
						onClick={() => {
							setSelectedWidget(id);
							setIsChangeDialogOpen(true);
						}}
						className="h-full w-full peer-active:opacity-0  bg-white/10 backdrop-blur-xl rounded-md opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center group/button hover:bg-white/30 "
					>
						<Menu className="text-white h-7 w-7  group-hover/button:scale-105 transition-all group-active/button:scale-95" />
					</button>
					<button
						onClick={removeWidget}
						className="h-full w-full bg-white/10 peer-active:opacity-0 backdrop-blur-xl rounded-lg opacity-0 transition-all flex items-center justify-center group/button hover:bg-white/30 group-hover:opacity-100 order-first"
					>
						<Trash className="text-rose-600 h-7 w-7 group-hover/button:scale-105 transition-all group-active/button:scale-95" />
					</button>
				</div>
			</div>
		);

	return <>{children}</>;
}
