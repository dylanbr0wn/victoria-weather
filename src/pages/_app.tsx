import "../styles/index.scss";
import "../styles/App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Provider as TooltipProvider } from "@radix-ui/react-tooltip";
export { reportWebVitals } from "next-axiom";
import { Analytics } from "@vercel/analytics/react";
import CommandMenu from "../components/CommandDialog";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<TooltipProvider>
				<Component {...pageProps} />
			</TooltipProvider>
			<CommandMenu />
			<Analytics />
		</>
	);
}

export default MyApp;
