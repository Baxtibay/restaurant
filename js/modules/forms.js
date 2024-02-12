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

export default forms