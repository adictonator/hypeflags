import { removeGalleryLoader } from '../helpers/utilities'

export default function handelTweetErrors(data) {
	let errorMsg
	// Tweet not fount or private tweet.
	if (data.doc1.errors) {
		if (data.doc1.errors[0].title == 'Authorization Error') {
			errorMsg = 'Sorry, private tweets are not supported.'
		} else {
			errorMsg = 'Tweet not found, please try again'
		}
	}

	// Tweet contains multiple images.
	if (data.doc2.photos) {
		if (data.doc2.photos.length > 1) {
			errorMsg =
				'Sorry, tweets containing multiple images are not supported at the moment.'
		}
	}

	// Tweet contains videos.
	if (data.doc2.video) {
		errorMsg =
			'Sorry, tweets containing videos are not supported at the moment.'
	}

	if (errorMsg) {
		displayError(errorMsg)

		return false
	}

	return true
}

const displayError = (errorText) => {
	const element = document.createElement('div')
	element.setAttribute('data-tweet-error', '')
	element.classList.add(
		'mt-6',
		'flex',
		'rounded',
		'border',
		'border-brand-red',
		'bg-brand-red/5',
		'py-4',
		'px-5',
		'text-brand-red'
	)
	element.innerHTML = errorText
	document
		.querySelector('.jdgm-widget')
		.parentNode.insertBefore(
			element,
			document.querySelector('.jdgm-widget').nextSibling
		)

	// Remove the loader.
	removeGalleryLoader()

	// Hide flag UI.
	document.querySelector('[data-twitter-flag]').classList.add('hidden')
	// Hide edit button.
	document.querySelector('[data-edit-tweet]').classList.add('hidden')
	// Disble add to cart button.
	document
		.querySelector('button[name="add"]')
		.setAttribute('disabled', 'disabled')

	document
		.querySelector('[data-tweet-url')
		.classList.remove('after:bg-success-tick')
	document
		.querySelector('[data-tweet-url')
		.classList.add('after:bg-exclamation-icon')
}
