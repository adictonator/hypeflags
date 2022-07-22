export default function CartLogic() {
	const elements = {
		defaultPreviewText: 'Preview Custom Flag',
		loadingPreviewText: 'Loading...',
		previewLink: document.querySelectorAll('[data-preview-custom]'),
		modalWrapper: '[data-modal-custom]',
	}

	document.addEventListener('DOMContentLoaded', () => {
		// Assign click event to the all the preview links.
		elements.previewLink.forEach((elm) =>
			elm.addEventListener('click', (e) => {
				e.preventDefault()
				previewCustomFlag(e.target)
			})
		)
	})

	const previewCustomFlag = (elm) => {
		const previewSrc = elm.getAttribute('href')

		elm.innerHTML = elements.loadingPreviewText

		const tmpImg = new Image()

		tmpImg.onload = () => {
			showModal(tmpImg)
		}
		tmpImg.src = previewSrc
	}

	const showModal = (image) => {
		const modal = document.createElement('div')
		modal.setAttribute('data-modal-custom', '')
		modal.classList.add(
			'fixed',
			'inset-0',
			'bg-black/70',
			'z-50',
			'flex',
			'items-center',
			'justify-center',
			'h-screen'
		)
		const modalBody = document.createElement('div')
		modalBody.classList.add(
			'p-3',
			'md:p-5',
			'max-w-xs',
			'sm:max-w-[600px]',
			'w-full',
			'bg-white',
			'flex',
			'items-center',
			'flex-col',
			'justify-center',
			'rounded-lg',
			'shadow-lg'
		)

		const closePreviewBtn = document.createElement('button')
		closePreviewBtn.innerHTML = 'Close Preview'
		closePreviewBtn.type = 'button'
		closePreviewBtn.classList.add('primary-btn', 'sm:mt-5', 'mt-3')
		closePreviewBtn.setAttribute('data-close', 'close')
		closePreviewBtn.onclick = () => {
			closePreview()
		}

		modalBody.appendChild(image)
		modalBody.appendChild(closePreviewBtn)
		modal.appendChild(modalBody)

		document.body.appendChild(modal)
	}

	const closePreview = () => {
		document.querySelector(elements.modalWrapper).remove()
		elements.previewLink.forEach(
			(elm) => (elm.innerHTML = elements.defaultPreviewText)
		)
	}
}
