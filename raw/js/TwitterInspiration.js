import domtoimage from 'dom-to-image'

export function TwitterInspiration(event) {
	event.preventDefault()

	const URLs = [
		'https://twitter.com/stoolpresidente/status/1296409285686157312',
		'https://twitter.com/souljaboy/status/1022522850320760833',
		'https://twitter.com/kanyewest/status/989197113648037888',
		'https://twitter.com/codyko/status/898951913894313984',
		'https://twitter.com/zane/status/1244076011018260480',
		'https://twitter.com/lilpump/status/943988935901843456',
		'https://twitter.com/JuiceWorlddd/status/1123711610214866945',
		'https://twitter.com/Drake/status/203006654097268736',
		'https://twitter.com/1future/status/1260668431210287109',
	]
	const num = Math.floor(Math.random() * 9)

	document.getElementById('tweet-url').value = URLs[num]
	document.getElementById('tweet-url')?.dispatchEvent(new Event('change'))
}

export function UpdateTweetScreen(event) {
	removeTweetError()
	document
		.querySelector('[data-tweet-url')
		.classList.remove('after:bg-success-tick', 'after:bg-exclamation-icon')
	$('.product-single__photos').append(
		'<div id="custom-loader-buffer" class="bg-stone-100"></div>'
	)

	document.querySelector("[name='add']")?.setAttribute('disabled', 'disabled')

	const urls = event.target.value
	let parts = urls.split('/')
	let last_part = parts[parts.length - 1]
	last_part = last_part.match(/\d+/)

	fetch('https://backend.hypeflag.com/tweet/index.php?id=' + last_part)
		.then((resp) => resp.json())
		.then((data) => {
			if (handelTweetErrors(data)) {
				updateTweetContent(data)
				//generateTweetCanvas()
			}
		})
		.catch((jqXHR, exception) => {
			var msg = ''
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.'
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]'
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].'
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.'
			} else if (exception === 'timeout') {
				msg = 'Time out error.'
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.'
			} else {
				msg =
					'Uncaught Error.\n' + jqXHR.responseText + '\n' + exception
			}
			displayError(msg)
		})
}

