// webpack.mix.js

let mix = require('laravel-mix')

mix.js('./raw/js/app.js', './assets/app.js').postCss(
	'./raw/css/app.css',
	'./assets/app.css',
	[require('tailwindcss')]
)
