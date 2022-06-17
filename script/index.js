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


const renderCard = (name, link) => {
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
  el.addEventListener('mousedown', function(evt){
    if(evt.target.classList.contains('popup_opened')){
        closePopup(el);
    }
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
    closePopup(profilePopup);
});

newItemForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  elementOn.prepend(renderCard(newItemName.value, newItemLink.value));
  newItemFormElement.reset();
  newItemFormButton.classList.add('popup__button_disabled');
  newItemFormButton.disabled = true;
  closePopup(cardPopup);
});
