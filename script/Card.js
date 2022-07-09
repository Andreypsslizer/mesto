import{openPopup, imagePopup, imageBig, imageBigTitle} from './utils.js'

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _handleLike(evt) {
    evt.target.classList.toggle('element__group_active');
  }

  _handleRemoving() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.element__group').addEventListener('click', (evt) => {
      this._handleLike(evt);
    })
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleRemoving();
    })
    this._element.querySelector('.element__image').addEventListener('click', () => {
      openPopup(imagePopup);
      imageBig.src = this._link;
      imageBig.alt = this._name;
      imageBigTitle.textContent = this._name;
    })
  }
}

