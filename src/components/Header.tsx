/* eslint-disable @next/next/no-img-element */
import { Cog, Edit, Github, Pencil, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEditStore } from "../utils/zustand";
import CommandMenu from "./CommandDialog";

const Header = () => {
	const { setEditMode } = useEditStore((store) => ({
		setEditMode: store.setEditMode,
	}));

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
					<CommandMenu />

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
					<button onClick={() => setEditMode(true)}>
						<Cog className="h-5 w-auto text-white opacity-70 hover:opacity-90 transition-all duration-500 hover:rotate-45 " />
					</button>
				</div>
			</div>
		</div>
	);
};
export default Header;
