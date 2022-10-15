import "../styles/index.css";
import "../styles/App.css";
import "mapbox-gl/dist/mapbox-gl.css";
export { reportWebVitals } from "next-axiom";

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
