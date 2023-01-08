import * as D from "@radix-ui/react-dialog";
import * as React from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";

const variants_with_scale = {
	open: { opacity: 1, scale: 1 },
	closed: { opacity: 0, scale: 0.5 },
};
const variants = {
	open: { opacity: 0.5 },
	closed: { opacity: 0 },
};

export type ModalProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	title: React.ReactNode;
	children: React.ReactNode;
};

export const ModalTitle = ({ title }: { title: string }) => {
	return <div className="text-4xl font-bold ">{title}</div>;
};

export const ModalCommandBar = ({
	left,
	right,
}: {
	left?: React.ReactNode;
	right?: React.ReactNode;
}) => {
	return (
		<div className="flex justify-between text-base">
			<div className="justify-self-end">{left}</div>
			<div className="justify-self-start">{right}</div>
		</div>
	);
};

export const Dialog = ({ open, setOpen, title, children }: ModalProps) => {
	const { resolvedTheme } = useTheme();
	return (
		<D.Root open={open} onOpenChange={setOpen}>
			<AnimatePresence>
				{open ? (
					<D.Portal forceMount>
						<motion.div
							key="overlay"
							variants={variants}
							initial="closed"
							animate="open"
							exit="closed"
							className="z-40 fixed"
						>
							<D.Overlay
								forceMount
								className=" h-full w-full bg-black inset-0 z-40 fixed"
							/>
						</motion.div>

						<motion.div
							key="dialog"
							variants={variants_with_scale}
							initial="closed"
							animate="open"
							exit="closed"
							transition={{
								type: "spring",
								stiffness: 130,
								damping: 10,
							}}
							className={`fixed top-0 left-0 z-50 h-screen w-full ${
								resolvedTheme === "dark" ? "dark" : ""
							}`}
						>
							<D.Content
								forceMount
								className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-xl border border-indigo-400/40 dark:bg-base/80 bg-white/80 z-50 shadow-xl shadow-indigo-400/20 backdrop-blur-xl flex flex-col w-1/2`}
							>
								<div className="flex items-center justify-between py-3 px-5 border-b border-indigo-400/40 dark:bg-base bg-white rounded-t-xl">
									<D.Title className="text-xl dark:text-lighter text-mute font-bold">
										{title}
									</D.Title>
									<D.Close asChild>
										<button className="text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-800 transition-colors duration-500 ">
											<X className="h-5 w-5 " />
										</button>
									</D.Close>
								</div>

								<D.Description asChild>
									<div className="text-2xl "> {children}</div>
								</D.Description>

								<D.Close asChild>
									<div className="absolute top-3 right-3"></div>
								</D.Close>
							</D.Content>
						</motion.div>
					</D.Portal>
				) : null}
			</AnimatePresence>
		</D.Root>
	);
};
