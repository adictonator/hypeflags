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
	var num = Math.floor(Math.random() * 9)

	//$('#tweet-url').val(URLs[num]).trigger('change')
	document.getElementById('tweet-url').value = URLs[num]
	document.getElementById('tweet-url')?.dispatchEvent(new Event('change'))
}

export function UpdateTweetScreen(event) {
	$('.product-single__photos').append('<div id="custom-loader-buffer"></div>')

	console.log('reodd')

	//const _parent = $(this).parent()
	//_parent.removeClass('error success')
	document.querySelector("[name='add']")?.setAttribute('disabled', 'disabled')

	const urls = event.target.value
	let parts = urls.split('/')
	let last_part = parts[parts.length - 1]
	last_part = last_part.match(/\d+/)
	//let unique_id = Math.floor(Math.random() * 26) + Date.now()
	//unique_id = unique_id.toString()

	fetch('https://backend.hypeflag.com/tweet/index.php?id=' + last_part)
		.then((resp) => resp.json())
		.then((data) => {
			// | Tweet not fount OR private tweet.
			if (data.doc1.errors) {
				//_parent.addClass('error')

				if (data.doc1.errors[0].title == 'Authorization Error') {
					TweetError('Sorry, private tweets are not supported.')
				} else {
					TweetError('Tweet not found, please try again')
				}
				return false
			}

			// | Tweet contain more than one image.
			if (data.doc2.photos) {
				if (data.doc2.photos.length > 1) {
					//_parent.addClass('error')

					$('.tooltip').text(
						'Sorry, tweets containing more than one image are not supported.'
					)
					return false
				}
			}

			updateTweetContent(data)
		})
		.catch((jqXHR, exception) => {
			//_parent.addClass('error')
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
				msg = 'Uncaught Error.\n' + jqXHR.responseText
			}
			TweetError(msg)
		})
}

function updateElements(element, content) {
	document.querySelector(element).innerHTML = content
}

function updateTweetContent(tweetData) {
	const meta = tweetData.doc1.data
	const data = tweetData.doc2
	const time = formatAMPM(data.created_at)
	const date = formateDate(data.created_at)

	$('#custom-loader-buffer').fadeOut('slow', function () {
		$(this).remove()
	})

	// Update user avatar.
	document
		.querySelector('[data-t-user-avatar]')
		?.setAttribute('src', data.user.profile_image_url_https)
	// Update user name.
	updateElements('[data-t-user-name]', data.user.name)
	updateElements('[data-t-user-handle]', '@' + data.user.screen_name)
	updateElements('[data-t-text]', data.text)
	updateElements('[data-t-time]', time)
	updateElements('[data-t-date]', date)
	updateElements('[data-t-device]', meta.source)
	updateElements('[data-t-likes]', nFormatter(data.favorite_count))
	updateElements(
		'[data-t-retweets]',
		nFormatter(meta.public_metrics.retweet_count)
	)
}

