import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import {PopupWithConfirmation} from '../components/PopupWithConfirmation.js';
import './index.css';


const popupEditFormOpen = document.querySelector('.profile__edit');
const popupCardAddOpen = document.querySelector('.profile__add-button');

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
    headers: {
        authorization: '687bf872-398c-45ba-a034-a397c8c41022',
        'Content-Type': 'application/json'
    }
});

const popupAddCard = new PopupWithForm({
    popupSelector: '.popup_add_card',
    popupCloseButtonSelector: '.card-close',
    popupOpenedClass: 'popup_is-opened',
    formSelector: '#popup__cards',
    inputSelector: '.popup__text',
}, (values) => {
    api.createCard({
        name: values['card-name'],
        link: values['src-card'],
    }).then((res) => {
        const item = renderer(res);
        section.addItem(item);
        popupAddCard.close();
        const formName = popupAddCard.getFormName();
        validators[formName].disableSubmitButton();
    }).catch(err => console.error(err));
});

popupAddCard.setEventListeners();

popupCardAddOpen.addEventListener('click', () => {
    popupAddCard.open();
});

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    professionSelector: '.profile__profession',
    avatarSelector: '.profile__avatar-image',
    avatarButtonSelector: '.profile__avatar-button',
}, () => {
    popupAvatar.setInputValues({
        'src-avatar': userInfo.getUserInfo().avatar,
    })
    popupAvatar.open();
})

userInfo.setEventListeners();

const popupEditProfile = new PopupWithForm({
    popupSelector: '.popup',
    popupCloseButtonSelector: '.popup__close',
    popupOpenedClass: 'popup_is-opened',
    formSelector: '#popup-edit-form',
    inputSelector: '.popup__text',
}, (values) => {
    api.updateUserInfo({
        name: values.name,
        about: values.profession,
    })
        .then((res) => {
            userInfo.setUserInfo({
                id: res._id,
                name: res.name,
                profession: res.about,
                avatar: res.avatar,
            });
            popupEditProfile.close();
        })
        .catch(err => console.error(err));
});

popupEditProfile.setEventListeners();

const popupAvatar = new PopupWithForm({
    popupSelector: '.popup_change_avatar',
    popupCloseButtonSelector: '.popup__close',
    popupOpenedClass: 'popup_is-opened',
    formSelector: '#popup-edit-avatar',
    inputSelector: '.popup__text',
}, (values) => {
    api.updateAvatar(values['src-avatar'])
        .then((res) => {
            userInfo.setUserInfo({
                id: res._id,
                name: res.name,
                profession: res.about,
                avatar: res.avatar,
            });
            popupAvatar.close();
        })
        .catch(err => console.error(err));
});

popupAvatar.setEventListeners();

popupEditFormOpen.addEventListener('click', () => {
    popupEditProfile.setInputValues(userInfo.getUserInfo());
    popupEditProfile.open();
});

const popupImage = new PopupWithImage({
    popupSelector: '.popup-zoom',
    popupCloseButtonSelector: '.popup__close',
    popupOpenedClass: 'popup_is-opened',
    imageSelector: '.popup__zoom-image',
    titleSelector: '.popup__zoom-title'
});

popupImage.setEventListeners();

const popupConfirmation = new PopupWithConfirmation({
    popupSelector: '.popup_confirmation',
    popupCloseButtonSelector: '.popup__close',
    popupOpenedClass: 'popup_is-opened',
    buttonSelector: '.popup__confirmation',
});

popupConfirmation.setEventListeners();

const renderer = (item) => {
    const card = new Card(
        item,
        userInfo.getId(),
        {cardTemplateSelector: '.card-template'},
        {
            onCardClick: (name, link) => {
                popupImage.open(name, link);
            },
            onDeleteClick: () => {
                popupConfirmation.open(() => {
                    api.deleteCard(card.getId())
                        .then(() => {
                            card.remove();
                            popupConfirmation.close();
                        })
                        .catch(err => console.error(err));
                });
            },
            onLikeClick: () => {
                if (card.isLiked) {
                    api.deleteLike(card.getId()).then((res) => {
                        card.updateCard(res);
                    }).catch(err => console.error(err));
                } else {
                    api.setLike(card.getId()).then((res) => {
                        card.updateCard(res);
                    }).catch(err => console.error(err));
                }
            }
        }
    );
    return card.generateCard();
};

const section = new Section({
    renderer: renderer,
}, '.cards');

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

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
])
    .then(results => {
        userInfo.setUserInfo(
            {
                id: results[0]._id,
                name: results[0].name,
                profession: results[0].about,
                avatar: results[0].avatar
            }
        )
        section.renderItems(results[1]);
    })
    .catch(err => console.error(err));
