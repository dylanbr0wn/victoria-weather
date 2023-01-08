const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ["Aileron", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				base: "#0e101f",
				light: "#575fa8",
				mute: "#2b2f53",
				lighter: "#aeb4e6",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
};
