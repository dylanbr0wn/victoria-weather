import Map from "../components/Map2";
import Search from "../components/Search";
import Rain from "../components/Rain";
import MaxMin from "../components/MaxMin";
import AirQuality from "../components/AirQuality";
import Summary from "../components/Summary";
import UVIndex from "../components/UVIndex";
import { AnimatePresence } from "framer-motion";
import SunMoonCycle from "../components/SunMoonCycle";
import ErrorBoundary from "../components/ErrorBoundary";
import Current from "./Current";

const Home = () => {
	return (
		<main className="flex-grow flex z-10 overflow-hidden">
			<div className="pl-2 pr-1 h-full w-2/3 ">
				<Map />
			</div>
			<div className="flex flex-col w-1/3 pl-1 pr-2 gap-2">
				<div className="relative  w-full md:max-w-3xl mx-auto">
					{/* <div className="text-xl w-full border-b py-2 border-slate-700 text-slate-400 font-black px-2">
						Weather and Forecast
					</div> */}
					<AnimatePresence>
						<ErrorBoundary>
							<div className="rounded-lg border-indigo-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-indigo-700/10">
								<Current dash={false} />
								<div>
									<MaxMin key={"maxmin"} />
								</div>
							</div>

							{/* <Summary key={"summary"} /> */}
						</ErrorBoundary>
					</AnimatePresence>
				</div>

				{/* <div className="flex flex-col md:max-w-3xl md:flex-row w-full mx-auto">
					<AnimatePresence>
						<ErrorBoundary>
							<Rain key={"rain"} />
						</ErrorBoundary>
					</AnimatePresence>
				</div> */}

				<div className="flex flex-col w-full md:max-w-3xl mx-auto">
					<div className="flex flex-col gap-2">
						<AnimatePresence>
							<ErrorBoundary>
								<div className="rounded-lg border-sky-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-sky-700/10">
									<Rain key={"rain"} />
								</div>
							</ErrorBoundary>
						</AnimatePresence>
						<AnimatePresence>
							<ErrorBoundary>
								<div className="rounded-lg border-amber-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-amber-700/10">
									<UVIndex key={"uv"} />
								</div>
							</ErrorBoundary>
						</AnimatePresence>

						<AnimatePresence>
							<ErrorBoundary>
								<div className="rounded-lg border-emerald-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-emerald-700/10">
									<AirQuality key={"aqi"} />
								</div>
							</ErrorBoundary>
						</AnimatePresence>
						<AnimatePresence>
							<ErrorBoundary>
								<div className="rounded-lg border-pink-400 border border-opacity-20 hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-pink-700/10">
									<SunMoonCycle key={"sunmoon"} />
								</div>
							</ErrorBoundary>
						</AnimatePresence>
					</div>
				</div>

				{/* <div className="relative  w-full md:max-w-3xl mx-auto">
					<div className="  flex-shrink-0 py-10">
						<div className="flex w-full max-w-3xl mx-auto">
							<ErrorBoundary>
								<Search />
							</ErrorBoundary>
						</div>
					</div>
				</div> */}
			</div>
		</main>
	);
};

export default Home;
