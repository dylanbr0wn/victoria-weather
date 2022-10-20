import { AnimatePresence as AP, motion } from "framer-motion";
import * as React from "react";
import ErrorBoundary from "../ErrorBoundary";

type AnimatePresenceProps = {
	children: React.ReactNode;
	show: boolean;
};

export default function AnimatePresence({
	children,
	show,
}: AnimatePresenceProps) {
	return (
		<AP>
			<ErrorBoundary>
				{show && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="w-full h-full"
					>
						{children}
					</motion.div>
				)}
			</ErrorBoundary>
		</AP>
	);
}
