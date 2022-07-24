const elms = {
	dropper: document.querySelector('[data-eye-dropper]'),
}

export default function EyeDropper() {
	elms.dropper?.addEventListener('click', () => initDropper())
}

const initDropper = () => {
	console.log('here dropper')
	const workIMG = document.querySelector('.cropper-canvas img')
	let glass = document.querySelector('.img-magnifier-glass')
	const zoom = 3
	var x = 0,
		y = 0,
		w,
		h

	if (glass === null) {
		glass = document.createElement('div')
		glass.classList.add('img-magnifier-glass')
		glass.style.backgroundImage = "url('" + workIMG.src + "')"
		glass.style.backgroundRepeat = 'no-repeat'
		glass.style.backgroundSize =
			workIMG.width * zoom + 'px ' + workIMG.height * zoom + 'px'

		/* Insert magnifier glass: */
		workIMG.parentElement.insertBefore(glass, workIMG)
	}

	w = glass.offsetWidth / 2
	h = glass.offsetHeight / 2

	// Let dropper have access to the child image.
	$('.cropper-drag-box').css('z-index', '-1')
	//cropper.clear()

	$('.cropper-canvas').css('cursor', 'crosshair')

	//_parent.addClass('eye-drop-active')
	//_parentMob.addClass('eye-drop-active')
}
