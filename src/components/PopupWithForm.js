import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popup, handleSubmit }) {
        super(popup);
        this._handleSubmit = handleSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._input = this._popupForm.querySelectorAll('.popup__input')
    }

    close() {
        super.close();
        this._popupForm.reset()
    }

    _getInputValues(){
        const values = {}
        this._input.forEach(elem => {
            values[elem.name] = elem.value
        })
        return values
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', elem => {
            elem.preventDefault();
            this._handleSubmit(this._getInputValues())
            this.close()
        })
        super.setEventListeners()
    }
}