export default class Card {
  constructor(data, cardSelector, {handleClickCard, handleGoDelete, handleLikeCard}) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._data = data
    this.likes = data.likes;
    this.handleClickCard = handleClickCard;
    this._ownerId = data.owner._id
    this.handleGoDelete = handleGoDelete;
    this.cardId = data._id;
    this.handleLikeCard = handleLikeCard;
    this.card = card;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  /* getId() {
    return this.cardId;
  } */

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._likeButton = this._element.querySelector('.element__like-group');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._likeCounter.textContent = this.likes.length;
    if (this._ownerId !== '801fc7475d7bc8336e586ad2') {
      this._element.querySelector('.element__trash').remove()
    }
    this._data.likes.forEach(elem => {
      if (elem._id === '801fc7475d7bc8336e586ad2') {
        this._likeButton.classList.toggle("element__group_active");
      }
    });


    return this._element;
  }

  like(sum) {
    this._likeButton.classList.toggle("element__group_active");
    this._likeCounter.textContent = sum;
  }

  _handleLike(evt) {
    /* if (!this._likeButton.classList.contains("element__group_active")) {
      this.handleLikeCard(this.cardId)
        .then((liked) => {
          this.card = liked;
          this._likeCounter.textContent = liked.likes.length;
          this._likeButton.classList.add("element__group_active");
        })
    } else {
      this.deleteCardLike(this.cardId)
        .then((liked) => {
          this.card = liked;
          this._likeCounter.textContent = liked.likes.length;
          this._likeButton.classList.remove("element__group_active");
        })
    } */
    evt.target.classList.toggle('element__group_active')
  }

  handleRemoving() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-group').addEventListener('click', (evt) => {
      this.handleLikeCard(evt);
    })
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this.handleGoDelete();
    })
    this._cardImage.addEventListener('click', () => {
      this.handleClickCard(this._name, this._link);
    })
  }
}

