import {
	SwitchTweetTheme,
	TwitterInspiration,
	UpdateTweetScreen,
} from './TwitterInspiration'

document
	.getElementById('tweet-inspiration')
	?.addEventListener('click', (event) => TwitterInspiration(event))

document
	.getElementById('tweet-url')
	?.addEventListener('change', (event) => UpdateTweetScreen(event))

// Fetch initial tweet on page load.
document.getElementById('tweet-url')?.dispatchEvent(new Event('change'))

// Switch tweet theme.
document
	.querySelector('[name=theme]')
	?.addEventListener('click', (event) => SwitchTweetTheme(event))
