import Popup from "./Popup";

export default class PopupWithDeletion extends Popup {
    constructor(popup, {handleDeletion}) {
        super(popup)
        this._button = document.querySelector('.popup__deletion-submit')
        this.handleDeletion = handleDeletion;
    }

    setEventListeners() {
        this._button.addEventListener('click', () => {
            this.handleDeletion()
        })
        super.setEventListeners()
    }
}