import "./App.css";
import Map from "./components/Map2";
import Footer from "./components/Footer";

function App() {
    return (
        <div className=" min-h-screen w-screen flex flex-col">
            <main className="flex-grow flex flex-col">
                <div className="h-16 w-screen bg-gray-900 flex-shrink-0">
                    <div className=" max-w-3xl mx-auto text-white flex p-2">
                        {/* <div className="py-3 text-4xl inline-block"></div> */}
                        <div className="py-1 px-2 inline-block rounded-md hover:bg-gray-800 transition-colors">
                            <a href="/" className="block">
                                <img
                                    style={{ width: 275 }}
                                    src="/500w/weather_logo500.png"
                                    alt="victoria weather"
                                ></img>
                            </a>
                        </div>
                    </div>
                </div>
                <div style={{ height: 600 }} className="flex-grow w-screen">
                    <Map />
                </div>
                <div
                    style={{ height: 600 }}
                    className="w-screen bg-gray-900 flex-shrink-0"
                ></div>
            </main>

            <Footer />
        </div>
    );
}

export default App;
