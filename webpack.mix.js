let mix = require('laravel-mix')

mix.postCss('/assets/_raw-app.css', '/assets/app.css', [
	require('tailwindcss'),
]).version()
