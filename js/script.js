window.addEventListener('DOMContentLoaded', () => {
  // SHOW TAB CONTENT FUNCTION
  const elTabs = document.querySelectorAll('.tabheader__item'),
    elsTabContents = document.querySelectorAll('.tab_content'),
    elTabParent = document.querySelector('.tabheader__items')

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


  // LOADER start
  const elLoaderWrapper = document.querySelector('.loader-wrapper')

  setTimeout(() => {
    elLoaderWrapper.style.display = 'none'
  }, 1000)
  // LOADER end

  // TIMER start
  const deadline = '2024-03-01'
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
      days = timer.querySelector('#days')
      hours = timer.querySelector('#hours')
      minutes = timer.querySelector('#minutes')
      seconds = timer.querySelector('#seconds')
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

  setClock('.timer', deadline)
  // TIMER end

  // Modal ===============-----------------=============== start
  const elsModalOpenBtns = document.querySelectorAll('[data-modal]'),
    elModalContent = document.querySelector('.modal__content')
    elModal = document.querySelector('.modal'),
    elModalCloseBtn = document.querySelector('[data-modal-close]')

  function openModal() {
    elModal.classList.add('show')
    elModal.classList.remove('hide')
    elModalContent.classList.add('modalFade')
    document.body.style.overflow = 'hidden'
    clearInterval(modalTimerId)
  }

  function closeModal() {
    elModal.classList.add('hide')
    elModal.classList.remove('show')
    document.body.style.overflow = ''
  }

  elsModalOpenBtns.forEach(btn => {
    btn.addEventListener('click', openModal)
  })
  if(elModalCloseBtn) {
    elModalCloseBtn.addEventListener('click', closeModal)
  }

  elModal.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('modal')) {
      closeModal()
    }
  })

  document.addEventListener('keydown', (evt) => {
    if(evt.code === 'Escape' && elModal.classList.contains('show')) {
      closeModal()
    }
  })

  const modalTimerId = setTimeout(openModal, 5000)

  // Modal ================------------================= end
})