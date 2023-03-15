import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

//PopupEditFormOpen
const popupEditProfileElement = document.querySelector(".popup");
const popupEditFormOpen = document.querySelector(".profile__edit");
const popupEditFormClose = document.querySelector(".popup__close");
const popupEditForm = document.querySelector("#popup-edit-form");
const profileNameElement = document.querySelector(".profile__name");
const profileProfessionElement = document.querySelector(".profile__profession");
const nameElement = document.querySelector("#name");
const professionElement = document.querySelector("#profession");

//PopupCardAddOpen

const popupCardAddElement = document.querySelector(".popup_add_card");
const popupCardAddOpen = document.querySelector(".profile__add-button");
const popupCardAddClose = document.querySelector(".card-close");
const cardNameElement = document.querySelector(".card-name");
const cardSrcElement = document.querySelector(".src-card");
const cardIdNameElement = document.querySelector("#card-name");

//CreateCard

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsList = document.querySelector('.cards');
const cardFormElement = document.querySelector("#popup__cards");
const srcElement = document.querySelector("#src-card");
const cardNameIdElement = document.querySelector("#card-name");
const popupImageZoom = document.querySelector('.popup-zoom');
const popupImageLink = document.querySelector('.popup__zoom-image');
const popupImageClose = document.querySelector('.zoom-close');
const popupImageTitle = document.querySelector('.popup__zoom-title');


//PopupEditFormOpen
function openPopupEditForm() {
  nameElement.value = profileNameElement.textContent;
  professionElement.value = profileProfessionElement.textContent;
  openPopup(popupEditProfileElement);
}

function closePopupEditForm() {
  closePopup(popupEditProfileElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameElement.value;
  profileProfessionElement.textContent = professionElement.value;
  closePopupEditForm();
}

popupEditFormOpen.addEventListener("click", openPopupEditForm);
popupEditFormClose.addEventListener("click", closePopupEditForm);
popupEditForm.addEventListener("submit", handleProfileFormSubmit);


//PopupCardAddOpen

function openPopupCardAdd() {
  cardIdNameElement.value = cardNameElement.textContent;
  cardSrcElement.value = cardSrcElement.textContent;
  const validator = validators[cardFormElement.getAttribute('name')];
  if (validator) {
    validator.disableSubmitButton();
  }
  openPopup(popupCardAddElement);
}

function closePopupCardAdd() {
  closePopup(popupCardAddElement);
}

popupCardAddOpen.addEventListener("click", openPopupCardAdd);
popupCardAddClose.addEventListener("click", closePopupCardAdd);


//CreateCard

function handleOpenPopup(name, link) {
  popupImageLink.src = link;
  popupImageLink.alt = 'Картинка увеличенная ' + name;
  popupImageTitle.textContent = name;
  openPopup(popupImageZoom);
}

function createCard(name, link) {
  const card = new Card({ name, link }, '.card-template', handleOpenPopup);
  return card.generateCard();
}

function insertCard(list, element) {
  list.prepend(element);
}

initialCards.forEach(card => {
  const cardElement = createCard(card.name, card.link);
  insertCard(cardsList, cardElement);
})

function closePopupImage() {
  closePopup(popupImageZoom);
}

//CreateCard
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const cardElement = createCard(cardNameIdElement.value, srcElement.value);
  insertCard(cardsList, cardElement);
  closePopupCardAdd();
}

cardFormElement.addEventListener("submit", handleAddCardSubmit);
popupImageClose.addEventListener("click", closePopupImage);

//Open And Close popup

function openPopup(popup) {
  document.addEventListener('keydown', keyHandler);
  popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
  document.removeEventListener('keydown', keyHandler);
  popup.classList.remove('popup_is-opened');
}

//closeOnEsc

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}


//closeOnOwerlay
const popupSelector = 'popup';
const popups = document.querySelectorAll(`.${popupSelector}`);
popups.forEach(popup => {
  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains(popupSelector)) {
      closePopup(popup);
    }
  });
});

const config = {
  formSelector: '.popup__content',
  inputSelector: '.popup__text',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: '.popup__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

const validators = {};

const formList = Array.from(document.querySelectorAll(config.formSelector));
formList.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  validators[form.getAttribute('name')] = formValidator;
  formValidator.enableValidation();
});