function tweetTemplate(themeClass, design) {
	let tweet = htmlTweet
	let html = ''
	html += '<div class="tweet-flag-wrap"><div class="tweet_flag_wrap_inner">'
	html += '<div class="upper_dots" data-html2canvas-ignore></div>'
	html += '<div class="bottom_dots" data-html2canvas-ignore></div>'
	html += '<div class="tweet_flag_box ' + themeClass + '" id="flagBox">'
	html += '<div class="tweet_flag_box_inner">'
	html += '<div class="twitter_wrapper ">'
	html += '<div class="twitt_head">'
	html +=
		'<div class="twitt_u_img"><img src="' +
		tweet.user.profile_image_url_https +
		'" alt=""></div>'
	html += '<div class="twitt_u_info">'
	html += '<strong>' + tweet.user.name

	if (tweet.user.verified) {
		html +=
			'<svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>'
	}
	if (tweet.text) {
		let text = tweet.text
		if (tweet.entities.hashtags.length > 0) {
			$.each(tweet.entities.hashtags, function (inx, val) {
				text = text.replace(
					'#' + val.text,
					"<span class='hashtag'>#" + val.text + '</span>'
				)
			})
		}
		if (tweet.entities.user_mentions.length > 0) {
			$.each(tweet.entities.user_mentions, function (inx, val) {
				text = text.replace(
					'@' + val.screen_name,
					"<span class='atrate'>@" + val.screen_name + '</span>'
				)
			})
		}
		if (tweet.entities.media) {
			if (tweet.entities.media.length > 0) {
				$.each(tweet.entities.media, function (inx, val) {
					text = text.replace(val.url, '')
				})
			}
		}
		if (tweet.entities.urls.length > 0) {
			$.each(tweet.entities.urls, function (inx, val) {
				text = text.replace(val.url, '')
			})
		}
		if (design == 'temp') {
			html +=
				'<pre id="twitterText" contenteditable="true">' +
				text +
				'</pre>'
		}
		if (design == 'popup') {
			html +=
				'<pre class="editable_text" id="editable_text">' +
				text +
				'</pre>'
		}
	}
	if (tweet.photos) {
		if (tweet.photos.length > 0) {
			$.each(tweet.photos, function (inx, val) {
				html +=
					'<div class="twitt_img"><img src="' +
					val.url +
					'" alt="tweet"></div>'
			})
		}
	}
	if (tweet.video) {
		html += '<div class="twitt_video"><div class="tweet_video_img">'
		html += '<img src="' + tweet.video.poster + '" alt="tweet">'
		html +=
			'<span class="current_views">' +
			tweet.video.viewCount +
			' VIEWS</span>'
		html +=
			'<button class="play_tweet_video"><i class="fa fa-play-circle-o" aria-hidden="true"></i></button>'
		html += '</div></div>'
	}
	let time = formatAMPM(tweet.created_at)
	let date = formateDate(tweet.created_at)
	html +=
		'<div class="tweet_time"><span>' +
		time +
		'</span><span class="dot"></span>' +
		date +
		'<span class="dot"></span><span style="color:#1da1f2">' +
		FromDoc.data.source +
		'</span></div>'

	//       if(tweet.conversation_count >= 1000){
	//         var comments = (tweet.conversation_count / 1000).toFixed(1) + 'K';
	//       }else{ var comments = tweet.conversation_count; }

	// Retweets
	if (retweets >= 1000) {
		retweets = (retweets / 1000).toFixed(1) + 'K'
	}

	if (tweet.favorite_count >= 1000) {
		var likes = (tweet.favorite_count / 1000).toFixed(1) + 'K'
	} else {
		var likes = tweet.favorite_count
	}

	html +=
		'<div class="tweet_reactions"><div><strong>' +
		retweets +
		'</strong><span>Retweets</span></div><div><strong>' +
		likes +
		'</strong><span>Likes</span></div></div>'
	html += '<div class="tweet_action_count">'
	html += '<ul>'
	html +=
		'<li class="t_comments"><svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg></li>'
	html +=
		'<li class="t_likes"><svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg></li>'
	html +=
		'<li class="t_likes"><svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg></li>'
	html +=
		'<li class="t_likes"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g><path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path><path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path></g></svg></li>'
	html +=
		'</ul></div><a href="javascript:void(0);" class="t_popup_toggle"></a></div></div></div></div></div>'
	return html
}

function TweetError(error) {
	// create an element to display the error message.
	const element = document.createElement('div')
	element.classList.add('tweet-error')
	element.innerHTML = error
	document.body.appendChild(element)
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
}

export function showTweetEditor(event) {
	const elm = document.querySelector('[data-tweet-editor-modal]')
	elm?.classList.remove('hidden')
	elm?.classList.add('flex')

	const body = document.querySelector('[data-tweet-editor]')
	const twitterElm = document
		.querySelector('[data-twitter-flag]')
		?.cloneNode(true)

	twitterElm?.removeAttribute('data-twitter-flag')
	twitterElm.setAttribute('data-cloned-tweet', true)

	twitterElm
		.querySelector('[data-t-text]')
		?.setAttribute('contentEditable', true)

	setTimeout(function () {
		twitterElm.querySelector('[data-t-text]').focus()
	}, 0)

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

	document.querySelector('[data-t-text]').innerHTML = tweetTextElm.innerHTML

	hideTweetEditor()
}

export function hideTweetEditor() {
	const elm = document.querySelector('[data-tweet-editor-modal]')
	elm?.classList.add('hidden')
	elm?.classList.remove('flex')
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
	var regexp = /\B\#\w\w+\b/g
	const result = searchText.match(regexp)

	if (result) {
		return result
	} else {
		return false
	}
}

function findAtTags(searchText) {
	var regexp = /\B\@\w\w+\b/g
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
