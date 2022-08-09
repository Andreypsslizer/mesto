export default class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._popupButton = this._popup.querySelector('.popup__button')
    }

    _handleEscClose(elem) {
        if (elem.key === 'Escape') {
            this.close()
        };
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._popupButton.textContent = 'Сохранение...'
        } else {
            this._popupButton.textContent = 'Сохранить'
        }
      }

    setEventListeners() {
        this._popup.addEventListener('mousedown', e => {
            if (
                e.target.classList.contains('popup_opened') ||
                e.target.classList.contains('popup__close-btn')
              ) {
                this.close()
              }
        });
    }
}