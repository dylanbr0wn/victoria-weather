import { ReactNode } from "react";
import { useEditStore } from "../utils/zustand";

type EdittingWrapperProps = {
	children: ReactNode;
	alternate?: ReactNode;
};

export function EdittingWrapper({ children, alternate }: EdittingWrapperProps) {
	const { isEdit } = useEditStore((s) => ({
		isEdit: s.editMode,
	}));

	if (isEdit) return <>{alternate}</>;

	return <>{children}</>;
}
