import { Command, useCommandState } from "cmdk";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

function CommandList() {
	const search = useCommandState((state) => state.search);
	return (
		<Command.List className="border-mute border-x border-b transition-all duration-500 shadow-lg shadow-transparent bg-base w-3/4 rounded-b-lg">
			<Command.Empty>No results found for {search}.</Command.Empty>
			<Command.Group heading="Letters">
				<Command.Item>a</Command.Item>
				<Command.Item>b</Command.Item>
				<Command.Separator />
				<Command.Item>c</Command.Item>
			</Command.Group>

			<Command.Item>Apple</Command.Item>
		</Command.List>
	);
}

export default function CommandMenu() {
	const [open, setOpen] = useState(false);

	// Toggle the menu when ⌘K is pressed
	useEffect(() => {
		const down = (e) => {
			if (e.key === "k" && e.metaKey) {
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<Command.Dialog
			open={open}
			onOpenChange={setOpen}
			label="Global Command Menu"
			className="z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 w-full h-full "
		>
			<div className="absolute top-[20%] left-1/2 -translate-x-1/2  rounded-lg  w-1/2 flex flex-col items-center justify-center">
				<div className="z-10 w-full rounded-lg bg-base text-white text-lg p-3 border-mute border group outline-non focus-within:border-light focus-within:ring-0 flex items-center gap-3 shadow-lg shadow-transparent focus-within:shadow-indigo-700/30 transition-all duration-300">
					<Search className="pointer-events-auto text-light group-focus-within:text-lighter stroke-current transition-colors duration-300" />
					<Command.Input
						className="bg-transparent border-none outline-none ring-0 focus-visible:ring-0 w-full  placeholder:text-light text-lighter"
						placeholder="Search for a station..."
					/>
				</div>

				<CommandList />
			</div>
		</Command.Dialog>
	);
}
