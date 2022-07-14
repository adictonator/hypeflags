/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./raw/js/TwitterInspiration.js":
/*!**************************************!*\
  !*** ./raw/js/TwitterInspiration.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SwitchTweetTheme": () => (/* binding */ SwitchTweetTheme),
/* harmony export */   "TwitterInspiration": () => (/* binding */ TwitterInspiration),
/* harmony export */   "UpdateTweetScreen": () => (/* binding */ UpdateTweetScreen)
/* harmony export */ });
function TwitterInspiration(event) {
  event.preventDefault();
  var URLs = ['https://twitter.com/stoolpresidente/status/1296409285686157312', 'https://twitter.com/souljaboy/status/1022522850320760833', 'https://twitter.com/kanyewest/status/989197113648037888', 'https://twitter.com/codyko/status/898951913894313984', 'https://twitter.com/zane/status/1244076011018260480', 'https://twitter.com/lilpump/status/943988935901843456', 'https://twitter.com/JuiceWorlddd/status/1123711610214866945', 'https://twitter.com/Drake/status/203006654097268736', 'https://twitter.com/1future/status/1260668431210287109'];
  var num = Math.floor(Math.random() * 9);
  $('#tweet-url').val(URLs[num]).trigger('change');
}
function UpdateTweetScreen(event) {
  var _document$querySelect;

  $('.product-single__photos').append('<div id="custom-loader-buffer"></div>');
  console.log('reodd'); //const _parent = $(this).parent()
  //_parent.removeClass('error success')

  (_document$querySelect = document.querySelector("[name='add']")) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.setAttribute('disabled', 'disabled');
  var urls = event.target.value;
  var parts = urls.split('/');
  var last_part = parts[parts.length - 1];
  last_part = last_part.match(/\d+/); //let unique_id = Math.floor(Math.random() * 26) + Date.now()
  //unique_id = unique_id.toString()

  fetch('https://backend.hypeflag.com/tweet/index.php?id=' + last_part).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    // | Tweet not fount OR private tweet.
    if (data.doc1.errors) {
      //_parent.addClass('error')
      if (data.doc1.errors[0].title == 'Authorization Error') {
        TweetError('Sorry, private tweets are not supported.');
      } else {
        TweetError('Tweet not found, please try again');
      }

      return false;
    } // | Tweet contain more than one image.


    if (data.doc2.photos) {
      if (data.doc2.photos.length > 1) {
        //_parent.addClass('error')
        $('.tooltip').text('Sorry, tweets containing more than one image are not supported.');
        return false;
      }
    }

    FromDoc = data.doc1;
    htmlTweet = data.doc2;
    retweets = data.doc1.data.public_metrics.retweet_count;
    var tweetHtml = tweetTemplate($('input[type=radio][name=theme_color]:checked').val(), 'temp');
    var tweetHtmlpopup = tweetTemplate($('input[type=radio][name=theme_color]:checked').val(), 'popup');
    var parseHTML = $.parseHTML(tweetHtml)[0];
    parseHTML = $(parseHTML).find('.twitter_wrapper')[0];
    $('.tweet_flag_box_inner').html(parseHTML);
    $('.tweet_flag_box_inner').fadeIn(500);
    $('#very-specific-design').html(tweetHtmlpopup);
    $('.t_popup_toggle').click(function () {
      $('.edit-tweet-popup').addClass('opened');
      autosize(document.getElementsByClassName('editable_text'));
      popupSizing();
      $('.editable_text').bind('input propertychange', function () {
        popupSizing();
      });
    });
    $('.close_t_popup,.remove_popup').click(function () {
      resizing();
      popupSizing();
      $('.edit-tweet-popup').removeClass('opened');
    }); // 					callTiny()

    resizing();
    $('#custom-loader-buffer').fadeOut('slow', function () {
      $(this).remove();
    });
    setTimeout(function () {
      html2canvass();
    }, 500);
  })["catch"](function (jqXHR, exception) {
    //_parent.addClass('error')
    var msg = '';

    if (jqXHR.status === 0) {
      msg = 'Not connect.\n Verify Network.';
    } else if (jqXHR.status == 404) {
      msg = 'Requested page not found. [404]';
    } else if (jqXHR.status == 500) {
      msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
      msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
      msg = 'Time out error.';
    } else if (exception === 'abort') {
      msg = 'Ajax request aborted.';
    } else {
      msg = 'Uncaught Error.\n' + jqXHR.responseText;
    }

    TweetError(msg);
  });
}

