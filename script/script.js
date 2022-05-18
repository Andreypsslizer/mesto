let container = document.querySelector('.content');
let profileContainer = container.querySelector('.profile');
let editButton = profileContainer.querySelector('.profile__button');
let edit = container.querySelector('.edit');
let editCloser = edit.querySelector('.edit__close-btn');
let author = profileContainer.querySelector('.profile__name');
let job = profileContainer.querySelector('.profile__subtitle');
let formElement = edit.querySelector('.edit__form');
let nameInput = formElement.querySelector('.edit__input-name');
let jobInput = formElement.querySelector('.edit__input-job');
let heart = container.querySelectorAll('.element__group')

function openEdit() {
    edit.classList.add('edit_opened');
    nameInput.value = author.textContent;
    jobInput.value = job.textContent;
}

function closeEdit() {
    edit.classList.remove('edit_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    author.textContent = nameInput.value; 
    job.textContent = jobInput.value;
    edit.classList.remove('edit_opened');
}


editButton.addEventListener('click', openEdit);
editCloser.addEventListener('click', closeEdit);
formElement.addEventListener('submit', formSubmitHandler);
