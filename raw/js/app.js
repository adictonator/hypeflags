import {
	confirmTweetEditing,
	hideTweetEditor,
	resizing,
	showTweetEditor,
	SwitchTweetTheme,
	TwitterInspiration,
	UpdateTweetScreen,
} from './TwitterInspiration'
import CustomFlag from './CustomFlag'
import CartLogic from './CartLogic'
import QuantityLogic from './QuantityLogic'

CartLogic()
QuantityLogic()
//CustomFlag()

document
	.getElementById('tweet-inspiration')
	?.addEventListener('click', (event) => TwitterInspiration(event))

document
	.getElementById('tweet-url')
	?.addEventListener('change', (event) => UpdateTweetScreen(event))

// Fetch initial tweet on page load.
document.getElementById('tweet-url')?.dispatchEvent(new Event('change'))

// Switch tweet theme.
const radios = document.querySelectorAll('[name=theme]')
for (const radio of radios) {
	radio.onclick = (e) => SwitchTweetTheme(e)
}

// Show tweet editor modal.
document
	.querySelector('[data-edit-tweet]')
	?.addEventListener('click', (e) => showTweetEditor(e))

document.addEventListener('DOMContentLoaded', () => {
	// Confirm tweet editing.
	document
		.querySelector('[data-confirm-edit]')
		?.addEventListener('click', (e) => confirmTweetEditing(e))

	// Cancel tweet editing.
	document
		.querySelector('[data-cancel-edit]')
		?.addEventListener('click', () => hideTweetEditor())
})

document
	.querySelector('[data-cust-flag-modal]')
	?.addEventListener('click', () => {
		const modal = document.querySelector('[data-privacy-modal]')
		document.body.append(modal)
		setTimeout(() => {
			modal.classList.toggle('invisible')
			modal.classList.toggle('opacity-0')
		}, 0)
	})

document.querySelector('[data-hide-modal]')?.addEventListener('click', () => {
	const modal = document.querySelector('[data-privacy-modal]')
	modal.classList.toggle('invisible')
	modal.classList.toggle('opacity-0')
})

onresize = (event) => {
	const width = event.target.outerWidth

	updateUploadImageText(width)
}

window.addEventListener('DOMContentLoaded', (event) => {
	const width = event.target.body.clientWidth

	updateUploadImageText(width)
})

function updateUploadImageText(width) {
	const elm = document.querySelector('[data-upload-image-text]')

	if (!elm) return

	let uploadText = 'Drag your image here or <strong>browse</strong>'
	if (width <= 767) {
		uploadText = 'Upload your image'
	}

	elm.innerHTML = uploadText
}

$(document).on('click', 'button[name="add"]', function (e) {
	e.preventDefault()
	const dataURL = $('.new_url').val()

	// @ts-ignore
	const prodID = meta.product.variants[0].id
	const qty = $('input[name="quantity"]').val()
	var formdata = new FormData()
	formdata.append('id', prodID)
	formdata.append('quantity', qty)

	if (dataURL) {
		var blobBin = Buffer.from(dataURL.split(',')[1], 'base64')
		var file = new Blob([blobBin], { type: 'image/png' })
		formdata.append('properties[custom-flag]', file, 'final_image.png')
	}

	const _btn = jQuery('button[name="add"]').prop('disabled', true)
	//_btn.css('opacity', 0.5)
	//_btn.append('<i class="fa fa-refresh fa-spin"></i>')

	$.ajax({
		url: '/cart/add.js',
		type: 'POST',
		data: formdata,
		contentType: false,
		processData: false,
		cache: false,
		dataType: 'json',
		success: function (res) {
			window.location.href = '/cart'
		},
		error: function (msg) {
			_btn.removeProp('disabled')
			_btn.css('opacity', 1)
		},
	})
})
