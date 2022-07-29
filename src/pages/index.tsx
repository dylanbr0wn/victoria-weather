import dynamic from "next/dynamic";
import Footer from "../components/Footer";
import Header from "../components/Header";
const Home = dynamic(() => import("../components/Home"), {
	ssr: false,
});

function App() {
	return (
		<div className=" min-h-screen w-screen flex flex-col bg-gray-900">
			<Header />
			<Home />
			<Footer />
		</div>
	);
}

export default App;
