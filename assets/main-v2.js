ondragover = function (e) {
	e.preventDefault()
	return false
}

ondrop = function (e) {
	e.preventDefault()
	return false
}

// @todo: temp functions/ delete these.
const addGalleryLoader = (elm) => {
	const loader = document.createElement('div')
	loader.classList.add('bg-stone-100')
	loader.id = 'custom-loader-buffer'

	elm.appendChild(loader)
}
// @todo: temp functions/ delete these.
const removeGalleryLoader = () => {
	// @todo: maybe add a fade-in effect here?
	document.getElementById('custom-loader-buffer')?.remove()
}

const validImageTypes = ['image/png', 'image/jpeg']

function dropHandler(ev) {
	ev.preventDefault()

	if (ev.dataTransfer.items && ev.dataTransfer.items.length > 1) {
		alert('Sorry, you can only upload one file at a time!')
		return false
	}

	if (ev.dataTransfer.items) {
		const [item] = ev.dataTransfer.items

		if (item.kind === 'file') {
			const file = item.getAsFile()
			doSomething(file)
		}
	}
}

document
	.querySelector('[data-custom-flag-upload-wrapper]')
	.addEventListener('drop', (e) => dropHandler(e))
/**
 * Color picker functionlity.
 * Pickr library.
 *
 * @ts-ignore
 */
const pickr = Pickr.create({
	el: '.hype-color-picker--pickr',
	theme: 'nano',
	showAlways: true,
	lockOpacity: true,
	inline: true,
	default: '#000000',
	useAsButton: true,
	components: {
		preview: false,
		opacity: false,
		hue: true,
		interaction: {
			input: true,
		},
	},
})

const pickrMob = Pickr.create({
	el: '.hype-color-picker--pickr-mob',
	theme: 'classic',
	showAlways: true,
	lockOpacity: true,
	inline: true,
	default: '#000000',
	useAsButton: true,
	components: {
		preview: false,
		opacity: false,
		hue: true,
		interaction: {
			input: true,
		},
	},
})

const _parent = $(this).parents('.hype-color-picker')
const _parentMob = $(this).parents('.hype-cropper-cp--mob')
const zoom = 3

// Get current state of the crop box.
var imgW = document.body.querySelector('.hype-cropper__body--image'),
	canvas = document.getElementById('cs'),
	glass = document.querySelector('.img-magnifier-glass')

pickr.on('change', (color, source, instance) => {
	$('.hype-cropper__body--image, span[data-hex-color]').css(
		'background',
		color.toHEXA().toString()
	)
	$('span[data-hex-code] input').val(
		color.toHEXA().toString().replace('#', '')
	)
})
pickrMob.on('change', (color, source, instance) => {
	$('.hype-cropper__body--image, span[data-hex-color]').css(
		'background',
		color.toHEXA().toString()
	)
	$('span[data-hex-code] input').val(
		color.toHEXA().toString().replace('#', '')
	)
})

// @ts-ignore
var Cropper = window.Cropper
var URL = window.URL || window.webkitURL
var container = document.querySelector('.hype-cropper__body--image')
var image = container?.getElementsByTagName('img').item(0)
var download = document.getElementById('download')
var actions = document.getElementById('actions')
var dataX = document.getElementById('dataX')
var dataY = document.getElementById('dataY')
var dataHeight = document.getElementById('dataHeight')
var dataWidth = document.getElementById('dataWidth')
var dataRotate = document.getElementById('dataRotate')
var dataScaleX = document.getElementById('dataScaleX')
var dataScaleY = document.getElementById('dataScaleY')
var Color = '#000000'

