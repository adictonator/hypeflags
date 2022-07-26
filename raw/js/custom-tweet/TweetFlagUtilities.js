import domtoimage from 'dom-to-image'

export const handleFlagResize = (outerElm, innerElm) => {
	if (!outerElm || !innerElm) return

	const computedStyle = getComputedStyle(outerElm)
	let scale
	let elementHeight = outerElm.clientHeight
	let elementWidth = outerElm.clientWidth

	elementHeight -=
		parseFloat(computedStyle.paddingTop) +
		parseFloat(computedStyle.paddingBottom)
	elementWidth -=
		parseFloat(computedStyle.paddingLeft) +
		parseFloat(computedStyle.paddingRight)

	const computedStyleInner = getComputedStyle(innerElm)
	let elementHeightIn = innerElm.clientHeight
	let elementWidthIn = innerElm.clientWidth

	elementHeightIn -=
		parseFloat(computedStyleInner.paddingTop) +
		parseFloat(computedStyleInner.paddingBottom)
	elementWidthIn -=
		parseFloat(computedStyleInner.paddingLeft) +
		parseFloat(computedStyleInner.paddingRight)

	scale = Math.min(
		elementWidth / elementWidthIn,
		elementHeight / elementHeightIn
	)

	if (scale > 1) {
		scale = 1
	}

	innerElm.style.transform = `scale(${scale})`
	innerElm.style.transformOrigin = 'top left'
}

export const formatAMPM = (dd) => {
	let date = new Date(dd)
	let hours = date.getHours()
	let minutes = date.getMinutes()
	let ampm = hours >= 12 ? 'PM' : 'AM'
	hours = hours % 12
	hours = hours ? hours : 12 // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes

	return hours + ':' + minutes + ' ' + ampm
}

/**
 * Color code #hashtags and [at] tags in the tweet.
 *
 * @param {string} tweetText
 * @returns string tweetText
 */
export const formatText = (tweetText) => {
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

export const formateDate = (dd) => {
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

export const findHashTags = (searchText) => {
	var regexp = /\B\#\w\w+\b/gm
	const result = searchText.match(regexp)

	if (result) {
		return result
	} else {
		return false
	}
}

export const findAtTags = (searchText) => {
	var regexp = /\B\@\w\w+\b/gm
	const result = searchText.match(regexp)
	if (result) {
		return result
	} else {
		return false
	}
}

export const nFormatter = (num, digits = 1) => {
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

export const generateTweetCanvas = async () => {
	var fix_screen = 559
	var fix_scale = 5.7
	var new_width = $('[data-twitter-flag]').width()
	var cal_width = new_width / fix_screen
	var dd = fix_scale / cal_width
	let element = document.querySelector('[data-twitter-flag]')

	return await domtoimage
		.toPng(element, {
			width: element.clientWidth * dd,
			height: element.clientHeight * dd,
			//style: {
			//	transform: 'scale(' + dd + ')',
			//	'transform-origin': 'top left',
			//},
		})
		.then(function (dataUrl) {
			var img = new Image()
			img.src = dataUrl
			document.querySelector('#lmao').appendChild(img)

			return
			// @todo: fix this sitty code.
			if (document.querySelector('.new_url')) {
				document.querySelector('.new_url').value = dataUrl
			} else {
				$('body').append(
					'<input type="hidden" class="new_url" value="' +
						dataUrl +
						'"/>'
				)
			}
		})
		.catch(function (error) {
			console.error('oops, something went wrong!', error)
		})
}

export const removeTweetError = () => {
	// Hide flag UI.
	document.querySelector('[data-twitter-flag]').classList.remove('hidden')
	// Hide edit button.
	document.querySelector('[data-edit-tweet]').classList.remove('hidden')

	if (document.querySelector('[data-tweet-error]')) {
		document.querySelector('[data-tweet-error]').remove()
	}
}

export const updateElements = (element, content) => {
	document.querySelector(element).innerHTML = content
}

export const fetchTweet = async (endpoint) => {
	return await fetch(endpoint)
		.then((resp) => resp.json())
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
			//displayError(msg)
		})
}
