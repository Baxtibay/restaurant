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

export default tabs