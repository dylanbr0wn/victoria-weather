import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
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
				<meta
					property="og:image"
					content="https://victoria-weather.vercel.app/preview.png"
				/>

				<meta property="twitter:card" content="summary_large_image" />
				<meta
					property="twitter:url"
					content="https://victoria-weather.vercel.app/"
				/>
				<meta property="twitter:title" content="Victoria Weather" />
				<meta property="twitter:creator" content="@notadyl" />
				<meta
					property="twitter:description"
					content="The ever changing weather of Victoria, BC"
				/>
				<meta
					property="twitter:image"
					content="https://victoria-weather.vercel.app/preview.png"
				/>
				<meta name="theme-color" content="#0f172a" />
				<link rel="manifest" href="/site.webmanifest"></link>
				<link
					href="https://fonts.cdnfonts.com/css/aileron?styles=20898,20896,20899,20891,20893"
					rel="stylesheet"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
