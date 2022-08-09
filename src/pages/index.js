import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import {initialCards, validConfig} from '../utils/constants.js'
import Section from '../components/Section.js';
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js"
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import PopupWithDeletion from '../components/PopupWithDeletion.js';
const container = document.querySelector('.content');
const profileContainer = container.querySelector('.profile');
const buttonEdit = profileContainer.querySelector('.profile__button');
const newItemButton = profileContainer.querySelector('.profile__add-btn');
const newAvatarButton = profileContainer.querySelector('.profile__avatar-wrapper');
const editFormElement = document.forms.profile;
const newItemFormElement = document.forms.card;
const avatarFormElement = document.forms.avatar;
const nameInput = profile.elements.name; 
const jobInput = profile.elements.job; 

function addLike(card) {
  api.likeCardAdd(card.cardId)
    .then((res) => {
      card.like(res.likes.length)
    })
    .catch(err => console.log(`Error: ${err}`))
}

function removeLike(card) {
  api.likeCardDel(card.cardId)
    .then((res) => {
      card.like(res.likes.length)
    })
    .catch(err => console.log(`Error: ${err}`))
}

const createCard = (data, selector) => {
  const card = new Card(data, selector, 
    {handleClickCard: (name, link) => {bigImagePopup.open(name, link)},
    handleGoDelete: () => {
      cardDeletion.open()
      cardDeletion.currentCard = card}, 
    handleLikeCard: (evt) => {
      if (!evt.target.classList.contains("element__group_active")) {
        addLike(card)
      } else {
        removeLike(card)
      }
    },
    /* handleLikeCard: () => {
      const likedcarded = card.likes.map(elem => Object.values(elem)).flat().includes('801fc7475d7bc8336e586ad2')
      if (likedcarded) {
        api.likeCardAdd(card.cardId)
      } else {
        api.likeCardDel(card.cardId)
      } 
    } */});
  const cardElement = card.generateCard();
  return cardElement
}

const generateValidation = (data, selector) => {
  const element = new FormValidator(data, selector);
  return element
}

const profileFormValidation = generateValidation(validConfig, editFormElement);

const cardFormValidation = generateValidation(validConfig, newItemFormElement);

const avatarFormValidation = generateValidation(validConfig, avatarFormElement);

const cardRender = new Section({
  /* items: initialCards, */
  renderer: (card, meth = 'append') => {
    const item = createCard(card, '#el-template');
    cardRender.addItem(item, meth);
  }
}, '.elements__list')

/* cardRender.rendererItems() */

const userInfo = new UserInfo ({
  name: '.profile__name',
  job: '.profile__subtitle',
  avatar: '.profile__avatar'
})

const cardDeletion = new PopupWithDeletion('.deletion', {
  handleDeletion: () => {
    api.deleteCard(cardDeletion.currentCard.cardId).then(() => {
      cardDeletion.currentCard.handleRemoving()
      cardDeletion.close()
    })
    .catch(err => console.log(`Error: ${err}`))
  }
});
cardDeletion.setEventListeners()


const bigImagePopup = new PopupWithImage('.element-image-popup');
bigImagePopup.setEventListeners()

const profilePopup = new PopupWithForm({
  popup: '.edit',
  handleSubmit: values => {
    userInfo.setUserInfo(values.name, values.job)
    api.setUser(values.name, values.job)
    .catch(err => console.log(`Error: ${err}`))
    .finally(() => {
      profilePopup.renderLoading(false)
    })
  }
});
profilePopup.setEventListeners()

const cardPopup = new PopupWithForm({
  popup: '.new-item',
  handleSubmit: card => {
    api.addCard(card.name, card.link).then(cardItem => {
      cardRender.renderer(cardItem, 'prepend')
    })
    .catch(err => console.log(`Error: ${err}`))
    .finally(() => {
      cardPopup.renderLoading(false)
    })
  }
  
})
cardPopup.setEventListeners()

const avatarPopup = new PopupWithForm({
  popup: '.new-avatar',
  handleSubmit: values => {
    userInfo.setUserAvatar(values.link);
    api.avatarChange(values.link)
    .catch(err => console.log(`Error: ${err}`))
    .finally(() => {
      avatarPopup.renderLoading(false)
    })
  }
});
avatarPopup.setEventListeners()

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

newAvatarButton.addEventListener('click', function () {
  avatarPopup.open();
  avatarFormValidation.resetValidation();
})



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
avatarFormValidation.enableValidation()

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: '17aa0cf6-e649-4f79-bf3b-8e03d1821ac9',
    'Content-Type': 'application/json'
  }
});


Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, card]) => {
    cardRender.rendererItems(card);
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setUserAvatar(user.avatar);
  })
  .catch(err => console.log(`Error: ${err}`))

