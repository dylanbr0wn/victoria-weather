/* eslint-disable @next/next/no-img-element */
import { GitHubLogoIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
	Button,
	Flex,
	Popover,
	TextField,
	Box,
	IconButton,
} from "@radix-ui/themes";
import { Cog, Github, Sun } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
// import { useEditStore } from "../utils/zustand";
import CommandMenu from "./CommandDialog";
import Search from "./Search";

const ThemeButton = dynamic(() => import("./ThemeButton"), { ssr: false });

const Header = () => {
	// const { setEditMode } = useEditStore((store) => ({
	// 	setEditMode: store.setIsConfigureDialogOpen,
	// }));

	return (
		<div className="z-10 h-16 w-full flex-shrink-0">
			<div className="mx-auto flex h-full w-full items-center justify-between px-10 py-2 dark:text-white">
				{/* <div className="py-3 text-4xl inline-block"></div> */}
				<div className="inline-block px-2 py-1 ">
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
				<Flex gap="3">
					<Search />
					<ThemeButton />
					<IconButton asChild variant="outline" size="3">
						<a
							href="https://github.com/dylanbr0wn/victoria-weather"
							target="_blank"
							rel="noreferrer"
						>
							<GitHubLogoIcon width={20} height={20} />
						</a>
					</IconButton>
				</Flex>
			</div>
		</div>
	);
};
export default Header;
