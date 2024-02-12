/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/class.js":
/*!*****************************!*\
  !*** ./js/modules/class.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function classCard(selector) {
  class OfferMenu {
    constructor(src, alt, title, descr, discount, sale, parentSelector) {
      this.src = src,
      this.alt = alt,
      this.title = title,
      this.descr = descr,
      this.discount = discount,
      this.sale = sale,
      this.parent = document.querySelector(parentSelector)
      this.formatToUSD()
    }

    formatToUSD() {
      this.discount = this.discount.toLocaleString("en-US", {style:"currency", currency:"USD"})
      this.sale = this.sale.toLocaleString("en-US", {style:"currency", currency:"USD"})
    }

    render() {
      const element = document.createElement('div')
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <div>
          <h3>${this.title}</h3>
          <p>${this.descr}</p>
          <p><del>${this.discount}</del> <span class="primary-text">${this.sale}</span></p>
        </div>
      `
      this.parent.append(element)
    }
  }

  fetch('http://localhost:3000/offers', {
    method: 'GET',
    headers:{'Content-Type': 'application/json'}
  }).then(response => response.json())
    .then(data => {
      data.forEach(offer => {
        const {src, alt, title, descr, discount, sale} = offer
        new OfferMenu(src,alt,title,descr,discount,sale,selector).render()
      })
    })

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (classCard);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function forms(formSelector) {
  const form = document.querySelector(formSelector),
  telegramTokenBot = '6961519744:AAELRkGxSms-H0mvOqkXRjuSxN9i5f0_lW8',
  chatId = '364298077'

  const message = {
    loading: 'Loading...',
    success: 'Thanks for contacting with us',
    failure: 'Something went wrong'
  }

  form.addEventListener('submit', (evt) => {
    evt.preventDefault()

    const statusMessage = document.createElement('div')
    statusMessage.textContent = message.loading

    form.append(statusMessage)
    const formData = new FormData(form)

    const object = {}
    formData.forEach((value, key) => {
      object[key] = value
    })

    fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        chat_id: chatId,
        text: `
          Name: ${object.name}, Phone: ${object.phone}
        `
      })
    })
      .then(() => (statusMessage.textContent = message.success))
      .catch(() => statusMessage.failure)
      .finally(() => {
        setTimeout(() => {
          statusMessage.remove()
        }, 2000)
      })
  })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/loader.js":
/*!******************************!*\
  !*** ./js/modules/loader.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function loader(loaderSelector) {
  const elLoaderWrapper = document.querySelector(loaderSelector)

  setTimeout(() => {
    elLoaderWrapper.style.display = 'none'
  }, 1000)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loader);

/***/ }),

