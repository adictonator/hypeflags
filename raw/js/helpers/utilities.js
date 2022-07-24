export const toggleClasses = (el, ...cls) =>
	cls.map((cl) => el.classList.toggle(cl))

export const bytesToMegaBytes = (bytes) => bytes / 1024 ** 2

export const addGalleryLoader = (elm) => {
	const loader = document.createElement('div')
	loader.classList.add('bg-stone-100')
	loader.id = 'custom-loader-buffer'

	elm.appendChild(loader)
}

export const removeGalleryLoader = () => {
	// @todo: maybe add a fade-in effect here?
	document.getElementById('custom-loader-buffer').remove()
}
