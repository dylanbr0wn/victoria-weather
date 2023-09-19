import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../components/Home";

export default function MainPage() {
	return (
		<div className="h-screen min-h-[800px] flex flex-col relative dark:bg-black bg-white transition-colors">
			<Header />
			<Home />
			<Footer />
			<div className="absolute w-full h-full top-0 left-0 bg-glow opacity-40  pointer-events-none"></div>
		</div>
	);
}
