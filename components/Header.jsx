import Head from "next/head";
import Script from "next/script";

const Header = () => {
	return (
		<div className="h-16  bg-gray-900 flex-shrink-0">
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta
					name="description"
					content="The ever changing weather of Victoria, BC"
				/>
				<title>Victoria Weather</title>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<meta name="title" content="Victoria Weather" />
				<meta
					name="description"
					content="The ever changing weather of Victoria, BC"
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content="https://victoria-weather.vercel.app/"
				/>
				<meta property="og:title" content="Victoria Weather" />
				<meta
					property="og:description"
					content="The ever changing weather of Victoria, BC"
				/>
				<meta property="og:image" content="/preview.png" />

				<meta property="twitter:card" content="summary_large_image" />
				<meta
					property="twitter:url"
					content="https://victoria-weather.vercel.app/"
				/>
				<meta property="twitter:title" content="Victoria Weather" />
				<meta
					property="twitter:description"
					content="The ever changing weather of Victoria, BC"
				/>
				<meta property="twitter:image" content="/preview.png" />
				<meta name="theme-color" content="#0f172a" />
				<link rel="manifest" href="/site.webmanifest"></link>
				<Script src="https://www.purpleair.com/pa.widget.js?key=C2U767EE68URYRKH&module=AQI&conversion=C0&average=10&layer=standard&container=PurpleAirWidget_108012_module_AQI_conversion_C0_average_10_layer_standard"></Script>
				{/* <link
					href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
					rel="stylesheet"
				></link> */}
			</Head>
			<div className=" max-w-3xl mx-auto text-white flex pb-2 pt-4">
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
				{/* <div className="flex-grow"></div>
                <a
                    href="https://github.com/dylanbr0wn/victoria-weather"
                    target={"_blank"}
                    className=""
                >
                    <div className="py-3 px-4 text-sky-500 font-black rounded-md hover:bg-gray-800 transition-colors">
                        GitHub
                    </div>
                </a> */}
			</div>
		</div>
	);
};
export default Header;
