import Card from './cards.js'
import FormValidator from './validate.js';
const container = document.querySelector('.content');
const profileContainer = container.querySelector('.profile');
const buttonEdit = profileContainer.querySelector('.profile__button');
const profilePopup = document.querySelector('.edit');
const buttonsClose = document.querySelectorAll('.popup__close-btn');
const author = profileContainer.querySelector('.profile__name');
const job = profileContainer.querySelector('.profile__subtitle');
const nameFormElement = profilePopup.querySelector('.edit__form');
const picElement = container.querySelector('.element');
const newItemButton = profileContainer.querySelector('.profile__add-btn');
const cardPopup = document.querySelector('.new-item');
const imagePopup = document.querySelector('.element-image-popup');
const newItemForm = cardPopup.querySelector('.new-item__form');
const editFormElement = document.forms.form1;
const newItemFormElement = document.forms.form2;
const nameInput = form1.elements.name;
const jobInput = form1.elements.job;
const newItemName = form2.elements.name;
const newItemLink = form2.elements.link;
const newItemFormButton = cardPopup.querySelector('.new-item__form-submit')
const imageBig = imagePopup.querySelector('.element-image-popup__image');
const imageBigTitle = imagePopup.querySelector('.element-image-popup__title');
const elementOn = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#el-template').content;
const popopOpened = document.querySelectorAll('.popup');
const enableValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
const element = new FormValidator(enableValidation, '.popup__form');

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach((item) => {
  const card = new Card(item, '#el-template');
  const cardElement = card.generateCard();
  elementOn.append(cardElement);
});


const openPopup = (el) => {
  el.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupForEscape);
}
const closePopup = (el) => {
  el.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupForEscape);
}

const closePopupForEscape = (elem) => {
  if (elem.key === 'Escape') {
    const openedElement = document.querySelector('.popup_opened');
    closePopup(openedElement);
  };
};

buttonsClose.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', (e) => {
    closePopup(popup)
  });
})

popopOpened.forEach(el => {
  el.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(el);
    }
  });
})

buttonEdit.addEventListener('click', function () {
  openPopup(profilePopup);
  element.removeErrors(profilePopup);
  nameInput.value = author.textContent;
  jobInput.value = job.textContent;
});

newItemButton.addEventListener('click', function () {
  openPopup(cardPopup);
  element.removeErrors(cardPopup);
  newItemFormElement.reset();
});

nameFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  element.removeErrors(nameFormElement);
  author.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(profilePopup);
});

newItemForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const card = new Card({
    name: newItemName.value,
    link: newItemLink.value
  }, '#el-template')
  const cardElement = card.generateCard()
  elementOn.prepend(cardElement);
  newItemFormElement.reset();
  newItemFormButton.classList.add('popup__button_disabled');
  newItemFormButton.disabled = true;
  closePopup(cardPopup);
});

element.enableValidation()

export {
  openPopup,
  imagePopup,
  imageBig,
  imageBigTitle
}