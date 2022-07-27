import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleSubmit }) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._popupForm = document.querySelector(popupSelector).querySelector('.popup__form');
        this._input = this._popupForm.querySelectorAll('.popup__input')
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