var options = {
	preview: '.img-preview',
	background: false,
	aspectRatio: 5 / 3,
	dragMode: 'none',
	viewmode: 1,
	zoomOnWheel: false,
	zoomOnTouch: false,
	modal: false,
	ready: function (e) {
		var cropper = this.cropper
		var imageData = cropper.getImageData()
		const minSliderZoom = imageData.width / imageData.naturalWidth
		const maxZoom = minSliderZoom + minSliderZoom

		cropper.zoomTo(minSliderZoom)
		$('#hype-zoom--slider').slider('option', 'max', maxZoom)
		$('#hype-zoom--slider').slider('option', 'min', 0.1)
		$('#hype-zoom--slider').slider('value', minSliderZoom)

		let range = $('#hype-zoom--slider span').css('left')
		$('body').find('.highlight').width(range)

		// Adjust cropper box width and position.
		const contData = cropper.getContainerData()
		const newWidth = contData.width - 150

		// Set it once so that we get new aspect ratio and correct height.
		cropper.setCropBoxData({
			width: newWidth,
		})

		// Now fetch the cropper data.
		const cropData = cropper.getCropBoxData()
		const newHorPos = (contData.width - newWidth) / 2
		const newVerPos = (contData.height - cropData.height) / 2

		cropper.setCropBoxData({
			left: newHorPos,
			top: newVerPos,
		})
	},
}
var cropper = new Cropper(image, options)
var originalImageURL = image.src

var uploadedImageType = 'image/jpeg'
var uploadedImageName = 'cropped.jpg'
var uploadedImageURL
var _cropperCache = cropper.getCropBoxData()

// Buttons
if (!document.createElement('canvas').getContext) {
	$('button[data-method="getCroppedCanvas"]').prop('disabled', true)
}

if (typeof document.createElement('cropper').style.transition === 'undefined') {
	$('button[data-method="rotate"]').prop('disabled', true)
	$('button[data-method="scale"]').prop('disabled', true)
}

// Methods

