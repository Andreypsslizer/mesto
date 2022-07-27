import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._title = document.querySelector(popupSelector).querySelector('.element-image-popup__title');
        this._image = document.querySelector(popupSelector).querySelector('.element-image-popup__image');
    }

    open(title, image) {
        
        this._image.src = image;
        this._title.textContent = title;
        this._image.alt = title;
        super.open();
    }
}