/***/ "./js/modules/menuData.js":
/*!********************************!*\
  !*** ./js/modules/menuData.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function menuData() {
  fetch('http://localhost:3000/menu', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }).then(res => res.json())
    .then(data => {
      data.forEach(menu => {
        // console.log(menu);
        const menuList = document.querySelector('.menu-items')
        const menuItem = document.createElement('div')
        menuItem.classList.add('menu-item')
        menuItem.innerHTML = `
          <img src=${menu.src} alt=${menu.foodName}>
          <div>
            <h3>${menu.foodName}<span class="primary-text">$${menu.price}</span></h3>
            <p>${menu.descr}</p>
          </div>
        `
        menuList.append(menuItem)
      })
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuData);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function openModal(modalContentSelector, modalSelector, modalCloseBtn) {
  const  elModalContent = document.querySelector(modalContentSelector),
  elModal = document.querySelector(modalSelector),
  elModalCloseBtn = document.querySelector(modalCloseBtn)

  elModal.classList.add('show')
  elModal.classList.remove('hide')
  elModalContent.classList.add('modalFade')
  document.body.style.overflow = 'hidden'
  // clearInterval(modalTimerId)
}

function closeModal() {
  const elModal = document.querySelector('.modal')
  elModal.classList.add('hide')
  elModal.classList.remove('show')
  document.body.style.overflow = ''
}

function modal(btnSelector, modalSelector, modalContentSelector, modalCloseBtn) {
  const elsModalOpenBtns = document.querySelectorAll(btnSelector),
    elModal = document.querySelector(modalSelector),
    elModalCloseBtn = document.querySelector(modalCloseBtn)

  elsModalOpenBtns.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalContentSelector, modalSelector))
  })

  if(elModalCloseBtn) {
    elModalCloseBtn.addEventListener('click', closeModal)
  }

  elModal.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('modal')) {
      closeModal(modalSelector)
    }
  })

  document.addEventListener('keydown', (evt) => {
    if(evt.code === 'Escape' && elModal.classList.contains('show')) {
      closeModal(modalSelector)
    }
  })

  const modalTimerId = setTimeout(openModal, 50000)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
  const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesInner = document.querySelector('.offer__slider-inner')
    // width = window.getComputedStyle(slidesWrapper).width

  let slideIndex = 1

  slidesInner.style.display = 'flex'
  slidesWrapper.style.overflow = 'hidden'

  showSlides(slideIndex)

  if(slides.length < 10) {
    total.textContent = `0${slides.length}`
  } else {
    total.textContent = slides.length
  }

  function showSlides(index) {
    if(index > slides.length) {
      slideIndex = 1
    }
    if(index < 1) {
      slideIndex = slides.length
    }

    slides.forEach(slide => slide.style.display = 'none')

    slides[slideIndex - 1].style.display = 'block'

    if(slides.length < 10) {
      current.textContent = `0${slideIndex}`
    } else {
      current.textContent = slideIndex
    }
  }

  function moveSlides(index) {
    showSlides(slideIndex += index)
  }

  prev.addEventListener('click', () => {
    moveSlides(-1)
  })

  next.addEventListener('click', () => {
    moveSlides(+1)
  })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabContentsSelector, tabParentsSelector) {
  const elTabs = document.querySelectorAll(tabsSelector),
    elsTabContents = document.querySelectorAll(tabContentsSelector),
    elTabParent = document.querySelector(tabParentsSelector)

  function hideTabContents() {
    elsTabContents.forEach(tabContent => {
      tabContent.classList.add('hide')
      tabContent.classList.remove('show')
    })

    elTabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active')
    })
  }

  function showTabContent(index = 0) {
    elsTabContents[index].classList.add('show', 'fade')
    elsTabContents[index].classList.remove('hide')
    elTabs[index].classList.add('tabheader__item_active')
  }

  hideTabContents()
  showTabContent()

  if(elTabParent) {
    elTabParent.addEventListener('click', (evt) => {
      const target = evt.target

      if(target && target.classList.contains('tabheader__item')) {
        elTabs.forEach((tab, index) => {
          if(target === tab) {
            hideTabContents()
            showTabContent(index)
          }
        })
      }
    })
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(deadline, selector) {
  function getTimeRemaining(endtime) {
    const time = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(time / (1000 * 60 * 60 * 24)),
      hours = Math.floor((time / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((time / (1000 * 60)) % 60),
      seconds = Math.floor((time / (1000)) % 60)

    return {
      totalTime: time,
      days,
      hours,
      minutes,
      seconds
    }
  }

  function formatNumber(number) {
    if(number >= 0 && number < 10) {
      return `0${number}`
    } else {
      return number
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInerval = setInterval(updateClock, 1000)

    function updateClock() {
      const time = getTimeRemaining(endtime)
        days.textContent = formatNumber(time.days)
        hours.textContent = formatNumber(time.hours)
        minutes.textContent = formatNumber(time.minutes)
        seconds.textContent = formatNumber(time.seconds)

      if(time.totalTime <= 0) {
        clearInterval(timeInerval)
      }
    }
  }

  setClock(selector, deadline)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/loader */ "./js/modules/loader.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_class__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/class */ "./js/modules/class.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_menuData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/menuData */ "./js/modules/menuData.js");

;








window.addEventListener('DOMContentLoaded', () => {
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item','.tab_content','.tabheader__items')
  ;(0,_modules_loader__WEBPACK_IMPORTED_MODULE_1__["default"])('.loader-wrapper')
  ;(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('2024-03-01', '.timer')
  ;(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', '.modal__content', '[data-modal-close]')
  ;(0,_modules_class__WEBPACK_IMPORTED_MODULE_4__["default"])(".offers-items")
  ;(0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', '.modal', '.modal__content')
  ;(0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])()
  ;(0,_modules_menuData__WEBPACK_IMPORTED_MODULE_7__["default"])()
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map