module.exports = {
	cdnURL: 'https://cdn.shopify.com/s/files/1/0254/3868/3184/t/68/',
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
			screens: {
				sm: '401px',
				'1xl': '1440px',
			},
			animation: {
				'ping-slow': 'ping 1.5s infinite',
			},
			backgroundImage: {
				tick: `url(${this.cdnURL}assets/tick.svg)`,
				'success-tick': `url(${this.cdnURL}assets/success-tick.svg)`,
				'exclamation-icon': `url(${this.cdnURL}assets/exclamation.svg)`,
				grommet: `url(${this.cdnURL}assets/grommet.svg)`,
				'twitter-verified': `url(${this.cdnURL}assets/twitter-verified.svg)`,
				'warn-icon': `url(${this.cdnURL}assets/warn.svg)`,
				'red-warn-icon': `url(${this.cdnURL}assets/warn-red.svg)`,
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
