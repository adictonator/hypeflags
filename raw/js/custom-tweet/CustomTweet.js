import { addGalleryLoader, removeGalleryLoader } from '../helpers/utilities'
import TweetEditor from './TweetEditor'
import handelTweetErrors from './TweetErrors'
import {
	fetchTweet,
	formatAMPM,
	formateDate,
	formatText,
	handleFlagResize,
	nFormatter,
	removeTweetError,
	updateElements,
} from './TweetFlagUtilities'
import TweetInspiration from './TweetInspiration'

const API_URL = 'https://backend.hypeflag.com/tweet/index.php?id='
const elms = {
	tweetURLInput: document.getElementById('tweet-url'),
	tweetFlag: document.querySelector('[data-twitter-flag]'),
	editBtn: document.querySelector('[data-edit-tweet]'),
	inspiration: document.querySelector('[data-tweet-inspiration]'),
	atc: document.querySelector('[name="add"]'),
}

export default function CustomTweet() {
	initEventListeners()
}

/**
 * @todo clean this logic a bit
 * @param {object} tweetData
 */
const updateTweetContent = (tweetData) => {
	const meta = tweetData.doc1.data
	const data = tweetData.doc2
	const time = formatAMPM(data.created_at)
	const date = formateDate(data.created_at)

	elms.tweetURLInput.parentElement.classList.add('after:bg-success-tick')

	// Update user avatar.
	document
		.querySelector('[data-t-user-avatar]')
		?.setAttribute('src', data.user.profile_image_url_https)
	// Update user name.
	if (data.user.verified) {
		document
			.querySelector('[data-t-user-name] svg')
			.classList.remove('hidden')
	} else {
		document.querySelector('[data-t-user-name] svg').classList.add('hidden')
	}

	document.querySelector('[data-t-user-name]').firstChild.nodeValue =
		data.user.name
	updateElements('[data-t-user-handle]', '@' + data.user.screen_name)

	let tweetBody = formatText(data.text)
	if (data.photos) {
		const photoURL = data.photos[0].url
		const photo = new Image()
		photo.classList.add(
			'mt-3.5',
			'rounded-xl',
			'h-[300px]',
			'object-cover',
			'mx-auto',
			'w-full'
		)
		photo.onload = () => {
			document.querySelector('[data-t-text]').appendChild(photo)
		}
		photo.src = photoURL
	}

	if (data.entities?.urls?.length > 0) {
		$.each(data.entities.urls, function (inx, val) {
			tweetBody = tweetBody.replace(val.url, '')
		})
	}
	if (data.entities?.media?.length > 0) {
		$.each(data.entities.media, function (inx, val) {
			tweetBody = tweetBody.replace(val.url, '')
		})
	}

	updateElements('[data-t-text]', tweetBody)
	updateElements('[data-t-time]', time)
	updateElements('[data-t-date]', date)
	updateElements('[data-t-device]', meta.source)
	updateElements('[data-t-likes]', nFormatter(data.favorite_count))
	updateElements(
		'[data-t-retweets]',
		nFormatter(meta.public_metrics.retweet_count)
	)

	const outerDiv = elms.tweetFlag.querySelector('.inner')
	const innerDiv = elms.tweetFlag.querySelector('.more-inner')

	// Need a timeout so that the DOM has updated
	// and then resize can work.
	setTimeout(() => {
		handleFlagResize(outerDiv, innerDiv)
		removeGalleryLoader()
	}, 500)
}

const handleTweetChange = async (url) => {
	addGalleryLoader(elms.tweetFlag.parentElement)
	removeTweetError()
	// Disable tweet inspiration button.
	elms.inspiration?.setAttribute('disabled', 'disabled')

	// Disable Add to Cart button.
	elms.atc?.setAttribute('disabled', 'disabled')

	elms.tweetURLInput.parentElement.classList.remove(
		'after:bg-success-tick',
		'after:bg-exclamation-icon'
	)

	let parts = url.split('/')
	let id = parts[parts.length - 1]
	id = id.match(/\d+/)
	url = API_URL + id
	const response = await fetchTweet(url)

	if (handelTweetErrors(response)) {
		updateTweetContent(response)
		// Enable Add to Cart button.
		elms.atc?.removeAttribute('disabled')

		// Enable tweet inspiration button.
		elms.inspiration?.removeAttribute('disabled')
	}
}

const initEventListeners = () => {
	elms.tweetURLInput?.addEventListener('change', (e) =>
		handleTweetChange(e.target.value)
	)

	// Fetch initial tweet on page load.
	document.getElementById('tweet-url')?.dispatchEvent(new Event('change'))

	// Edit tweet button.
	elms.editBtn?.addEventListener('click', () => TweetEditor())

	// Tweet inspiration.
	elms.inspiration?.addEventListener('click', () => TweetInspiration())

	// Switch tweet theme.
	const radios = document.querySelectorAll('[name=theme]')
	for (const radio of radios) {
		radio.onclick = (e) => switchTheme(e)
	}
}

const switchTheme = (event) => {
	const theme = event.target.value

	if ('dark' === theme) {
		document
			.querySelector('[data-twitter-flag]')
			?.parentElement?.classList.add('dark')
	} else {
		document
			.querySelector('[data-twitter-flag]')
			?.parentElement?.classList.remove('dark')
	}

	//generateTweetCanvas()
}
