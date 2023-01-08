import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";

export default function ThemeButton() {
	const { resolvedTheme, setTheme } = useTheme();
	return (
		<button
			onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
			className="dark:text-white opacity-70 hover:opacity-90 transition-opacity duration-500 relative h-6 w-6"
		>
			<AnimatePresence>
				{resolvedTheme === "dark" ? (
					<motion.span
						key="moon"
						initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
						animate={{ rotate: 0, opacity: 1, scale: 1 }}
						exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
						className="absolute top-0 left-0"
					>
						<Moon className="h-6 w-6" />
					</motion.span>
				) : (
					<motion.span
						key="sun"
						initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
						animate={{ rotate: 0, opacity: 1, scale: 1 }}
						exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
						className="absolute top-0 left-0"
					>
						<Sun className="h-6 w-6 " />
					</motion.span>
				)}
			</AnimatePresence>
		</button>
	);
}
