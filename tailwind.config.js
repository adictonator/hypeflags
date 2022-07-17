module.exports = {
	content: [
		'./sections/*.liquid',
		'./templates/*.liquid',
		'./snippets/*.liquid',
		'./layout/*.liquid',
		'./raw/**/*.{css,js}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			backgroundImage: {
				tick: 'url(/assets/tick.svg)',
				grommet: 'url(/assets/grommet.svg)',
			},
			colors: {
				'brand-red': '#D5003A',
				'twitter-gray': '#5b7083',
				'twitter-lightgray': '#8899a6',
				'twitter-blue': '#1DA1F2',
			},
			fontFamily: {
				tweet: 'Helvetica Neue,sans-serif',
			},
		},
	},
	plugins: [
		function ({ addVariant }) {
			addVariant('child', '& :first-child')
			addVariant('children', '& > *')
		},
	],
}
