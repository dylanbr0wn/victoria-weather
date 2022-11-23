/* eslint-disable @next/next/no-img-element */
import { Github, Search, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
	return (
		<div className="h-16 z-10 flex-shrink-0 w-full">
			<div className="w-full px-10 mx-auto text-white flex py-2 justify-between items-center h-full">
				{/* <div className="py-3 text-4xl inline-block"></div> */}
				<div className="py-1 px-2 inline-block ">
					<Link href="/" className="block">
						<Image
							width={500}
							height={72}
							className="h-8 w-auto"
							src="/500w/weather_logo500.png"
							alt="victoria weather"
						/>
					</Link>
				</div>
				<div className="py-1 px-2 flex gap-6 items-center">
					<button className="flex gap-2 border border-indigo-400 border-opacity-20 rounded-lg px-2 py-1 h-10 items-center hover:border-opacity-30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-indigo-700/10">
						<p className="opacity-40 text-sm font-semibold text-indigo-200">
							Search Stations...
						</p>

						<kbd className="py-0.5 px-1 rounded bg-neutral-400/10 text-xs font-bold">
							CMD + K
						</kbd>
						{/* <input className="bg-transparent focus-visible:outline-none px-2" /> */}
						<Search className="h-5 w-5 text-white opacity-70" />
					</button>
					{/* <Tooltip content={<span className="text-sm">Light Mode</span>}> */}
					<button>
						<Sun className="h-6 w-auto text-white opacity-70 hover:opacity-90 transition-opacity duration-500" />
					</button>
					{/* </Tooltip> */}

					{/* <Tooltip content={<span className="text-sm">GitHub</span>}> */}
					<a
						href="https://github.com/dylanbr0wn/victoria-weather"
						target="_blank"
						rel="noreferrer"
					>
						<Github className="h-6 w-auto text-white opacity-70 hover:opacity-90 transition-opacity duration-500" />
					</a>
					{/* </Tooltip> */}
				</div>
			</div>
		</div>
	);
};
export default Header;
