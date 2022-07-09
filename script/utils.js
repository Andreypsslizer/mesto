const imagePopup = document.querySelector('.element-image-popup');
const imageBig = imagePopup.querySelector('.element-image-popup__image');
const imageBigTitle = imagePopup.querySelector('.element-image-popup__title');
const buttonsClose = document.querySelectorAll('.popup__close-btn');
const popopOpened = document.querySelectorAll('.popup');

const openPopup = (el) => {
    el.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupForEscape);
}

const closePopup = (el) => {
    el.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupForEscape);
}

const closePopupForEscape = (elem) => {
    if (elem.key === 'Escape') {
        const openedElement = document.querySelector('.popup_opened');
        closePopup(openedElement);
    };
};

buttonsClose.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', (e) => {
        closePopup(popup)
    });
})

popopOpened.forEach(el => {
    el.addEventListener('mousedown', function (evt) {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(el);
        }
    });
})

export {
    openPopup,
    closePopup,
    imagePopup,
    imageBig,
    imageBigTitle
}