$('body').on('click', '[data-method]', function (event) {
	var e = event || window.event
	var target = e.target || e.srcElement
	var cropped
	var result
	var input
	var data
	var Color =
		$('.hype-cropper__body--image').css('background-color') || '#e5e5e5'

	if (!cropper) {
		return
	}

	while (target !== this) {
		if (target.getAttribute('data-method')) {
			break
		}

		target = target.parentNode
	}

	data = {
		method: target.getAttribute('data-method'),
		target: target.getAttribute('data-target'),
		option: target.getAttribute('data-option') || undefined,
		secondOption: target.getAttribute('data-second-option') || undefined,
	}

	cropped = cropper.cropped

	if (data.method) {
		if (typeof data.target !== 'undefined') {
			input = document.querySelector(data.target)

			if (!target.hasAttribute('data-option') && data.target && input) {
				try {
					data.option = JSON.parse(input.value)
				} catch (e) {
					console.log(e.message)
				}
			}
		}

		switch (data.method) {
			case 'rotate':
				if (cropped && options.viewMode > 0) {
					cropper.clear()
				}

				break

			case 'getCroppedCanvas':
				if ($.isEmptyObject(cropper.getCropBoxData())) {
					console.log('in here', _cropperCache)
					cropper.crop()
					cropper.setCropBoxData(_cropperCache)
				}

				try {
					data.option = JSON.parse(data.option)
				} catch (e) {
					console.log(e.message)
				}

				if (uploadedImageType === 'image/jpeg') {
					if (!data.option) {
						data.option = {}
					}

					data.option.fillColor = Color
				}

				break
		}

		result = cropper[data.method](data.option, data.secondOption)

		switch (data.method) {
			case 'rotate':
				if (cropped && options.viewMode > 0) {
					cropper.crop()
				}

				break

			case 'scaleX':
			case 'scaleY':
				target.setAttribute('data-option', -data.option)
				break

			case 'getCroppedCanvas':
				if (result) {
					const sliderContainer = document.querySelector(
						'.product-single-gallery'
					)
					const sliderImage = sliderContainer.querySelector(
						'img[data-index="1"]'
					)
					const canvasContainer = sliderImage.parentElement
					canvasContainer.classList.add(
						'flex',
						'justify-center',
						'items-center',
						'bg-stone-100'
					)
					canvasContainer.style.height = 'auto'

					// Show the loader.
					addGalleryLoader(sliderContainer)

					var data_url = result.toDataURL()
					var width_C = result.width
					var height_C = result.height
					if (width_C <= 565) {
						width_C = 565
					}
					if (height_C <= 350) {
						height_C = 350
					}

					// Hide cropper modal.
					$('.hype-cropper-wrapper').fadeOut()
					const can = document.createElement('canvas')
					const ctx = can.getContext('2d')
					var img = new Image()
					img.crossOrigin = 'anonymous'
					can.width = width_C
					can.height = height_C

					ctx.clearRect(0, 0, can.width, can.height)

					img.onload = function () {
						var x = $('.img-container').attr('x')
						var y = $('.img-container').attr('y')
						ctx.fillStyle = Color

						ctx.fillRect(0, 0, can.width, can.height)
						ctx.drawImage(img, 0, 0, can.width, can.height)

						var get_bas = can.toDataURL('image/png')
						$('.new_url').remove()
						$('body').append(
							"<input type='hidden' class='new_url' value='" +
								get_bas +
								"'/>"
						)

						var base_64 = can.toDataURL()

						sliderImage.setAttribute('src', base_64)

						const dummyWrap = document.createElement('div')
						dummyWrap.classList.add(
							'relative',
							'custom-gromm',
							'sm:m-5',
							'm-4'
						)
						dummyWrap.appendChild(sliderImage)
						dummyWrap.classList.add('shadow-lg')
						canvasContainer?.appendChild(dummyWrap)

						$("[name='add']").removeAttr('disabled')

						setTimeout(function () {
							removeGalleryLoader()
						}, 500)
					}
					img.src = data_url

					window.scroll({
						top: 0,
						behavior: 'smooth',
					})

					document.documentElement.style.overflow = 'visible'
				}

				break

			case 'destroy':
				cropper = null

				if (uploadedImageURL) {
					URL.revokeObjectURL(uploadedImageURL)
					uploadedImageURL = ''
					image.src = originalImageURL
				}

				break
		}

		if (typeof result === 'object' && result !== cropper && input) {
			try {
				input.value = JSON.stringify(result)
			} catch (e) {
				console.log(e.message)
			}
		}
	}
})

// Zoom slider functionality.
$('#hype-zoom--slider').slider({
	slide: function (event, ui) {
		let range = $(ui.handle).css('left')
		let perc = 0
		$('body').find('.highlight').width(range)

		perc = ui.value * 100

		$('[data-crop-zoom]').html(perc.toFixed(0) + '%')

		if (cropper) {
			cropper.zoomTo(ui.value)
		}
	},
})

document.body.onkeydown = function (event) {
	var e = event || window.event

	if (e.target !== this || !cropper || this.scrollTop > 300) {
		return
	}

	switch (e.keyCode) {
		case 37:
			e.preventDefault()
			cropper.move(-1, 0)
			break

		case 38:
			e.preventDefault()
			cropper.move(0, -1)
			break

		case 39:
			e.preventDefault()
			cropper.move(1, 0)
			break

		case 40:
			e.preventDefault()
			cropper.move(0, 1)
			break
	}
}

// Import image
var inputImage = document.getElementById('custom-flag-image')

if (inputImage && URL) {
	inputImage.onchange = function () {
		const [file] = this.files

		doSomething(file)
	}
}

