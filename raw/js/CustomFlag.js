const MAX_SIZE = 9000000

export default function CustomFlag() {
	document.addEventListener('DOMContentLoaded', () => {
		console.log( 'lmoa okay mana' )
	})
	document
		.getElementById('custom-flag-image')
		?.addEventListener('change', (e) => showCustomFlagEditor(e))
}

const showUploadPreview = (event) => {
	const [file] = event.target.files
	const objectUrl = URL.createObjectURL(file)

	console.log('file:', file)
	if (file) {
		if (
			fileSizeOK(file.size) &&
			fileTypeOK(file.type) &&
			fileDimensionOK(file)
		) {
			document.querySelector('[data-tmp-file-name]').innerHTML = file.name
			document.querySelector('[data-tmp-file-size]').innerHTML =
				bytesToMegaBytes(file.size).toFixed(1)
			document.querySelector('[data-temp-preview]').src = objectUrl

			$('.hype-cropper-wrapper').fadeIn({
				duration: 'slow',
				start: function () {
					$(this).css('display', 'grid')
					//                              $('.hype-cropper__body--image').css('visibility', 'hidden')
					$(
						'<div id="custom-loader-buffer" style="z-index: 9999; position: absolute"></div>'
					).insertBefore('.hype-cropper__body--image')
				},
				complete: function () {
					$('#custom-loader-buffer').remove()
					//                           $('.cropper-container.cropper-bg').css('visibility', 'visible')
				},
			})

			$('.cross-cropper').show()
		}
	}
}

const fileSizeOK = (fileSize) => {
	console.log('ok here in first')
	if (fileSize > MAX_SIZE) {
		const text = 'File size too large. Please upload a file less than 9MB.'
		displayCropperErrorPopup('Upload Failed', text, 'warning warning--red')
		return false
	}

	return true
}

const fileTypeOK = (fileType) => {
	console.log('check of type')
	const validImageTypes = ['image/jpeg', 'image/png']

	if ($.inArray(fileType, validImageTypes) < 0) {
		const text = 'File type not allowed. Please upload PNG or JPEG.'

		displayCropperErrorPopup('Upload Failed', text, 'warning warning--red')
		$('body').find('#preloader').remove()

		return false
	}

	return true
}

const fileDimensionOK = (objectUrl) => {
	const img = new Image()
	img.crossOrigin = 'anonymous'

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
			$('.hype-cropper-wrapper, .cross-cropper').hide()
			return false
		} else if (width <= 999 || height <= 999) {
			$('.low-res-warning-indicator').addClass('visible')
		} else {
			$('.low-res-warning-indicator').removeClass('visible')
		}

		return true
	}
	img.src = objectUrl
}
const bytesToMegaBytes = (bytes) => bytes / 1024 ** 2

const showCustomFlagEditor = (e) => {
	showUploadPreview(e)
	// Show the modal.
}
