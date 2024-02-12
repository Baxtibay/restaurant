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

export default modal