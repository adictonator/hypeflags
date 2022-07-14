module.exports = {
	content: ['./sections/*.liquid', './templates/*.liquid'],
	theme: {
		extend: {
			backgroundImage: {
				tick: 'url(/assets/tick.svg)',
			},
			colors: {
				'brand-red': '#D5003A',
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
