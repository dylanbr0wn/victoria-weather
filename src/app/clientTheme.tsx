"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function ClientTheme({ children }: { children: ReactNode }) {
	return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
