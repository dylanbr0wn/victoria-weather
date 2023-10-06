import "mapbox-gl/dist/mapbox-gl.css";
import "@radix-ui/themes/styles.css";
import "../styles/index.scss";

import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import { Theme } from "@radix-ui/themes";
import ClientTheme from "./clientTheme";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Victoria Weather",
	description: "The ever changing weather of Victoria, BC",
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#0e101f" },
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
	],
};

const mona = localFont({
	src: "./../../public/Mona-Sans.woff2",
	display: "swap",
	variable: "--font-mona-sans",
});

const hubot = localFont({
	src: "./../../public/Hubot-Sans.woff2",
	display: "swap",
	variable: "--font-hubot-sans",
});

export default function Layout({ children }) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${mona.variable} ${hubot.variable}`}
		>
			<body>
				<ClientTheme>
					<Theme
						panelBackground="translucent"
						accentColor="iris"
						grayColor="slate"
						radius="medium"
						scaling="95%"
					>
						{children}
					</Theme>
				</ClientTheme>
			</body>
			<Analytics />
		</html>
	);
}
