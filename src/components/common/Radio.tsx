import * as RadioGroup from "@radix-ui/react-radio-group";
import { AnimatePresence, motion } from "framer-motion";

export type RadioProps = {
	options: { value: string; label: string }[];
	value?: "left" | "right";
	onChange?: (value: "left" | "right") => void;
};

export function Radio({ options, value, onChange }: RadioProps) {
	return (
		<RadioGroup.Root
			value={value ?? options[0].value}
			onValueChange={onChange}
			aria-label="View density"
			className="flex flex-col gap-3 mt-3"
		>
			{options.map((option) => (
				<RadioItem
					key={option.value}
					value={option.value}
					label={option.label}
				/>
			))}
		</RadioGroup.Root>
	);
}

function RadioItem({ value, label }: { value: string; label: string }) {
	return (
		<div className="flex gap-3 items-center">
			<RadioGroup.Item
				className="h-5 w-5 bg-lighter rounded-full"
				value={value}
				id={value.toLowerCase()}
			>
				<AnimatePresence>
					<RadioGroup.Indicator asChild>
						<motion.span
							exit={{ scale: 0 }}
							animate={{ scale: 1 }}
							initial={{ scale: 0 }}
							className="w-full h-full flex items-center justify-center z-10 after:bg-mute content-[''] after:h-3 after:w-3 after:block after:rounded-full"
						/>
					</RadioGroup.Indicator>
				</AnimatePresence>
			</RadioGroup.Item>
			<label htmlFor={value.toLowerCase()} className="text-sm text-lighter">
				{label}
			</label>
		</div>
	);
}