function tweetTemplate(themeClass, design) {
  var tweet = htmlTweet;
  var html = '';
  html += '<div class="tweet-flag-wrap"><div class="tweet_flag_wrap_inner">';
  html += '<div class="upper_dots" data-html2canvas-ignore></div>';
  html += '<div class="bottom_dots" data-html2canvas-ignore></div>';
  html += '<div class="tweet_flag_box ' + themeClass + '" id="flagBox">';
  html += '<div class="tweet_flag_box_inner">';
  html += '<div class="twitter_wrapper ">';
  html += '<div class="twitt_head">';
  html += '<div class="twitt_u_img"><img src="' + tweet.user.profile_image_url_https + '" alt=""></div>';
  html += '<div class="twitt_u_info">';
  html += '<strong>' + tweet.user.name;

  if (tweet.user.verified) {
    html += '<svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>';
  }

  html += '</strong>';
  html += '<em class="userName">@' + tweet.user.screen_name + '</em>';
  html += '</div>';
  html += '</div>';
  html += '<div class="tweet_content">';

  if (tweet.text) {
    var text = tweet.text;

    if (tweet.entities.hashtags.length > 0) {
      $.each(tweet.entities.hashtags, function (inx, val) {
        text = text.replace('#' + val.text, "<span class='hashtag'>#" + val.text + '</span>');
      });
    }

    if (tweet.entities.user_mentions.length > 0) {
      $.each(tweet.entities.user_mentions, function (inx, val) {
        text = text.replace('@' + val.screen_name, "<span class='atrate'>@" + val.screen_name + '</span>');
      });
    }

    if (tweet.entities.media) {
      if (tweet.entities.media.length > 0) {
        $.each(tweet.entities.media, function (inx, val) {
          text = text.replace(val.url, '');
        });
      }
    }

    if (tweet.entities.urls.length > 0) {
      $.each(tweet.entities.urls, function (inx, val) {
        text = text.replace(val.url, '');
      });
    }

    if (design == 'temp') {
      html += '<pre id="twitterText" contenteditable="true">' + text + '</pre>';
    }

    if (design == 'popup') {
      html += '<pre class="editable_text" id="editable_text">' + text + '</pre>';
    }
  }

  if (tweet.photos) {
    if (tweet.photos.length > 0) {
      $.each(tweet.photos, function (inx, val) {
        html += '<div class="twitt_img"><img src="' + val.url + '" alt="tweet"></div>';
      });
    }
  }

  if (tweet.video) {
    html += '<div class="twitt_video"><div class="tweet_video_img">';
    html += '<img src="' + tweet.video.poster + '" alt="tweet">';
    html += '<span class="current_views">' + tweet.video.viewCount + ' VIEWS</span>';
    html += '<button class="play_tweet_video"><i class="fa fa-play-circle-o" aria-hidden="true"></i></button>';
    html += '</div></div>';
  }

  var time = formatAMPM(tweet.created_at);
  var date = formateDate(tweet.created_at);
  html += '<div class="tweet_time"><span>' + time + '</span><span class="dot"></span>' + date + '<span class="dot"></span><span style="color:#1da1f2">' + FromDoc.data.source + '</span></div>'; //       if(tweet.conversation_count >= 1000){
  //         var comments = (tweet.conversation_count / 1000).toFixed(1) + 'K';
  //       }else{ var comments = tweet.conversation_count; }
  // Retweets

  if (retweets >= 1000) {
    retweets = (retweets / 1000).toFixed(1) + 'K';
  }

  if (tweet.favorite_count >= 1000) {
    var likes = (tweet.favorite_count / 1000).toFixed(1) + 'K';
  } else {
    var likes = tweet.favorite_count;
  }

  html += '<div class="tweet_reactions"><div><strong>' + retweets + '</strong><span>Retweets</span></div><div><strong>' + likes + '</strong><span>Likes</span></div></div>';
  html += '<div class="tweet_action_count">';
  html += '<ul>';
  html += '<li class="t_comments"><svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg></li>';
  html += '<li class="t_likes"><svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg></li>';
  html += '<li class="t_likes"><svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg></li>';
  html += '<li class="t_likes"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g><path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path><path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path></g></svg></li>';
  html += '</ul></div><a href="javascript:void(0);" class="t_popup_toggle"></a></div></div></div></div></div>';
  return html;
}

