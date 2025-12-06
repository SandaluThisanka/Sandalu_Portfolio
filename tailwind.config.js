/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				border: "rgba(99, 102, 241, 0.35)",
				background: "#030014",
				foreground: "#e2d3fd",
			},
		},
	},
	plugins: [
		require('tailwind-scrollbar')
	],
}
