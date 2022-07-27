export default class Popup {
    constructor(popupSelector){
        this._popupSelector = document.querySelector(popupSelector);
    }

    _handleEscClose(elem) {
        if (elem.key === 'Escape') {
            this.close()
        };
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', elem => {
            this._handleEscClose(elem)
        });
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', () => {
            this._handleEscClose()
        });
    }

    setEventListeners() {
        document.addEventListener('click', e => {
            if (
                e.target.classList.contains('popup_opened') ||
                e.target.classList.contains('popup__close-btn')
              ) {
                this.close()
              }
        });
    }
}