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

  // Modal  start
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

  const modalTimerId = setTimeout(openModal, 50000)

  // Modal  end

  // Form  start
  const form = document.querySelector('form'),
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
  // Form  END

  // Class Offer  start

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

  const offers = [
    {
      src: './img/offer1.png',
      alt: 'Quattro Pasta',
      title: 'Quattro Pasta',
      descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
      discount: 55,
      sale: 40
    },
    {
      src: './img/offer2.png',
      alt: 'Vegertarian Pasta',
      title: 'Vegertarian Pasta',
      descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
      discount: 55,
      sale: 18
    },
    {
      src: './img/offer3.png',
      alt: 'Gluten-Free Pasta',
      title: 'Gluten-Free Pasta',
      descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
      discount: 60,
      sale: 55
    },
  ]

  offers.forEach(offer => {
    const {src, alt, title, descr, discount, sale} = offer
    new OfferMenu(src,alt,title,descr,discount,sale,".offers-items").render()
  })

  // Class Offer END
  // Class Menu Start
  class menu {
    constructor(src, foodName, price, descr, parentElement) {
      this.src = src,
      this.foodName = foodName,
      this.price = price,
      this.descr = descr,
      this.parent =  document.querySelector(parentElement)
    }
    render() {
      const menuItem = document.createElement('div')
      menuItem.classList.add('menu-item')
      menuItem.innerHTML = `
        <img src=${this.src} alt=${this.src}>
        <div>
          <h3>${this.foodName}<span class="primary-text">$${this.price}</span></h3>
          <p>${this.descr}</p>
        </div>
      `
      this.parent.append(menuItem)
    }
  }

  const menusLeft = [
    {
      src: './img/food1.png',
      foodName: 'LASAL CHEESE',
      price: 18.00,
      descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.'
    },
    {
      src: './img/food2.png',
      foodName: 'JUMBO CRAB SHRIMP',
      price: 24.00,
      descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.'
    },
    {
      src: './img/food3.png',
      foodName: 'KOKTAIL JUCIE',
      price: 12.00,
      descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.'
    },
    {
      src: './img/food4.png',
      foodName: 'CAPO STEAK',
      price: 60.00,
      descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.'
    },
    {
      src: './img/food5.png',
      foodName: 'ORGANIC FRUIT SALAD',
      price: 8.00,
      descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.'
    },
    {
      src: './img/food6.png',
      foodName: 'CHEESE PIZZA',
      price: 18.00,
      descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.'
    },
  ]

  const menusRight = [
    {
      src: './img/food7.jpeg',
      foodName: 'KOFTA MEAT',
      price: 40.00,
      descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.'
    },
    {
      src: './img/food8.jpeg',
      foodName: 'JUMBO CRAB SHRIMP',
      price: 14.00,
      descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.'
    },
    {
      src: './img/food9.jpeg',
      foodName: 'CHEESE TOST',
      price: 6.00,
      descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.'
    },
    {
      src: './img/food10.jpeg',
      foodName: 'FRUIT SALAD',
      price: 14.00,
      descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.'
    },
    {
      src: './img/food11.jpeg',
      foodName: 'CHICKEN SHAWARMA',
      price: 20.00,
      descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.'
    },
    {
      src: './img/food12.jpeg',
      foodName: 'MEGA CHEESE PIZZA',
      price: 30.00,
      descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.'
    },
  ]

  menusLeft.forEach(menuLeft => {
    const {src, foodName, price, descr} = menuLeft
    new menu(src, foodName, price, descr,'.menu-items-left').render()
  })

  menusRight.forEach(menuRight => {
    const {src, foodName, price, descr} = menuRight
    new menu(src, foodName, price, descr,'.menu-items-right').render()
  })
  // Class Menu End
})