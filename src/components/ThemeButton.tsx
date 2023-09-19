"use client";

import { useTheme } from "next-themes";
import { IconButton } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function ThemeButton() {
	const { resolvedTheme, setTheme } = useTheme();
	return (
		<IconButton
			onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
			variant="outline"
			size="3"
		>
			{resolvedTheme === "dark" ? (
				<MoonIcon height={20} width={20} />
			) : (
				<SunIcon height={20} width={20} />
			)}
		</IconButton>
	);
}
