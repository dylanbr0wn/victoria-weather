const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-mona-sans)', ...defaultTheme.fontFamily.sans],
        hubot: ['var(--font-hubot-sans)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        base: "#0e101f",
        light: "#575fa8",
        mute: "#2b2f53",
        lighter: "#aeb4e6",
      },
      animation: {
        "spin-slow": "spin 6s linear infinite"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