function doSomething(file) {
	if (cropper && file) {
		var file_size = file.size

		if (file_size > 9000000) {
			const text =
				'File size too large. Please upload a file less than 9MB.'
			displayCropperErrorPopup(
				'Upload Failed',
				text,
				'warning warning--red'
			)
			return false
		} else {
			var fileType = file.type

			if ($.inArray(fileType, validImageTypes) < 0) {
				const text = 'File type not allowed. Please upload PNG or JPEG.'

				displayCropperErrorPopup(
					'Upload Failed',
					text,
					'warning warning--red'
				)

				return false
			}
		}

		$('#Color_data').val('#000')

		var reader = new FileReader()

		let tempHasError = false
		reader.onload = function (e) {
			let width
			var image = new Image()
			image.crossOrigin = 'anonymous'
			image.onload = function () {
				width = image.width
				const height = image.height

				if (width <= 499 || height <= 499) {
					const text =
						'File resolution too low. Please upload an image with minimum 500px resolution.'
					displayCropperErrorPopup(
						'Upload Failed',
						text,
						'warning warning--red'
					)
					$('.hype-cropper-wrapper, .cross-cropper').hide()
					tempHasError = true
					document
						.querySelector('[data-custom-flag-upload-wrapper]')
						.classList.remove('hidden')
					document
						.querySelector('[data-temp-wrapper]')
						.classList.add('hidden')
					return false
				} else if (width <= 999 || height <= 999) {
					$('.low-res-warning-indicator').addClass('visible')
				} else {
					$('.low-res-warning-indicator').removeClass('visible')
				}
			}
			image.src = e.target.result
			console.log('weq', tempHasError)

			window.scroll({
				top: 0,
				behavior: 'smooth',
			})

			document.documentElement.style.overflow = 'hidden'
		}

		reader.readAsDataURL(file)

		if (/^image\/\w+/.test(file.type)) {
			uploadedImageType = file.type

			if (uploadedImageURL) {
				URL.revokeObjectURL(uploadedImageURL)
			}

			image.src = uploadedImageURL = URL.createObjectURL(file)
			cropper.destroy()

			if (!tempHasError) {
				document
					.querySelector('[data-temp-wrapper]')
					.classList.remove('hidden')
				document
					.querySelector('[data-custom-flag-upload-wrapper]')
					.classList.add('hidden')
				document
					.querySelector('[data-temp-wrapper]')
					.classList.add('flex')

				document.querySelector('[data-tmp-file-name]').innerHTML =
					file.name
				document.querySelector('[data-tmp-file-size]').innerHTML = (
					file.size /
					1024 ** 2
				).toFixed(1)
				document.querySelector('[data-temp-preview]').src =
					uploadedImageURL
			}

			$('.hype-cropper-wrapper').fadeIn({
				duration: 'slow',
				start: function () {
					$(this).appendTo('body').css('display', 'grid')
					$(
						'<div id="custom-loader-buffer" class="bg-stone-100" style="z-index: 9999; position: absolute"></div>'
					).insertBefore('.hype-cropper__body--image')
				},
				complete: function () {
					removeGalleryLoader()
				},
			})

			$('.cross-cropper').show()

			cropper = new Cropper(image, options)
			inputImage.value = null
		} else {
			window.alert('Please choose an image file.')
		}
	}
}

/**
 * Eye dropper functionality.
 *
 */
$('.hype-eye-drop').on('click touch', function (e) {
	const workIMG = document.querySelector('.cropper-canvas img')
	var x = 0,
		y = 0,
		w,
		h

	if (glass === null) {
		glass = document.createElement('DIV')
		glass.setAttribute('class', 'img-magnifier-glass')
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
	cropper.clear()

	$('.cropper-canvas').css('cursor', 'crosshair')

	_parent.addClass('eye-drop-active')
	_parentMob.addClass('eye-drop-active')
})

$('body').on(
	'click touchstart touchmove mousemove',
	'.cropper-canvas img, .img-magnifier-glass',
	function (e) {
		const workIMG = document.querySelector('.cropper-canvas img')

		let x = 0,
			y = 0
		if ('touchstart' == e.type || 'touchmove' == e.type) {
			const touch =
				e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]
			var elm = $(this).offset()
			x = touch.pageX - elm.left
			y = touch.pageY - elm.top
		} else {
			if (e.offsetX) {
				x = e.offsetX
				y = e.offsetY
			} else if (e.layerX) {
				x = e.layerX
				y = e.layerY
			}
		}

		moveMagnifier(e, workIMG, glass, 50, 50, x, y, 3)

		useCanvas(canvas, workIMG, function () {
			const p = canvas.getContext('2d').getImageData(x, y, 1, 1).data

			const _color = rgbToHex(p[0], p[1], p[2])

			// Set image container background color.
			imgW.style.background = _color

			if ('click' == e.type || 'touchend' == e.type) {
				// Set Pickr color to the selected color.
				pickr.setColor(_color)
				pickrMob.setColor(_color)

				_parent.removeClass('eye-drop-active')
				_parentMob.removeClass('eye-drop-active')

				$('.cropper-canvas').css('cursor', 'default')
				$('.cropper-drag-box').css('z-index', '0')

				// Reinitialize cropper to previous state.
				cropper.crop()
				cropper.setCropBoxData(_cropperCache)
			}
		})
	}
)

