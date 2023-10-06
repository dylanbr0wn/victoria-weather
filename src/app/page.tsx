import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../components/Home";
import { getMapData } from "../utils/mapData";
import { getPointsData } from "../utils/pointsData";
import { getRainData } from "../utils/rainData";
import { getWeatherData } from "../utils/weatherData";

export const dynamic = "auto";
export const revalidate = 60;

export default async function MainPage() {
	const [{ intersection, island }, points, rain, weather] = await Promise.all([
		getMapData(),
		getPointsData(),
		getRainData(),
		getWeatherData(),
	]);

	return (
		<div
			id="page-root"
			className="relative flex min-h-screen flex-col bg-white transition-colors dark:bg-slate-950"
		>
			<Header />
			<Home
				intersection={intersection}
				island={island}
				points={points!}
				rain={rain!}
				weather={weather}
			/>
			<Footer />
			{/* <div className="absolute w-full h-full top-0 left-0 bg-glow opacity-40  pointer-events-none"></div> */}
		</div>
	);
}
