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

export default slider