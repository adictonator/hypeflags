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
				'success-tick': 'url(/assets/success-tick.svg)',
				'exclamation-icon': 'url(/assets/exclamation.svg)',
				grommet: 'url(/assets/grommet.svg)',
				'twitter-verified': 'url(/assets/twitter-verified.svg)',
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
			boxShadow: {
				cust: '0 0 10px rgba(0,0,0,0.1)',
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
