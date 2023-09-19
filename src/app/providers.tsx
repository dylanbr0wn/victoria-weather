"use client";

import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "../components/Tooltip";
import { Theme } from "@radix-ui/themes";

export function Providers({ children }) {
	return (
		<ThemeProvider attribute="class">
			<Theme
				panelBackground="translucent"
				accentColor="iris"
				grayColor="slate"
				radius="medium"
				scaling="95%"
			>
				{children}
			</Theme>
		</ThemeProvider>
	);
}
