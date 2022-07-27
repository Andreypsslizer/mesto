import './pages/index.css'
import Card from '../src/components/Card.js'
import FormValidator from './components/FormValidator.js';
import {initialCards, validConfig} from './utils/constants.js'
import Section from './components/Section.js';
import Popup from "./components/Popup.js";
import PopupWithImage from "../src/components/PopupWithImage.js"
import UserInfo from './components/UserInfo.js';
import PopupWithForm from './components/PopupWithForm.js';
const container = document.querySelector('.content');
const profileContainer = container.querySelector('.profile');
const buttonEdit = profileContainer.querySelector('.profile__button');
const author = profileContainer.querySelector('.profile__name');
const job = profileContainer.querySelector('.profile__subtitle');
const nameFormElement = document.querySelector('.edit__form');
const newItemButton = profileContainer.querySelector('.profile__add-btn');
const newItemForm = document.querySelector('.new-item__form');
const editFormElement = document.forms.profile;
const newItemFormElement = document.forms.card;
const nameInput = profile.elements.name;
const jobInput = profile.elements.job;
const newItemName = card.elements.name;
const newItemLink = card.elements.link;
const newItemFormButton = document.querySelector('.new-item__form-submit')
const elementOn = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#el-template').content;

const createCard = (data, selector) => {
  const card = new Card(data, selector, {handleClickCard: (name, link) => {bigImagePopup.open(name, link)}});
  const cardElement = card.generateCard();
  return cardElement
}

const generateValidation = (data, selector) => {
  const element = new FormValidator(data, selector);
  return element
}

const profileFormValidation = generateValidation(validConfig, editFormElement);

const cardFormValidation = generateValidation(validConfig, newItemFormElement)

const cardRender = new Section({
  items: initialCards,
  renderer: (card, meth = 'append') => {
    const item = createCard(card, '#el-template');
    cardRender.addItem(item, meth);
  }
}, '.elements__list')

cardRender.rendererItems()

const userInfo = new UserInfo ({
  name: '.profile__name',
  job: '.profile__subtitle'
})
const updateBio = userInfo.getUserInfo()

const bigImagePopup = new PopupWithImage('.element-image-popup');
bigImagePopup.setEventListeners()

const profilePopup = new PopupWithForm({
  popupSelector: '.edit',
  handleSubmit: values => {
    userInfo.setUserInfo(values.name, values.job)
  }
});
profilePopup.setEventListeners()

const cardPopup = new PopupWithForm({
  popupSelector: '.new-item',
  handleSubmit: card => {
    cardRender.renderer(card, 'prepend')
  }
})
cardPopup.setEventListeners()

buttonEdit.addEventListener('click', function () {
  profilePopup.open();
  profileFormValidation.removeErrors(profilePopup);
  nameInput.value = author.textContent;
  jobInput.value = job.textContent;
});

newItemButton.addEventListener('click', function () {
  cardPopup.open();
  cardFormValidation.removeErrors(cardPopup);
  newItemFormElement.reset();
});



/* newItemForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCardRender = new Section({
    items: [{
      name: newItemName.value,
      link: newItemLink.value
    }],
    renderer: card => {
      const item = createCard(card, '#el-template');
      newCardRender.addItem(item, 'prepend');
    }
  }, '.elements__list');
  newCardRender.rendererItems();
  newItemFormElement.reset();
  newItemFormButton.classList.add('popup__button_disabled');
  newItemFormButton.disabled = true;
  cardPopup.close();
}); */

profileFormValidation.enableValidation()
cardFormValidation.enableValidation()
