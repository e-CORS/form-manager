/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Red Hat Display', 'Public Sans', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: []
};