tailwind.config = {
  theme: {
    extend: {
      colors: {
        'brand-red': '#D5003A',
      }
    }
  }
}


function productTitleHeight(checkHeight) {
  var _y = false
  $('.h4.grid-view-item__title.product-card__title').each(function(i, e) {
    const _o = $(e).height()
    let _p = 'lol'
    if (_o > checkHeight) {
		_y = true  
        _p = _p == 'lol' ? $(e).parents('.swiper') : _p
        $(e).parent().css('margin', 0)
    }
    
//     if (_y) {
//       if (_p == 'lol') {
//         $(e).parent().css('margin', 0)
//       } else {
//       _p.find('.product-meta-wrapper > div:not(.jdgm-widget)').css('margin', 0)
//     }
//     }
  })
}

function klaut(ww) {
    if (ww > 1280 ) {
      productTitleHeight(29)
//        console.log('w here 3 3')
    }
    else if (ww > 1024) {
//        console.log('w here 2')
      productTitleHeight(22)
    }
    else if (ww > 767) {
//       console.log('w here')
      productTitleHeight(22)
    }
    else if (ww > 400) {
//       console.log('w here')
      productTitleHeight(17)
    }
  else {
    productTitleHeight(22)
  }
}



// Swiper slide for homepage.
jQuery(function($) {
  
   $(".product-form__input-wrap button").on("click", function() {

    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    const minBtn = $('.product-form__input-wrap button').first()
	const qtyType = $button.data('qty')
    
    if (qtyType == "add") {
      var newVal = parseFloat(oldValue) + 1;

      minBtn.removeAttr('disabled')
    }
    else {
      if (oldValue > 1) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 1;
      }

      if (newVal <= 1){
        minBtn.attr('disabled', 'disabled')
      }
    }

    $button.parent().find("input").val(newVal);
  });
  
  const ww = $( window ).width()
        klaut(ww)
        
  const swiper = new Swiper('.swiper-best-seller', {
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
      nextEl: ".arrow-best.arrow-next",
      prevEl: ".arrow-best.arrow-prev"
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
      851:{
        spaceBetween: 12,
        slidesPerView: 4,
        centeredSlides: false,
      },
      1025: {
        spaceBetween: 25, 
        slidesPerView: 4,
        centeredSlides: false,
      }
    },
    on: {
            beforeResize: function() {
        const ww = $( window ).width()
        klaut(ww)
      },
      beforeInit: function() {
        const ww = $( window ).width()
        klaut(ww)
      },
      init: function () {
        checkArrow(this);

        $('img.grid-view-item__image').on('load', function(){
          const _p = $(this).parents('div[data-image-with-placeholder-wrapper]').find('.skeleton-loader-cust').remove()
        })
      },
    },
  });
  
  
  const swiper12 = new Swiper('.swiper-new-arrivals', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: false,
    freeMode: {
      enabled: false,
      sticky: true,
    },
    loop: true,
    navigation: {
      nextEl: ".arrow-new.arrow-next",
      prevEl: ".arrow-new.arrow-prev"
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
      851:{
        spaceBetween: 12,
        slidesPerView: 3,
        centeredSlides: false,
      },
      1025: {
        spaceBetween: 25,
        slidesPerView: 3,
        centeredSlides: false,
      }
    },
    on: {
      init: function () {
        checkArrow(this);
      },
    },
  });
  
  const SwiperIG = new Swiper('.swiper-instagram', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: false,
    freeMode: {
      enabled: false,
      sticky: true,
    },
    loop: true,
    navigation: {
      nextEl: ".arrow-ig.arrow-next",
      prevEl: ".arrow-ig.arrow-prev"
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
      851:{
        spaceBetween: 12,
        slidesPerView: 4,
        centeredSlides: false,
      },
      1025: {
        spaceBetween: 25, 
        slidesPerView: 4,
        centeredSlides: false,
      }
    },
    on: {
      init: function () {
        checkArrow(this);
        // IG carasoul images.            
        $('.ig-img img').on('load', function(){
          const _p = $(this).parent().parent().find('.skeleton-loader-cust').remove()
        })

      },
    },
  });
  
  const productSwiper = new Swiper('.swiper-product-ig', {
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
      nextEl: "#swiper-next-btn",
      prevEl: "#swiper-prev-btn"
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
      }

    },
    on: {
      init: function () {
        checkArrow(this);

        $('img.grid-view-item__image').on('load', function(){
          const _p = $(this).parents('div[data-image-with-placeholder-wrapper]').find('.skeleton-loader-cust').remove()
        })

        // IG carasoul images.            
        $('.ig-img img').on('load', function(){
          const _p = $(this).parent().parent().find('.skeleton-loader-cust').remove()
        })

      },
    },
  });
  
	const singleProductThumb = new Swiper('.product-single-gallery-thumb', {
      spaceBetween: 18,
      slidesPerView: 3,
//       freeMode: false,
//       centeredSlides: true,
//       centerInsufficientSlides: true,
//       centeredSlidesBounds: true,
//       loop: false,
//       watchSlidesProgress: true,
      breakpoints: {
      950: {
        slidesPerView: 'auto',
      }
     }
    });
  
    const singleProduct = new Swiper('.product-single-gallery', {
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: true,
    pagination: {
      el: ".swiper-pagination",
    },
    freeMode: {
      enabled: false,
      sticky: false,
    },
      thumbs: {
          swiper: singleProductThumb,
        },
    loop: true,
    centeredSlides: true,
    on: {
      init: function () {
        checkArrow(this);

        $('img.grid-view-item__image').on('load', function(){
          const _p = $(this).parents('div[data-image-with-placeholder-wrapper]').find('.skeleton-loader-cust').remove()
        })

        // IG carasoul images.            
        $('.ig-img img').on('load', function(){
          const _p = $(this).parent().parent().find('.skeleton-loader-cust').remove()
        })

      },
    },
  });

  $(window).resize(function() {
    const ww = $( window ).width()

    klaut(ww)
  })
  
  // Product page info - tabbed.
      $('.product-info-tabs span').on('click', function() {
        if ($(this).hasClass('active')) return;
            
        const idx = $(this).data('info')
        $(this).siblings().removeClass('active')
        $(this).addClass('active')

        $('div[data-info-cont]').removeClass('active')
        $('div[data-info-cont]').hide()
        
        $('div[data-info-cont="'+idx+'"').fadeIn('fast', function() {
          $(this).addClass('active')
        })
      })
})


function checkArrow(swiper) {
  if ( window.innerWidth <= 400  ) {
//         swiper.params.freeMode.enabled = true
  } else {
    swiper.params.freeMode.enabled = false
  }
}
