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

export default menuData