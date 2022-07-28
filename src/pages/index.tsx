import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map2"), { ssr: false });
import Footer from "../components/Footer";
import Rain from "../components/Rain";
import MaxMin from "../components/MaxMin";
import AirQuality from "../components/AirQuality";
import Search from "../components/Search";
import Header from "../components/Header";
import Summary from "../components/Summary";
import UVIndex from "../components/UVIndex";
import { AnimatePresence } from "framer-motion";
import SunMoonCycle from "../components/SunMoonCycle";

function App() {
	return (
		<div className=" min-h-screen w-screen flex flex-col bg-gray-900">
			<Header />
			<main className="flex-grow flex flex-col">
				<div className="flex flex-col">
					<div className=" h-[600px] p-4 bg-gray-900 w-full md:max-w-6xl mx-auto">
						<AnimatePresence>
							<Map />
						</AnimatePresence>
					</div>
				</div>
				<div className="relative  w-full md:max-w-3xl mx-auto">
					<div className="text-xl w-full border-b py-2 border-slate-700 text-slate-400 font-black px-2">
						Weather and Forecast
					</div>
					<AnimatePresence>
						<Summary key={"summary"} />
					</AnimatePresence>
				</div>

				<div className="flex flex-col md:max-w-3xl md:flex-row w-full mx-auto">
					<AnimatePresence>
						<Rain key={"rain"} />
					</AnimatePresence>
					<AnimatePresence>
						<MaxMin key={"maxmin"} />
					</AnimatePresence>
				</div>

				<div className="flex flex-col w-full md:max-w-3xl mx-auto">
					<div className="text-xl w-full border-b py-2 border-slate-700 text-slate-400 font-black px-2">
						Health
					</div>
					<div className="flex flex-col md:flex-row w-full">
						<AnimatePresence>
							<UVIndex key={"uv"} />
						</AnimatePresence>

						<AnimatePresence>
							<AirQuality key={"aqi"} />
						</AnimatePresence>
					</div>
				</div>
				<div className="flex"></div>
				<div className="relative  w-full md:max-w-3xl mx-auto">
					<div className="text-xl w-full border-b py-2 border-slate-700 text-slate-400 font-black px-2">
						Sunrise/Sunset
					</div>
					<AnimatePresence>
						<SunMoonCycle key={"sunmoon"} />
					</AnimatePresence>
				</div>
				<div className="relative  w-full md:max-w-3xl mx-auto">
					<div className="text-xl w-full border-b py-2 border-slate-700 text-slate-400 font-black px-2">
						Explore
					</div>
					<div className=" bg-gray-900 flex-shrink-0 py-10">
						<div className="flex w-full max-w-3xl mx-auto">
							<Search />
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}

export default App;
