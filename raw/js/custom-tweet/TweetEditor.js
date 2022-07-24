import { formatText, handleFlagResize } from './TweetFlagUtilities'

const elms = {
	tweetFlag: document.querySelector('[data-twitter-flag]'),
	modal: document.querySelector('[data-tweet-editor-modal]'),
	editor: document.querySelector('[data-tweet-editor]'),
}

export default function TweetEditor() {
	initEventListeners()
	showTweetEditor()
}

const initEventListeners = () => {
	// Confirm tweet editing.
	document
		.querySelector('[data-confirm-edit]')
		?.addEventListener('click', () => confirmTweetEditing())

	// Cancel tweet editing.
	document
		.querySelector('[data-cancel-edit]')
		?.addEventListener('click', () => hideTweetEditor())
}

const showTweetEditor = () => {
	const twitterElm = elms.tweetFlag?.cloneNode(true)

	if (elms.tweetFlag.parentElement.classList.contains('dark')) {
		elms.editor.classList.add('dark')
	} else {
		elms.editor.classList.remove('dark')
	}

	twitterElm?.removeAttribute('data-twitter-flag')
	twitterElm.setAttribute('data-cloned-tweet', true)
	twitterElm
		.querySelector('[data-t-text]')
		?.setAttribute('contentEditable', true)

	// The flag will resize as the user update tweet text.
	twitterElm.querySelector('[data-t-text]').addEventListener('input', () => {
		handleFlagResize(outerDivJS, innerDiv)
	})

	const outerDivJS = twitterElm.querySelector('.inner')
	const innerDiv = twitterElm.querySelector('.more-inner')

	setTimeout(function () {
		elms.modal?.classList.remove('invisible', 'opacity-0')
		//elm?.classList.add('flex')
		twitterElm.querySelector('[data-t-text]').focus()

		// Resizing modal one.
		handleFlagResize(outerDivJS, innerDiv)
	}, 0)

	elms.editor.innerHTML = ''
	elms.editor?.appendChild(twitterElm)
}

export const confirmTweetEditing = () => {
	// Maybe delete the cloned element?.

	// Get updated tweet text.
	const tweetTextElm = document.querySelector(
		'[data-cloned-tweet] [data-t-text]'
	)

	// Update the tweet text.
	document.querySelector('[data-t-text]').innerHTML = formatText(
		tweetTextElm.innerHTML
	)

	// Resize the tweet flag again.
	const outerDiv = document.querySelector('.inner')
	const innerDiv = document.querySelector('.more-inner')
	handleFlagResize(outerDiv, innerDiv)

	// Hide the popup window.
	hideTweetEditor()
}

const hideTweetEditor = () => {
	elms.modal.classList.add('invisible', 'opacity-0')
}
