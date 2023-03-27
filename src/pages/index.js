import { FormValidator } from '../scripts/FormValidator.js';
import { Card } from '../scripts/Card.js';
import { Section } from '../scripts/Section.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { UserInfo } from '../scripts/UserInfo.js';
import './index.css'; // импорт css-стилей для сборки в Webpack

const popupEditFormOpen = document.querySelector('.profile__edit');
const popupCardAddOpen = document.querySelector('.profile__add-button');

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

const popupAddCard = new PopupWithForm({
    popupSelector: '.popup_add_card',
    popupCloseButtonSelector: '.card-close',
    popupOpenedClass: 'popup_is-opened',
    formSelector: '#popup__cards',
    inputSelector: '.popup__text',
}, (values) => {
    const item = renderer({
        name: values['card-name'],
        link: values['src-card']
    });
    section.addItem(item);
    popupAddCard.close();
});

popupAddCard.setEventListeners();
popupCardAddOpen.addEventListener('click', () => {
    popupAddCard.open();
});

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    professionSelector: '.profile__profession'
})

const popupEditProfile = new PopupWithForm({
    popupSelector: '.popup',
    popupCloseButtonSelector: '.popup__close',
    popupOpenedClass: 'popup_is-opened',
    formSelector: '#popup-edit-form',
    inputSelector: '.popup__text',
}, (values) => {
    userInfo.setUserInfo(values.name, values.profesion)
    popupEditProfile.close();
});

popupEditProfile.setEventListeners();
popupEditFormOpen.addEventListener('click', () => {
    popupEditProfile.open({
        name: userInfo.getUserInfo().name,
        profesion: userInfo.getUserInfo().profession,
    });
});

const popupImage = new PopupWithImage({
    popupSelector: '.popup-zoom',
    popupCloseButtonSelector: '.popup__close',
    popupOpenedClass: 'popup_is-opened',
    imageSelector: '.popup__zoom-image',
    titleSelector: '.popup__zoom-title'
});

popupImage.setEventListeners();

const renderer = (item) => {
    const card = new Card(item, '.card-template', (name, link) => {
        popupImage.open(name, link);
    });
    return card.generateCard();
};

const section = new Section({
    items: initialCards,
    renderer: renderer,
}, '.cards');

section.renderItems();

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
