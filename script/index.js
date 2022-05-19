const container = document.querySelector('.content');
const profileContainer = container.querySelector('.profile');
const editButton = profileContainer.querySelector('.profile__button');
const edit = document.querySelector('.edit');
const editCloser = edit.querySelector('.edit__close-btn');
const author = profileContainer.querySelector('.profile__name');
const job = profileContainer.querySelector('.profile__subtitle');
const formElement = edit.querySelector('.edit__form');
const nameInput = formElement.querySelector('.edit__input-name');
const jobInput = formElement.querySelector('.edit__input-job');
const heart = container.querySelectorAll('.element__group')

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
    closeEdit();
}


editButton.addEventListener('click', openEdit);
editCloser.addEventListener('click', closeEdit);
formElement.addEventListener('submit', formSubmitHandler);
