const urls = [
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

export default function TweetInspiration() {
	const idx = Math.floor(Math.random() * 9)

	document.getElementById('tweet-url').value = urls[idx]
	document.getElementById('tweet-url')?.dispatchEvent(new Event('change'))
}
