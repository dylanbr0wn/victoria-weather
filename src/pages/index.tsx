import dynamic from "next/dynamic";
import Footer from "../components/Footer";
import Header from "../components/Header";
const Home = dynamic(() => import("../components/Home"), {
	ssr: false,
});

function App() {
	return (
		<div className=" min-h-screen w-screen flex flex-col relative bg-black">
			<Header />
			<Home />
			<Footer />
			<div className="absolute w-full h-full top-0 left-0 bg-glow opacity-50 pointer-events-none"></div>
		</div>
	);
}

export default App;
