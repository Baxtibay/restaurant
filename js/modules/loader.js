function loader(loaderSelector) {
  const elLoaderWrapper = document.querySelector(loaderSelector)

  setTimeout(() => {
    elLoaderWrapper.style.display = 'none'
  }, 1000)
}

export default loader