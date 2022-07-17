export default function QuantityLogic() {
	const elements = {
		addBtn: document.querySelector('[data-qty="add"]'),
		subBtn: document.querySelector('[data-qty="sub"]'),
		inputElm: document.querySelector('input[name="quantity"]'),
		get getQty() {
			return parseInt(this.inputElm.value)
		},
		set setQty(value) {
			this.inputElm.value = value
		},
	}

	document.addEventListener('DOMContentLoaded', () => {
		document.querySelectorAll('[data-qty]').forEach((value) => {
			value.addEventListener('click', (e) => {
				const type = e.target.dataset.qty
				let newQty = elements.getQty

				if ('add' === type) {
					newQty++

					elements.subBtn.removeAttribute('disabled')
				} else {
					if (elements.getQty > 1) {
						newQty--
					}

					if (newQty <= 1) {
						elements.subBtn.setAttribute('disabled', 'disbaled')
					}
				}
				elements.setQty = newQty
			})
		})
	})
}
