export default class Card {
  constructor(data, cardSelector, {handleClickCard}) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.handleClickCard = handleClickCard
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
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
      this.handleClickCard(this._name, this._link);
    })
  }
}

