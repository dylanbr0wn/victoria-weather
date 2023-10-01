import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../components/Home";
import { getMapData } from "../utils/mapData";
import { getPointsData } from "../utils/pointsData";
import { getRainData } from "../utils/rainData";
import { getWeatherData } from "../utils/weatherData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MainPage() {
	const { intersection, island } = await getMapData();
	const points = await getPointsData();
	const rain = await getRainData();
	const weather = await getWeatherData();

	return (
		<div
			id="page-root"
			className="min-h-screen flex flex-col relative dark:bg-slate-950 bg-white transition-colors"
		>
			<Header points={points!} />
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
