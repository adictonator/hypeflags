/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./sections/**/*.liquid', 'templates/**/*.liquid'],
	theme: {
		extend: {
			colors: {
				'brand-red': '#D5003A',
			},
		},
	},
	plugins: [],
}
