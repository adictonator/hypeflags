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

//     document.querySelectorAll('[data-method]').onclick = function(event) {
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
					//can.width = 585
					//can.height = 300
					const ctx = can.getContext('2d')

					//var can = document.getElementById('Canvas_data')
					var window_width = $(window).width()
					var img = new Image()
					img.crossOrigin = 'anonymous'
					can.width = width_C
					can.height = height_C

					ctx.clearRect(0, 0, can.width, can.height)

					//$('.main_product_slider [data-slick-index=0]')
					//	.find('div.ex1')
					//	.append('<div id="custom-loader-buffer"></div>')

					img.onload = function () {
						//                             can.width = width_C;
						//                             can.height = height_C;

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

						const sliderContainer = document.querySelector(
							'.product-single-gallery'
						)
						const sliderImage = sliderContainer.querySelector(
							'img[data-index="1"]'
						)
						sliderImage.setAttribute('src', base_64)
						sliderImage.style.maxWidth = '543px'

						const canvasContainer = sliderImage.parentElement
						canvasContainer?.classList.add(
							'flex',
							'justify-center',
							'items-center',
							'bg-stone-100'
						)
						canvasContainer.style.height = 'auto'

						const dummyWrap = document.createElement('div')
						dummyWrap.classList.add('relative', 'custom-gromm')
						dummyWrap.appendChild(sliderImage)
						dummyWrap.classList.add('shadow-lg')
						canvasContainer?.appendChild(dummyWrap)

						$("[name='add']").removeAttr('disabled')

						//$('.main_product_slider [data-slick-index=0]')
						//	.find('div.ex1')
						//	.css('opacity', '0.3')
						//setTimeout(function () {
						//$(
						//	".main_product_slider .slider-for__item img[data-index='1']"
						//)
						//	.parent()
						//	.fadeIn()

						//$('.main_product_slider [data-slick-index=0]')
						//	.find('div.ex1')
						//	.css('opacity', '1')

						//$('.main_product_slider [data-slick-index=0]')
						//	.find('div.ex1')
						//	.find('img')
						//	.attr({
						//		class: 'has-new-zoom',
						//		'data-magnify-src': '',
						//	})

						//let g = $(
						//	'.main_product_slider [data-slick-index=0]'
						//)
						//	.find('div.ex1')
						//	.find('img')
						//	.position()

						const g = document
							.querySelector(
								'.product-single-gallery img[data-index="1"]'
							)
							.getBoundingClientRect()

						console.log('bouding', g)

						let posBot = g.top + 5
						let posTop = g.top + 5

						if (window_width <= 750) {
							posBot = g.top + 3
							posTop = g.top + 3
						}

						canvasContainer.parentElement.style.setProperty(
							'--pos-bottom',
							posBot + 'px'
						)
						canvasContainer.parentElement.style.setProperty(
							'--pos-top',
							posTop + 'px'
						)

						//}, 1000)

						//$(
						//	".main_product_slider .slider-for__item img[data-index='1']"
						//).css({
						//	width: '94%',
						//})
						//$(
						//	".main_product_slider .slider-for__item img[data-index='1']"
						//)
						//	.parent()
						//	.css({
						//		'background-color': '#ebebeb',
						//	})

						//var height = $(
						//	".main_product_slider .slider-for__item img[data-index='2']"
						//)
						//	.parent()
						//	.height()
						//console.log(
						//	$(
						//		".main_product_slider .slider-for__item img[data-index='1']"
						//	)
						//		.parent()
						//		.css({
						//			'min-height': height + 'px',
						//		})
						//)

						//console.log($(".slider-for__item img[data-index='1']").css({"box-shadow":"0px 4px 4px 0px rgba(0,0,0,0.27)"}));
						//console.log(
						//	$(
						//		".main_product_slider .slider-for__item img[data-index='1']"
						//	).css({
						//		'box-shadow':
						//			'0px 5px 12px -4px rgba(0,0,0,0.46)',
						//	})
						//)
						if ($(window).width() <= 768) {
							$(".slider-nav__item img[data-index='1']").css(
								'width',
								'68px'
							)
							$(".slider-nav__item img[data-index='1']").css(
								'min-height',
								'68px'
							)
							//                   $(".slider-nav__item img[data-index='1']").css("max-width","68px");
							//                   $(".slider-nav__item img[data-index='1']").css("max-height","68px");
						} else {
							$(".slider-nav__item img[data-index='1']").css(
								'width',
								'100%'
							)
							$(".slider-nav__item img[data-index='1']").css(
								'min-height',
								'98px'
							)
							//                   $(".slider-nav__item img[data-index='1']").css("max-width","98px");
							//                   $(".slider-nav__item img[data-index='1']").css("max-height","98px");
						}

						setTimeout(function () {
							$('body')
								.find('#custom-loader-buffer')
								.fadeOut('slow', function () {
									$(this).remove()
								})
						}, 500)
					}
					img.src = data_url

					$('.cust-flag-up-img-block').addClass('success')

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

				$('.cust-flag-up-img-block').removeClass('success')

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
	//};
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
		var files = this.files

		var file

		if (cropper && files && files.length) {
			file = files[0]
			var file_size = this.files[0].size

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
				var fileType = this.files[0].type
				//                     var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
				const validImageTypes = ['image/jpeg', 'image/png']

				if ($.inArray(fileType, validImageTypes) < 0) {
					const text =
						'File type not allowed. Please upload PNG or JPEG.'

					displayCropperErrorPopup(
						'Upload Failed',
						text,
						'warning warning--red'
					)
					$('body').find('#preloader').remove()

					return false
				}
			}

			$('#Color_data').val('#000')

			var reader = new FileReader()

			reader.onload = function (e) {
				var image = new Image()
				image.crossOrigin = 'anonymous'
				image.onload = function () {
					var width = image.width
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
						return false
					} else if (width <= 999 || height <= 999) {
						$('.low-res-warning-indicator').addClass('visible')
					} else {
						$('.low-res-warning-indicator').removeClass('visible')
					}
				}
				image.src = e.target.result

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

				$('.hype-cropper-wrapper').fadeIn({
					duration: 'slow',
					start: function () {
						$(this).appendTo('body').css('display', 'grid')
						//$(this).css('display', 'grid')
						//                              $('.hype-cropper__body--image').css('visibility', 'hidden')
						$(
							'<div id="custom-loader-buffer" style="z-index: 9999; position: absolute"></div>'
						).insertBefore('.hype-cropper__body--image')
					},
					complete: function () {
						$('#custom-loader-buffer').remove()
						//                           $('.cropper-container.cropper-bg').css('visibility', 'visible')
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
}

/**
 * Eye dropper functionality.
 *
 */
$('.hype-eye-drop').on('click touch', function (e) {
	const workIMG = document.querySelector('.cropper-canvas img')

	//     const _parent = $(this).parents('.hype-color-picker')
	//     const _parentMob = $(this).parents('.hype-cropper-cp--mob')
	//     const zoom = 3

	//     // Get current state of the crop box.
	//     var _cropperCache = cropper.getCropBoxData(),
	//           imgW = document.querySelector('.hype-cropper__body--image'),
	//           img = document.querySelector('.cropper-canvas img'),
	//           canvas = document.getElementById('cs')

	//     var glass = document.querySelector('.img-magnifier-glass')
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

	// preview function mousemove
	//     $('.cropper-canvas img, .img-magnifier-glass').on( 'click touchstart touchmove touchend mousemove', function(e) {
	//       if ( 'touchstart' == e.type || 'touchmove' == e.type ) {
	//         const touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
	//         var elm = $(this).offset();
	//         x = touch.pageX - elm.left;
	//         y = touch.pageY - elm.top;
	//       } else {
	//         if(e.offsetX) {
	// 		  x = e.offsetX;
	//           y = e.offsetY;
	//         }
	//         else if(e.layerX) {
	//           x = e.layerX;
	//           y = e.layerY;
	//         }
	//       }

	//       moveMagnifier(e, img, glass, w, h, x, y, 3)

	//       useCanvas(canvas, img, function() {
	//         const p = canvas.getContext('2d')
	//         .getImageData(x, y, 1, 1).data;

	//         const _color = rgbToHex(p[0],p[1],p[2])

	//         // Set image container background color.
	//         imgW.style.background = _color;

	//         if ( 'click' == e.type || 'touchend' == e.type ) {
	//           // Set Pickr color to the selected color.
	//           pickr.setColor( _color )
	//           pickrMob.setColor( _color )

	//           _parent.removeClass('eye-drop-active')
	//           _parentMob.removeClass('eye-drop-active')

	//           $('.cropper-canvas').css('cursor', 'default')
	//           $('.cropper-drag-box').css('z-index', '0')

	//           // Reinitialize cropper to previous state.
	//           cropper.crop()
	//           cropper.setCropBoxData( _cropperCache )
	//         }
	//       })
	//     })
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

	$('.hype-cropper-popup-wrapper').fadeIn({
		duration: 'slow',
		start: function () {
			$(this).css('display', 'grid')
		},
	})

	return
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
