/* eslint-disable @next/next/no-img-element */
import { GitHubLogoIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
	Flex,
	IconButton,
} from "@radix-ui/themes";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { PointsData } from "../utils/types";

const ThemeButton = dynamic(() => import("./ThemeButton"), { ssr: false });

const Header = () => {
	return (
		<div className="z-10 h-16 w-full flex-shrink-0">
			<div className="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-10 py-2 dark:text-white">
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
