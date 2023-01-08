import "../styles/index.scss";
import "../styles/App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Provider as TooltipProvider } from "@radix-ui/react-tooltip";
export { reportWebVitals } from "next-axiom";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider attribute="class">
			<TooltipProvider>
				<Component {...pageProps} />
			</TooltipProvider>
			<Analytics />
		</ThemeProvider>
	);
}

export default MyApp;
