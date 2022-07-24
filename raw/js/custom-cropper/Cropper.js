import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { toggleClasses } from '../helpers/utilities'
import EyeDropper from './EyeDropper'

EyeDropper()

let cropperObj = null
const selectors = {
	cropper: '[data-modal-custom-cropper]',
	hideCropper: '[data-modal-hide]',
}
const elms = {
	cropper: document.querySelector(selectors.cropper),
	hideCropper: document.querySelector(selectors.hideCropper),
}
const options = {
	aspectRatio: 5 / 3,
	background: false,
	dragMode: 'none',
	viewmode: 1,
	zoomOnWheel: false,
	zoomOnTouch: false,
	modal: false,
	ready: () => {
		const cropper = getCropper()
		var imageData = cropper.getImageData()
		const minSliderZoom = imageData.width / imageData.naturalWidth
		const maxZoom = minSliderZoom + minSliderZoom

		cropper.zoomTo(minSliderZoom)
		//$('#hype-zoom--slider').slider('option', 'max', maxZoom)
		//$('#hype-zoom--slider').slider('option', 'min', 0.1)
		//$('#hype-zoom--slider').slider('value', minSliderZoom)

		//let range = $('#hype-zoom--slider span').css('left')
		//$('body').find('.highlight').width(range)

		// Adjust cropper box width and position.
		const contData = cropper.getContainerData()
		const newWidth = contData.width - 150

		// Set it once so that we get new aspect ratio and correct height.
		cropper.setCropBoxData({
			width: newWidth,
		})

		// Now fetch the cropper data.
		const cropData = cropper.getCropBoxData()
		const newHorPos = (contData.width - newWidth) / 2
		const newVerPos = (contData.height - cropData.height) / 2

		cropper.setCropBoxData({
			left: newHorPos,
			top: newVerPos,
		})
	},
}

export default function CropperEvents() {
	document.querySelectorAll('[data-cropper-method]').forEach((el) => {
		el?.addEventListener('click', (e) => cropperFunctions(e.target))
	})

	// Hide cropper modal event.
	elms.hideCropper?.addEventListener('click', () => hideCropper())
}

export const initCropperModal = (cropperImage) => {
	setCropper(cropperImage)
	toggleCropper()
}

const toggleCropper = () => {
	setTimeout(() => {
		toggleClasses(elms.cropper, '-z-[1]', 'invisible', 'opacity-0')
		elms.cropper.classList.add('z-50')
	}, 0)
}

const hideCropper = () => {
	toggleCropper()
	elms.cropper.classList.remove('z-50')

	// also reset the input file value to null.
	document.getElementById('custom-flag-image').value = null
}

const setCropper = (image) => {
	cropperObj = new Cropper(image, options)
}

const getCropper = () => {
	return cropperObj
}

function cropperFunctions(el) {
	const type = el.dataset.cropperMethod
	const fillColor = document.querySelector('input[data-hex-code]').value

	switch (type) {
		case 'confirm':
			const canvas = cropperObj.getCroppedCanvas({
				fillColor,
			})

			if (canvas) {
				const sliderContainer = document.querySelector(
					'.product-single-gallery'
				)
				const sliderImage = sliderContainer.querySelector(
					'img[data-index="1"]'
				)
				const canvasContainer = sliderImage.parentElement
				canvasContainer.classList.add(
					'flex',
					'justify-center',
					'items-center',
					'bg-stone-100'
				)
				canvasContainer.style.height = 'auto'

				// Show the loader.
				galleryLoader(sliderContainer)

				// Hide cropper modal.
				document
					.querySelector('[data-modal]')
					.classList.add('invisible', 'opacity-0', '-z-[1]')
				//$('.hype-cropper-wrapper').fadeOut()

				const base64 = canvas.toDataURL('image/png')
				$('.new_url').remove()
				$('body').append(
					"<input type='hidden' class='new_url' value='" +
						base64 +
						"'/>"
				)

				sliderImage.setAttribute('src', base64)

				const dummyWrap = document.createElement('div')
				dummyWrap.classList.add(
					'relative',
					'custom-gromm',
					'sm:m-5',
					'm-4'
				)
				dummyWrap.appendChild(sliderImage)
				dummyWrap.classList.add('shadow-lg')
				canvasContainer?.appendChild(dummyWrap)

				$("[name='add']").removeAttr('disabled')

				setTimeout(function () {
					removeGalleryLoader()
				}, 500)
			}
	}
}
