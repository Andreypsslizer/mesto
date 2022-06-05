const container = document.querySelector('.content');
const profileContainer = container.querySelector('.profile');
const editButton = profileContainer.querySelector('.profile__button');
const edit = document.querySelector('.edit');
const editCloser = edit.querySelector('.edit__close-btn');
const author = profileContainer.querySelector('.profile__name');
const job = profileContainer.querySelector('.profile__subtitle');
const formElement = edit.querySelector('.edit__form');
const nameInput = formElement.querySelector('.edit__input-name');
const jobInput = formElement.querySelector('.edit__input-job');
const picElement = container.querySelector('.element');
const newItemButton = profileContainer.querySelector('.profile__add-btn');
const newItem = document.querySelector('.new-item');
const newItemCloser = newItem.querySelector('.new-item__close-btn');
const bigImage = document.querySelector('.element-image-popup');
const elementToTrash = container.querySelectorAll('.element__trash');
const elementTemplate = document.querySelector('#el-template').content;
const elementOn = container.querySelector('.elements__list');
const imageCloser = bigImage.querySelector('.element__close-btn');
const newItemForm = newItem.querySelector('.new-item__form');
const newItemName = newItem.querySelector('.new-item__input-name');
const newItemLink = newItem.querySelector('.new-item__input-link');

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

initialCards.forEach((el) => {
  let cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = el.link;
  cardElement.querySelector('.element__image').alt = el.name;
  cardElement.querySelector('.element__title').textContent = el.name;
  elementOn.append(cardElement);
  cardElement.querySelector('.element__group').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__group_active');
  });
  cardElement.querySelector('.element__trash').addEventListener('click', function () {
    cardElement.remove()
  });
  cardElement.querySelector('.element__image').addEventListener('click', function(evt) {
    bigImage.classList.add('image-popup_opened');
    bigImage.querySelector('.element__image_big').src = evt.target.src;
    bigImage.querySelector('.element__title_big').textContent = cardElement.querySelector('.element__title').textContent;
  })
}); 

editButton.addEventListener('click', function() {
    edit.classList.add('edit_opened');
    nameInput.value = author.textContent;
    jobInput.value = job.textContent;
});

imageCloser.addEventListener('click', function() {
  bigImage.classList.remove('image-popup_opened');
});

editCloser.addEventListener('click', function() {
    edit.classList.remove('edit_opened');
});

newItemButton.addEventListener('click', function() {
    newItem.classList.add('new-item_opened');
});

newItemCloser.addEventListener('click', function() {
    newItem.classList.remove('new-item_opened');
});

formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    author.textContent = nameInput.value; 
    job.textContent = jobInput.value;
    edit.classList.remove('edit_opened');
});

newItemForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  let cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = newItemLink.value;
  cardElement.querySelector('.element__image').alt = newItemName.value;
  cardElement.querySelector('.element__title').textContent = newItemName.value;
  newItem.classList.remove('new-item_opened');
  elementOn.prepend(cardElement);
  cardElement.querySelector('.element__group').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__group_active');
  });
  cardElement.querySelector('.element__trash').addEventListener('click', function () {
    cardElement.remove()
  });
  cardElement.querySelector('.element__image').addEventListener('click', function(evt) {
    bigImage.classList.add('image-popup_opened');
    bigImage.querySelector('.element__image_big').src = evt.target.src;
    bigImage.querySelector('.element__title_big').textContent = cardElement.querySelector('.element__title').textContent;
  })
});
