import Card from './Card.js'
import FormValidator from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';
import {initialCards, validConfig} from './constants.js'
const container = document.querySelector('.content');
const profileContainer = container.querySelector('.profile');
const buttonEdit = profileContainer.querySelector('.profile__button');
const profilePopup = document.querySelector('.edit');
const author = profileContainer.querySelector('.profile__name');
const job = profileContainer.querySelector('.profile__subtitle');
const nameFormElement = profilePopup.querySelector('.edit__form');
const newItemButton = profileContainer.querySelector('.profile__add-btn');
const cardPopup = document.querySelector('.new-item');
const newItemForm = cardPopup.querySelector('.new-item__form');
const editFormElement = document.forms.profile;
const newItemFormElement = document.forms.card;
const nameInput = profile.elements.name;
const jobInput = profile.elements.job;
const newItemName = card.elements.name;
const newItemLink = card.elements.link;
const newItemFormButton = cardPopup.querySelector('.new-item__form-submit')
const elementOn = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#el-template').content;

const addingCard = (data, selector) => {
  const card = new Card(data, selector);
  const cardElement = card.generateCard();
  return cardElement
}

const generateValidation = (data, selector) => {
  const element = new FormValidator(data, selector);
  return element
}

const profileFormValidation = generateValidation(validConfig, editFormElement);

const cardFormValidation = generateValidation(validConfig, newItemFormElement)

initialCards.forEach((item) => {
  elementOn.append(addingCard(item, '#el-template'));
});

buttonEdit.addEventListener('click', function () {
  openPopup(profilePopup);
  profileFormValidation.removeErrors(profilePopup);
  nameInput.value = author.textContent;
  jobInput.value = job.textContent;
});

newItemButton.addEventListener('click', function () {
  openPopup(cardPopup);
  cardFormValidation.removeErrors(cardPopup);
  newItemFormElement.reset();
});

nameFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileFormValidation.removeErrors(nameFormElement);
  author.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(profilePopup);
});

newItemForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  elementOn.prepend(addingCard({
    name: newItemName.value,
    link: newItemLink.value
  }, '#el-template'));
  newItemFormElement.reset();
  newItemFormButton.classList.add('popup__button_disabled');
  newItemFormButton.disabled = true;
  closePopup(cardPopup);
});

profileFormValidation.enableValidation()
cardFormValidation.enableValidation()
