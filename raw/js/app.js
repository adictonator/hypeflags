import {
	confirmTweetEditing,
	hideTweetEditor,
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

$(document).on('click', 'button[name="add"]', function (e) {
	e.preventDefault()
	const dataURL = $('.new_url').val()

	// @ts-ignore
	const prodID = meta.product.variants[0].id
	const qty = $('input[name="quantity"]').val()
	var formdata = new FormData()
	formdata.append('id', prodID)
	formdata.append('quantity', qty)
	const image = new Image()

	let gg = formdata
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
		dataType: 'json', // Change this according to your response from the server.
		success: function (res) {
			console.log(res)
			window.location.href = '/cart'
		},
		error: function (kk) {
			_btn.removeProp('disabled')
			_btn.css('opacity', 1)
			_btn.find('i.fa').remove()
			console.log(kk)
		},
	})
})
