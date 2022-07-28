const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "media", // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ["Aileron", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
};
