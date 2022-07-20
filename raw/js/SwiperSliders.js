import Swiper, { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Swipers() {
	const singleProductThumb = new Swiper('.product-single-gallery-thumb', {
		spaceBetween: 15,
		slidesPerView: 'auto',
		freeMode: true,
		watchSlidesProgress: true,
		centeredSlides: true,
		loop: true,
		centerInsufficientSlides: true,
		slideToClickedSlide: true,
	})

	const singleProduct = new Swiper('.product-single-gallery', {
		modules: [Navigation, Pagination],
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: false,
		pagination: {
			el: '.swiper-pagination',
		},
		thumbs: {
			swiper: singleProductThumb,
		},
		loop: true,
		centeredSlides: true,
		on: {
			init: function () {
				$('img.grid-view-item__image').on('load', function () {
					const _p = $(this)
						.parents('div[data-image-with-placeholder-wrapper]')
						.find('.skeleton-loader-cust')
						.remove()
				})

				// IG carasoul images.
				$('.ig-img img').on('load', function () {
					const _p = $(this)
						.parent()
						.parent()
						.find('.skeleton-loader-cust')
						.remove()
				})
			},
		},
	})

	const swiper = new Swiper('.swiper-best-seller', {
		modules: [Navigation],
		slidesPerView: 'auto',
		spaceBetween: 20,
		freeMode: {
			enabled: false,
			sticky: true,
		},
		loop: true,
		centeredSlides: false,
		autoHeight: true,
		navigation: {
			nextEl: '.arrow-best.arrow-next',
			prevEl: '.arrow-best.arrow-prev',
		},
		breakpoints: {
			401: {
				spaceBetween: 20,
				slidesPerView: 2,
				centeredSlides: false,
			},
			552: {
				spaceBetween: 12,
				slidesPerView: 3,
				centeredSlides: false,
			},
			851: {
				spaceBetween: 12,
				slidesPerView: 4,
				centeredSlides: false,
			},
			1025: {
				spaceBetween: 25,
				slidesPerView: 4,
				centeredSlides: false,
			},
		},
		on: {
			beforeResize: function () {
				const ww = $(window).width()
				klaut(ww)
			},
			beforeInit: function () {
				const ww = $(window).width()
				klaut(ww)
			},
			init: function () {
				$('img.grid-view-item__image').on('load', function () {
					const _p = $(this)
						.parents('div[data-image-with-placeholder-wrapper]')
						.find('.skeleton-loader-cust')
						.remove()
				})
			},
		},
	})

	const swiper12 = new Swiper('.swiper-new-arrivals', {
		modules: [Navigation],
		slidesPerView: 'auto',
		spaceBetween: 20,
		centeredSlides: false,
		freeMode: {
			enabled: false,
			sticky: true,
		},
		loop: true,
		navigation: {
			nextEl: '.arrow-new.arrow-next',
			prevEl: '.arrow-new.arrow-prev',
		},
		autoHeight: true,
		breakpoints: {
			401: {
				spaceBetween: 0,
				slidesPerView: 1,
				centeredSlides: false,
			},
			//       481: {
			//         spaceBetween: 12,
			//         slidesPerView: 2,
			//         centeredSlides: false,
			//       },
			552: {
				spaceBetween: 12,
				slidesPerView: 2,
				centeredSlides: false,
			},
			//       651:{
			//         spaceBetween: 12,
			//         slidesPerView: 3,
			//         centeredSlides: false,
			//       },
			851: {
				spaceBetween: 12,
				slidesPerView: 3,
				centeredSlides: false,
			},
			1025: {
				spaceBetween: 25,
				slidesPerView: 3,
				centeredSlides: false,
			},
		},
		on: {
			init: function () {},
		},
	})

	const SwiperIG = new Swiper('.swiper-instagram', {
		modules: [Navigation],
		slidesPerView: 'auto',
		spaceBetween: 20,
		centeredSlides: false,
		freeMode: {
			enabled: false,
			sticky: true,
		},
		loop: true,
		navigation: {
			nextEl: '.arrow-ig.arrow-next',
			prevEl: '.arrow-ig.arrow-prev',
		},
		breakpoints: {
			401: {
				spaceBetween: 20,
				slidesPerView: 2,
				centeredSlides: false,
			},
			//       481: {
			//         spaceBetween: 12,
			//         slidesPerView: 3,
			//         centeredSlides: false,
			//       },
			552: {
				spaceBetween: 12,
				slidesPerView: 3,
				centeredSlides: false,
			},
			851: {
				spaceBetween: 12,
				slidesPerView: 4,
				centeredSlides: false,
			},
			1025: {
				spaceBetween: 25,
				slidesPerView: 4,
				centeredSlides: false,
			},
		},
		on: {
			init: function () {
				// IG carasoul images.
				$('.ig-img img').on('load', function () {
					const _p = $(this)
						.parent()
						.parent()
						.find('.skeleton-loader-cust')
						.remove()
				})
			},
		},
	})

	const productSwiper = new Swiper('.swiper-product-ig', {
		modules: [Navigation],
		slidesPerView: 'auto',
		spaceBetween: 25,
		centeredSlides: false,
		resizeObserver: true,
		freeMode: {
			enabled: false,
			sticky: true,
		},
		loop: true,
		centeredSlides: true,
		navigation: {
			nextEl: '#swiper-next-btn',
			prevEl: '#swiper-prev-btn',
		},
		breakpoints: {
			480: {
				navigation: false,
			},
			768: {
				slidesPerView: 'auto',
				spaceBetween: 30,
			},
			2000: {
				slidesPerView: 'auto',
			},
		},
		on: {
			init: function () {
				$('img.grid-view-item__image').on('load', function () {
					const _p = $(this)
						.parents('div[data-image-with-placeholder-wrapper]')
						.find('.skeleton-loader-cust')
						.remove()
				})

				// IG carasoul images.
				$('.ig-img img').on('load', function () {
					const _p = $(this)
						.parent()
						.parent()
						.find('.skeleton-loader-cust')
						.remove()
				})
			},
		},
	})
}
