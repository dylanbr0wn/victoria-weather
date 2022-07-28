import * as React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { log } from "next-axiom";

const ErrorFallback = ({
	resetErrorBoundary,
}: {
	error: Error;
	componentStack: string;
	resetErrorBoundary: () => void;
}) => {
	return (
		<div className="text-red-600 w-full h-full flex justify-center text-center">
			<div className="my-auto">
				<div className="text-7xl">☄️</div>

				<h1 className="font-black text-orange-600 text-4xl">Disaster</h1>
				<p className=" text-red-600 text-lg w-96">
					A disaster struck and this thing crashed... Click{" "}
					<span
						className="hover:underline cursor-pointer text-orange-600"
						onClick={resetErrorBoundary}
					>
						here
					</span>{" "}
					to try this again or{" "}
					<span
						className="hover:underline cursor-pointer text-orange-600"
						onClick={() => location.reload()}
					>
						refresh the page.
					</span>
				</p>
			</div>
		</div>
	);
};

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
	return (
		<ReactErrorBoundary
			onError={(error) => log.error(error.message, error.stack)}
			FallbackComponent={ErrorFallback}
		>
			{children}
		</ReactErrorBoundary>
	);
};

export default ErrorBoundary;
