import {closePopup} from "./add-card.js";

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
const cardElement = document.querySelector("#card-name");
const popupImageZoom = document.querySelector('.popup__zoom');
const popupImageLink = document.querySelector('.popup__zoom-image');
const popupImageClose = document.querySelector('.zoom__close');
const popupImageTitle = document.querySelector('.popup__zoom-title');

function insertCard(link, name){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const removeCardElement = cardElement.querySelector('.card__delete');
  const imageCardElement = cardElement.querySelector('.card__picture');
  const likeCard = cardElement.querySelector('.card__like-button');
  removeCardElement.addEventListener('click', function() {

    cardElement.remove();
  });
  imageCardElement.addEventListener('click', function() {
    popupImageLink.src = link;
    popupImageTitle.textContent = name;
    popupImageZoom.classList.add("popup_is-opened");
  });
  likeCard.addEventListener('click', function() {
    likeCard.classList.toggle('card__like-button_active'); 
    console.log(cardElement);
 }); 
  cardElement.querySelector('.card__picture').src = link;
  cardElement.querySelector('.card__picture').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardsList.prepend(cardElement);
}

initialCards.forEach(card => {
  insertCard(card.link, card.name);
})

function closePopupImage() {
  popupImageZoom.classList.remove("popup_is-opened");
}

//обработка кнопки создания
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (cardElement.value !== "" && srcElement.value !== "") {
     insertCard(srcElement.value, cardElement.value);
     closePopup();
  }
}

cardFormElement.addEventListener("submit", handleProfileFormSubmit);
popupImageClose.addEventListener("click", closePopupImage);
