import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import {initialCards, validConfig} from '../utils/constants.js'
import Section from '../components/Section.js';
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js"
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
const container = document.querySelector('.content');
const profileContainer = container.querySelector('.profile');
const buttonEdit = profileContainer.querySelector('.profile__button');
const newItemButton = profileContainer.querySelector('.profile__add-btn');
const editFormElement = document.forms.profile;
const newItemFormElement = document.forms.card;
const nameInput = profile.elements.name; 
const jobInput = profile.elements.job; 

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


const bigImagePopup = new PopupWithImage('.element-image-popup');
bigImagePopup.setEventListeners()

const profilePopup = new PopupWithForm({
  popup: '.edit',
  handleSubmit: values => {
    userInfo.setUserInfo(values.name, values.job)
  }
});
profilePopup.setEventListeners()

const cardPopup = new PopupWithForm({
  popup: '.new-item',
  handleSubmit: card => {
    cardRender.renderer(card, 'prepend')
  }
})
cardPopup.setEventListeners()

buttonEdit.addEventListener('click', function () {
  profilePopup.open();
  const {job, name} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  profileFormValidation.resetValidation();
});

newItemButton.addEventListener('click', function () {
  cardPopup.open();
  cardFormValidation.resetValidation();
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