function handelTweetErrors(data) {
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

function removeTweetError() {
	// Hide flag UI.
	document.querySelector('[data-twitter-flag]').classList.remove('hidden')
	// Hide edit button.
	document.querySelector('[data-edit-tweet]').classList.remove('hidden')

	if (document.querySelector('[data-tweet-error]')) {
		document.querySelector('[data-tweet-error]').remove()
	}
}

function displayError(errorText) {
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
	$('#custom-loader-buffer').fadeOut('slow', function () {
		$(this).remove()
	})
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

function updateElements(element, content) {
	document.querySelector(element).innerHTML = content
}

function updateTweetContent(tweetData) {
	const meta = tweetData.doc1.data
	const data = tweetData.doc2
	const time = formatAMPM(data.created_at)
	const date = formateDate(data.created_at)

	document
		.querySelector('[data-tweet-url')
		.classList.add('after:bg-success-tick')

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

	setTimeout(function () {
		resizing()
		$('#custom-loader-buffer').fadeOut('slow', function () {
			$(this).remove()
		})

		generateTweetCanvas()
	}, 1500)
}

export function resizing() {
	if (!document.querySelector('[data-twitter-flag]')) return

	var outerDiv = $('[data-twitter-flag] .inner')
	var outerDivJS = document.querySelector('[data-twitter-flag] .inner')
	var innerDiv = document.querySelector('[data-twitter-flag] .more-inner')
	const computedStyle = getComputedStyle(outerDivJS)
	let elementHeight = outerDivJS.clientHeight
	let elementWidth = outerDivJS.clientWidth

	elementHeight -=
		parseFloat(computedStyle.paddingTop) +
		parseFloat(computedStyle.paddingBottom)
	elementWidth -=
		parseFloat(computedStyle.paddingLeft) +
		parseFloat(computedStyle.paddingRight)

	const computedStyleInner = getComputedStyle(innerDiv)
	let elementHeightIn = innerDiv.clientHeight
	let elementWidthIn = innerDiv.clientWidth

	elementHeightIn -=
		parseFloat(computedStyleInner.paddingTop) +
		parseFloat(computedStyleInner.paddingBottom)
	elementWidthIn -=
		parseFloat(computedStyleInner.paddingLeft) +
		parseFloat(computedStyleInner.paddingRight)

	var outerDivWidth = outerDiv.outerWidth()
	var outerDivHeight = outerDiv.outerHeight()
	var scaleDiv = $('[data-twitter-flag] .more-inner')
	var scaleDivWidth = scaleDiv.outerWidth()
	var scaleDivHeight = scaleDiv.outerHeight()
	var scale
	scale = Math.min(
		elementWidth / elementWidthIn,
		elementHeight / elementHeightIn
	)

	if (scale > 1) {
		scale = 1
	}

	scaleDiv.css({
		transform: 'scale(' + scale + ')',
		'transform-origin': 'center left',
	})
}

/**
 * Color code #hashtags and [at] tags in the tweet.
 *
 * @param {string} tweetText
 * @returns string tweetText
 */
function formatText(tweetText) {
	const hasAt = findAtTags(tweetText)
	const hasHash = findHashTags(tweetText)

	if (hasAt) {
		hasAt.map((at) => {
			tweetText = tweetText.replace(
				at,
				'<span class="text-twitter-blue">' + at + '</span>'
			)
		})
	}
	if (hasHash) {
		hasHash.map((hash) => {
			tweetText = tweetText.replace(
				hash,
				'<span class="text-twitter-blue">' + hash + '</span>'
			)
		})
	}

	return tweetText
}

export function SwitchTweetTheme(event) {
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

	generateTweetCanvas()
}

export function showTweetEditor(event) {
	const elm = document.querySelector('[data-tweet-editor-modal]')
	document.body.appendChild(elm)

	const body = document.querySelector('[data-tweet-editor]')
	const twitterElm = document
		.querySelector('[data-twitter-flag]')
		?.cloneNode(true)

	if (
		document
			.querySelector('[data-twitter-flag]')
			.parentElement.classList.contains('dark')
	) {
		body.classList.add('dark')
	} else {
		body.classList.remove('dark')
	}

	twitterElm?.removeAttribute('data-twitter-flag')
	twitterElm.setAttribute('data-cloned-tweet', true)

	twitterElm
		.querySelector('[data-t-text]')
		?.setAttribute('contentEditable', true)
	twitterElm
		.querySelector('[data-t-text]')
		.addEventListener('keydown', () => {
			//resizing()
			console.log('working hee')
		})

	setTimeout(function () {
		elm?.classList.remove('invisible', 'opacity-0')
		//elm?.classList.add('flex')
		twitterElm.querySelector('[data-t-text]').focus()
	}, 0)

	setTimeout(() => {
		// Resizing modal one.
		var outerDivJS = twitterElm.querySelector('.inner')
		var innerDiv = twitterElm.querySelector('.more-inner')
		const computedStyle = getComputedStyle(outerDivJS)
		let elementHeight = outerDivJS.clientHeight
		let elementWidth = outerDivJS.clientWidth

		elementHeight -=
			parseFloat(computedStyle.paddingTop) +
			parseFloat(computedStyle.paddingBottom)
		elementWidth -=
			parseFloat(computedStyle.paddingLeft) +
			parseFloat(computedStyle.paddingRight)

		const computedStyleInner = getComputedStyle(innerDiv)
		let elementHeightIn = innerDiv.clientHeight
		let elementWidthIn = innerDiv.clientWidth

		elementHeightIn -=
			parseFloat(computedStyleInner.paddingTop) +
			parseFloat(computedStyleInner.paddingBottom)
		elementWidthIn -=
			parseFloat(computedStyleInner.paddingLeft) +
			parseFloat(computedStyleInner.paddingRight)

		var scaleDiv = twitterElm.querySelector('.more-inner')

		var scale
		scale = Math.min(
			elementWidth / elementWidthIn,
			elementHeight / elementHeightIn
		)

		if (scale > 1) {
			scale = 1
		}

		scaleDiv.style.transform = 'scale(' + scale + ')'
		scaleDiv.style.transforOrigin = 'center left'
	}, 100)

	body.innerHTML = ''
	body?.appendChild(twitterElm)
	// Create a popup window.
	// Show the tweet in that window.
	// Let user edit the tweet.
	// Show a save button.
}

export function confirmTweetEditing(e) {
	// Maybe delete the cloned element.
	// Update the tweet text.
	// Hide the popup window.
	const tweetTextElm = document.querySelector(
		'[data-cloned-tweet] [data-t-text]'
	)

	document.querySelector('[data-t-text]').innerHTML = formatText(
		tweetTextElm.innerHTML
	)

	hideTweetEditor()
	generateTweetCanvas()
}

export function hideTweetEditor() {
	const elm = document.querySelector('[data-tweet-editor-modal]')
	elm?.classList.add('invisible', 'opacity-0')
}

function formatAMPM(dd) {
	let date = new Date(dd)
	let hours = date.getHours()
	let minutes = date.getMinutes()
	let ampm = hours >= 12 ? 'PM' : 'AM'
	hours = hours % 12
	hours = hours ? hours : 12 // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes

	return hours + ':' + minutes + ' ' + ampm
}

function formateDate(dd) {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	let date = new Date(dd)
	var month = monthNames[date.getMonth()]
	var day = date.getDate()
	var year = date.getFullYear()
	var strTime = month + ' ' + day + ', ' + year
	return strTime
}

function findHashTags(searchText) {
	var regexp = /\B\#\w\w+\b/gm
	const result = searchText.match(regexp)

	if (result) {
		return result
	} else {
		return false
	}
}

function findAtTags(searchText) {
	var regexp = /\B\@\w\w+\b/gm
	const result = searchText.match(regexp)
	if (result) {
		return result
	} else {
		return false
	}
}

function nFormatter(num, digits = 1) {
	const lookup = [
		{ value: 1, symbol: '' },
		{ value: 1e3, symbol: 'K' },
		{ value: 1e6, symbol: 'M' },
		{ value: 1e9, symbol: 'G' },
		{ value: 1e12, symbol: 'T' },
		{ value: 1e15, symbol: 'P' },
		{ value: 1e18, symbol: 'E' },
	]
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
	var item = lookup
		.slice()
		.reverse()
		.find(function (item) {
			return num >= item.value
		})
	return item
		? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
		: '0'
}

function generateTweetCanvas() {
	var fix_screen = 559
	var fix_scale = 5.7
	var new_width = $('[data-twitter-flag]').width()
	var cal_width = new_width / fix_screen
	var dd = fix_scale / cal_width
	let element = document.querySelector('[data-twitter-flag]')

	domtoimage
		.toPng(element, {
			width: element.clientWidth * dd,
			height: element.clientHeight * dd,
			style: {
				transform: 'scale(' + dd + ')',
				'transform-origin': 'top left',
			},
		})
		.then(function (dataUrl) {
			if (document.querySelector('.new_url')) {
				document.querySelector('.new_url').value = dataUrl
			} else {
				$('body').append(
					'<input type="hidden" class="new_url" value="' +
						dataUrl +
						'"/>'
				)
			}
			$("[name='add']").removeAttr('disabled')
		})
		.catch(function (error) {
			console.error('oops, something went wrong!', error)
		})
}
