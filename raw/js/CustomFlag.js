import ColorPicker from './custom-cropper/ColorPicker'
import CropperEvents, { initCropperModal } from './custom-cropper/Cropper'

CropperEvents()
ColorPicker()

const MAX_SIZE = 9000000

const rangeInputs = document.querySelectorAll('input[type="range"]')
const cropperImage = document.querySelector('[data-cropper-image]')
function handleInputChange(e) {
	let target = e.target
	const min = target.min
	const max = target.max
	const val = target.value

	target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%'
}

rangeInputs.forEach((input) => {
	input.addEventListener('input', handleInputChange)
})

export default function CustomFlag() {
	document
		.getElementById('custom-flag-image')
		?.addEventListener('change', (e) => showCustomFlagEditor(e))

	const showUploadPreview = (event) => {
		const [file] = event.target.files

		// Bail early.
		if (!file) return

		const objectUrl = URL.createObjectURL(file)
		const image = fileDimensionOK(objectUrl)
		if (fileSizeOK(file.size) && fileTypeOK(file.type) && image) {
			console.log('are hwe here')
			document.querySelector('[data-tmp-file-name]').innerHTML = file.name
			document.querySelector('[data-tmp-file-size]').innerHTML =
				bytesToMegaBytes(file.size).toFixed(1)
			document.querySelector('[data-temp-preview]').src = objectUrl

			initCropperModal(cropperImage)
		}
	}

	const fileSizeOK = (fileSize) => {
		if (fileSize > MAX_SIZE) {
			const text =
				'File size too large. Please upload a file less than 9MB.'
			displayCropperErrorPopup(
				'Upload Failed',
				text,
				'warning warning--red'
			)
			return false
		}

		return true
	}

	const fileTypeOK = (fileType) => {
		const validImageTypes = ['image/jpeg', 'image/png']

		if ($.inArray(fileType, validImageTypes) < 0) {
			const text = 'File type not allowed. Please upload PNG or JPEG.'

			displayCropperErrorPopup('Upload Failed', text)
			$('body').find('#preloader').remove()

			return false
		}

		return true
	}

	const fileDimensionOK = (objectUrl) => {
		let allGood = true
		const img = new Image()

		img.onload = () => {
			const width = img.width
			const height = img.height

			if (width <= 499 || height <= 499) {
				const text =
					'File resolution too low. Please upload an image with minimum 500px resolution.'
				displayCropperErrorPopup(
					'Upload Failed',
					text,
					'warning warning--red'
				)
				allGood = false

				return false
			}

			if (width <= 999 || height <= 999) {
				$('.low-res-warning-indicator').addClass('visible')
			} else {
				$('.low-res-warning-indicator').removeClass('visible')
			}
		}

		img.src = objectUrl
		cropperImage.src = objectUrl

		return img
	}

	const bytesToMegaBytes = (bytes) => bytes / 1024 ** 2

	const showCustomFlagEditor = (e) => {
		showUploadPreview(e)
	}

	const displayCropperErrorPopup = (heading, text, type = 'error') => {
		const modal = document.createElement('div')
		modal.setAttribute('data-modal-custom', '')
		modal.classList.add(
			'fixed',
			'inset-0',
			'bg-black/70',
			'z-50',
			'flex',
			'opacity-0',
			'items-center',
			'justify-center',
			'h-screen',
			'duration-300'
		)
		const modalBody = document.createElement('div')
		modalBody.classList.add(
			'py-8',
			'px-9',
			'max-w-md',
			'w-full',
			'bg-white',
			'flex',
			'items-center',
			'text-center',
			'flex-col',
			'justify-center',
			'rounded-lg',
			'shadow-lg'
		)

		const closePreviewBtn = document.createElement('button')
		closePreviewBtn.innerHTML = 'Close'
		closePreviewBtn.type = 'button'
		closePreviewBtn.classList.add('secondary-btn', 'mt-12')
		closePreviewBtn.setAttribute('data-close', 'close')
		closePreviewBtn.onclick = () => {
			closePreview()
		}

		const errorClass =
			type === 'error'
				? 'before:bg-red-warn-icon'
				: type === 'warn'
				? 'before:bg-warn-icon'
				: 'before:bg-danger'

		modalBody.innerHTML = `<span class="text-2xl font-bold ${errorClass} before:w-16 before:h-16 before:bg-cover before:block before:mx-auto before:mb-8">${heading}</span>`
		modalBody.innerHTML +=
			'<span class="text-base mt-4">' + text + '</span>'
		modalBody.appendChild(closePreviewBtn)
		modal.appendChild(modalBody)

		document.body.appendChild(modal)

		setTimeout(() => {
			modal.classList.remove('opacity-0')
		}, 0)

		const closePreview = () => {
			modal.classList.add('opacity-0')
			setTimeout(() => {
				document.querySelector('[data-modal-custom]').remove()
			}, 100)
		}

		// Reset the image uploader.
		document.getElementById('custom-flag-image').value = null
		return false
	}
}
