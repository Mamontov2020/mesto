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
const cardSaveButton = document.querySelector(".popup__save_card");
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

const cardTemplate = document.querySelector('.card-template').content;
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
    cardSaveButton.disabled = true;
    openPopup(popupCardAddElement);
}

function closePopupCardAdd() {
    closePopup(popupCardAddElement);
}

popupCardAddOpen.addEventListener("click", openPopupCardAdd);
popupCardAddClose.addEventListener("click", closePopupCardAdd);


//CreateCard

function createCard(name, link) {
    const card = new Card(name, link, '.card-template');
    return card.generateCard();
}

function insertCard(list, element){
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

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
  popup.addEventListener("click", (e) => {
    const isClosest = e.target.closest('.popup__container');
    if (!isClosest) {
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

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const formList = Array.from(document.querySelectorAll(config.formSelector));
formList.forEach((form) => {
    const validateForm = new FormValidator(config, form);
    validateForm.enableValidation();
});
