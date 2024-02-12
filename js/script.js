"use strict"
import tabs from "./modules/tabs"
import loader from "./modules/loader"
import timer from "./modules/timer"
import modal from "./modules/modal"
import classCard from "./modules/class"
import forms from "./modules/forms"
import slider from "./modules/slider"
import menuData from "./modules/menuData"

window.addEventListener('DOMContentLoaded', () => {
  tabs('.tabheader__item','.tab_content','.tabheader__items')
  loader('.loader-wrapper')
  timer('2024-03-01', '.timer')
  modal('[data-modal]', '.modal', '.modal__content', '[data-modal-close]')
  classCard(".offers-items")
  forms('form', '.modal', '.modal__content')
  slider()
  menuData()
})