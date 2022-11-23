import { DashProp } from "../utils/types";

const Footer = ({ dash = false }: DashProp) => {
	return (
		<footer
			className={`flex flex-shrink-0 z-10 items-center justify-center w-full h-10  text-gray-500`}
		>
			<div className="text-gray-500">
				Made by{" "}
				<a
					className="inline-block hover:underline font-black text-pink-600"
					href="https://dylanbrown.space"
					rel="noopener noreferrer"
					target="_blank"
				>
					Dylan Brown
				</a>{" "}
				using{" "}
				<a
					className="inline-block hover:underline font-black text-green-800"
					rel="noopener noreferrer"
					target="_blank"
					href="https://www.victoriaweather.ca/"
				>
					victoriaweather.ca
				</a>{" "}
				with forecast data from{" "}
				<a
					className="inline-block hover:underline font-black text-sky-800"
					rel="noopener noreferrer"
					target="_blank"
					href="https://www.weatherapi.com/"
				>
					weather api
				</a>
			</div>
		</footer>
	);
};
export default Footer;
