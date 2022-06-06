const container = document.querySelector('.content');
const profileContainer = container.querySelector('.profile');
const buttonEdit = profileContainer.querySelector('.profile__button');
const profilePopup = document.querySelector('.edit');
const popupCloser = document.querySelectorAll('.popup__close-btn');
const author = profileContainer.querySelector('.profile__name');
const job = profileContainer.querySelector('.profile__subtitle');
const nameFormElement = profilePopup.querySelector('.edit__form');
const nameInput = nameFormElement.querySelector('.edit__input-name');
const jobInput = nameFormElement.querySelector('.edit__input-job');
const picElement = container.querySelector('.element');
const newItemButton = profileContainer.querySelector('.profile__add-btn');
const cardPopup = document.querySelector('.new-item');
const imagePopup = document.querySelector('.element-image-popup');
const newItemForm = cardPopup.querySelector('.new-item__form');
const newItemName = cardPopup.querySelector('.new-item__input-name');
const newItemLink = cardPopup.querySelector('.new-item__input-link');
const imageBig = imagePopup.querySelector('.element-image-popup__image');
const imageBigTitle = imagePopup.querySelector('.element-image-popup__title');
const elementOn = document.querySelector('.elements__list');


const initialCards = [
    {
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

const renderCard = (name, link) => {
  const elementTemplate = document.querySelector('#el-template').content;
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  const elementTitle = cardElement.querySelector('.element__title');
  const heart = cardElement.querySelector('.element__group');
  const trash = cardElement.querySelector('.element__trash');

  elementImage.src = link;
  elementImage.alt = name;
  elementTitle.textContent = name;

  heart.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__group_active');
  });
  trash.addEventListener('click', function () {
    cardElement.remove()
  });
  elementImage.addEventListener('click', function(evt) {
    openPopup(imagePopup);
    imageBig.src = link;
    imageBig.alt = name;
    imageBigTitle.textContent = name;
  })
  return cardElement
}

initialCards.forEach((el) => {
  elementOn.append(renderCard(el.name, el.link));
}); 

const openPopup = (el) => {
  el.classList.add('popup_opened');
}
const closePopup = (el) => {
  el.classList.remove('popup_opened');
}

popupCloser.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', (e) => {
      closePopup(popup)
  });
})

buttonEdit.addEventListener('click', function() {
    openPopup(profilePopup);
    nameInput.value = author.textContent;
    jobInput.value = job.textContent;
});

newItemButton.addEventListener('click', function() {
    openPopup(cardPopup);
});

nameFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    author.textContent = nameInput.value; 
    job.textContent = jobInput.value;
    profilePopup.classList.remove('popup_opened');
});

newItemForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  elementOn.prepend(renderCard(newItemName.value, newItemLink.value));
  newItemLink.value = '';
  newItemName.value = '';
  closePopup(cardPopup);
});
