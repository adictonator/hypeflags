import CustomFlag from './CustomFlag'
import CartLogic from './CartLogic'
import QuantityLogic from './QuantityLogic'
import Swipers from './SwiperSliders'
import CustomTweet from './custom-tweet/CustomTweet'
import {
	generateTweetCanvas,
	handleFlagResize,
} from './custom-tweet/TweetFlagUtilities'

Swipers()
CartLogic()
QuantityLogic()
//CustomFlag()
CustomTweet()

document
	.querySelector('[data-cust-flag-modal]')
	?.addEventListener('click', () => {
		const modal = document.querySelector('[data-privacy-modal]')
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

// @todo: can we separte this logic in their own file?
onresize = (event) => {
	const width = event.target.outerWidth
	const outerDiv = document.querySelector('.inner')
	const innerDiv = document.querySelector('.more-inner')
	handleFlagResize(outerDiv, innerDiv)
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

// Header
document
	.querySelector('[data-mobile-menu-toggle]')
	?.addEventListener('click', (e) => {
		document.querySelector('.icon-hamburger').classList.toggle('hidden')
		document.querySelector('.icon-close').classList.toggle('hidden')

		document
			.querySelector('[data-mobile-nav]')
			.classList.toggle('invisible')
		document
			.querySelector('[data-mobile-nav]')
			.classList.toggle('-translate-y-full')
		document
			.querySelector('[data-mobile-nav]')
			.classList.toggle('translate-y-[75px]')
		//document.querySelector('[data-mobile-nav]').classList.remove('')
	})

$(document).on('click', 'button[name="add"]', async function (e) {
	e.preventDefault()
	const btn = $(this)

	// Show the loader.
	btn.prop('disabled', true).find('svg').removeClass('hidden')

	const prodType = btn.data('add-to-cart')

	if (prodType === 'tweet') {
		await generateTweetCanvas()
	}

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
			btn.removeProp('disabled')
		},
	})
})