function TweetError(error) {
  // create an element to display the error message.
  var element = document.createElement('div');
  element.classList.add('tweet-error');
  element.innerHTML = error;
  document.body.appendChild(element);
}

function SwitchTweetTheme(event) {
  if ($('.tweet_flag_box_inner').is(':empty')) {
    $('.tweet_flag_box').removeClass('theme_light');
    $('.tweet_flag_box').removeClass('theme_dark');
    $('.tweet_flag_box').addClass($(this).val());
  } else {
    $('.tweet_flag_box').removeClass('theme_light');
    $('.tweet_flag_box').removeClass('theme_dark');
    $('.tweet_flag_box').addClass($(this).val()); //html2canvass()
  }
}

function formatAMPM(dd) {
  var date = new Date(dd);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

function formateDate(dd) {
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var date = new Date(dd);
  var month = monthNames[date.getMonth()];
  var day = date.getDate();
  var year = date.getFullYear();
  var strTime = month + ' ' + day + ', ' + year;
  return strTime;
}

function findHashTags(searchText) {
  var regexp = /\B\#\w\w+\b/g;
  var result = searchText.match(regexp);

  if (result) {
    return result;
  } else {
    return false;
  }
}

function findAtTags(searchText) {
  var regexp = /\B\@\w\w+\b/g;
  var result = searchText.match(regexp);

  if (result) {
    return result;
  } else {
    return false;
  }
}

/***/ }),

/***/ "./raw/js/app.js":
/*!***********************!*\
  !*** ./raw/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TwitterInspiration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TwitterInspiration */ "./raw/js/TwitterInspiration.js");
var _document$getElementB, _document$getElementB2, _document$getElementB3, _document$querySelect;


(_document$getElementB = document.getElementById('tweet-inspiration')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.addEventListener('click', function (event) {
  return (0,_TwitterInspiration__WEBPACK_IMPORTED_MODULE_0__.TwitterInspiration)(event);
});
(_document$getElementB2 = document.getElementById('tweet-url')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.addEventListener('change', function (event) {
  return (0,_TwitterInspiration__WEBPACK_IMPORTED_MODULE_0__.UpdateTweetScreen)(event);
}); // Fetch initial tweet on page load.

(_document$getElementB3 = document.getElementById('tweet-url')) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.dispatchEvent(new Event('change')); // Switch tweet theme.

(_document$querySelect = document.querySelector('[name=theme]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.addEventListener('click', function (event) {
  return (0,_TwitterInspiration__WEBPACK_IMPORTED_MODULE_0__.SwitchTweetTheme)(event);
});

/***/ }),

/***/ "./raw/css/app.css":
/*!*************************!*\
  !*** ./raw/css/app.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/assets/app": 0,
/******/ 			"assets/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["assets/app"], () => (__webpack_require__("./raw/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["assets/app"], () => (__webpack_require__("./raw/css/app.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;