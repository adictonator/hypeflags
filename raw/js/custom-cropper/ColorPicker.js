import Pickr from '@simonwep/pickr'
import '@simonwep/pickr/dist/themes/nano.min.css'

// @todo: fix this export.
export default function ColorPicker() {
	if (document.querySelector('[data-pickr]')) {
		const pickr = Pickr.create({
			el: '[data-pickr]',
			theme: 'nano',
			showAlways: true,
			lockOpacity: true,
			inline: true,
			default: '#000000',
			useAsButton: true,
			components: {
				preview: false,
				opacity: false,
				hue: true,
				interaction: {
					input: true,
				},
			},
		})
		pickr.on('change', (color, source, instance) => {
			$('[data-hex-color]').css('background', color.toHEXA().toString())
			$('input[data-hex-code]').val(color.toHEXA().toString())
		})
	}
}
