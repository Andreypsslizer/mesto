import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popup){
        super(popup);
        this._title = this._popup.querySelector('.element-image-popup__title');
        this._image = this._popup.querySelector('.element-image-popup__image');
    }

    open(title, image) {
        
        this._image.src = image;
        this._title.textContent = title;
        this._image.alt = title;
        super.open();
    }
}