function moveMagnifier(e, img, glass, w, h, x, y, zoom) {
	var pos
	const bw = 3
	/* Prevent any other actions that may occur when moving over the image */
	//   e.preventDefault();
	/* Get the cursor's x and y positions: */
	//   pos = getCursorPos(e, img);
	//   x = pos.x
	//   y = pos.y

	/* Prevent the magnifier glass from being positioned outside the image: */
	//   if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
	//   if (x < w / zoom) {x = w / zoom;}
	//   if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
	//   if (y < h / zoom) {y = h / zoom;}
	/* Set the position of the magnifier glass: */
	//   glass.style.left = (x - w) + "px";
	//   glass.style.top = (y - h) + "px";

	glass.style.left = x + 'px'
	glass.style.top = y + 'px'

	/* Display what the magnifier glass "sees": */
	glass.style.backgroundPosition =
		'-' + (x * zoom - w + bw) + 'px -' + (y * zoom - h + bw) + 'px'
}

// function getCursorPos(e, img) {
//   var a, x = 0, y = 0;
//   e = e || window.event;
//   /* Get the x and y positions of the image: */
//   a = img.getBoundingClientRect();
//   /* Calculate the cursor's x and y coordinates, relative to the image: */
//   x = e.pageX - a.left;
//   y = e.pageY - a.top;
//   /* Consider any page scrolling: */
//   x = x - window.pageXOffset;
//   y = y - window.pageYOffset;
//   return {x : x, y : y};
// }

function displayCropperErrorPopup(
	heading,
	text,
	type = 'error',
	trigger = null
) {
	$('.hype-cropper-popup__body')
		.find('h3')
		.text(heading)
		.parent()
		.find('p')
		.text(text)
		.parent()
		.attr('class', 'hype-cropper-popup__body ' + type)

	if (type == 'error') {
		$('.hype-cropper-popup__foot').html(
			'<button class="btn btn--tertiary btn--black" data-close-cropper-popup>Cancel</button><button class="btn" data-reset-cropper>Delete</button>'
		)
	} else {
		let attr = 'data-close-cropper-popup'

		if (trigger) attr = attr + '="' + trigger + '"'

		$('.hype-cropper-popup__foot').html(
			'<button class="btn btn btn--tertiary" ' +
				attr +
				' data-reset-cropper>Close</button>'
		)
	}

	$('.hype-cropper-popup-wrapper')
		.appendTo('body')
		.fadeIn({
			duration: 'slow',
			start: function () {
				$(this).css('display', 'grid')
			},
		})

	return false
}

// canvas function
function useCanvas(el, image, callback) {
	el.width = image.width // img width
	el.height = image.height // img height
	// draw image in canvas tag
	el.getContext('2d').drawImage(image, 0, 0, image.width, image.height)
	return callback()
}

// convert rgba to hex
// http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
	var hex = c.toString(16)
	return hex.length == 1 ? '0' + hex : hex
}
function rgbToHex(r, g, b) {
	return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}
