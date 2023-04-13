import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import {PopupWithConfirmation} from '../components/PopupWithConfirmation.js';
import {
    BASE_URL,
    TOKEN,
    CARD_TEMPLATE_SELECTOR,
    CARDS_SELECTOR,
    EDIT_AVATAR_CONFIG,
    EDIT_PROFILE_CONFIG,
    POPUP_ADD_CARD_CONFIG,
    POPUP_CONFIRMATION_CONFIG,
    POPUP_IMAGE_CONFIG,
    USER_INFO_CONFIG,
    VALIDATOR_CONFIG
} from '../utils/constants.js';
import './index.css';


const popupEditFormOpen = document.querySelector('.profile__edit');
const popupCardAddOpen = document.querySelector('.profile__add-button');

const api = new Api({
    baseUrl: BASE_URL,
    headers: {
        authorization: TOKEN,
        'Content-Type': 'application/json'
    }
});

const popupAddCard = new PopupWithForm(POPUP_ADD_CARD_CONFIG, (values) => {
    api.createCard({
        name: values['card-name'],
        link: values['src-card'],
    })
        .then((res) => {
            const item = renderer(res);
            section.addItem(item);
            popupAddCard.close();
        })
        .catch(err => console.error(err))
        .finally(() => {
            popupAddCard.setLoading(false);
        });
});

popupAddCard.setEventListeners();

popupCardAddOpen.addEventListener('click', () => {
    popupAddCard.open();
    const formName = popupAddCard.getFormName();
    validators[formName].disableSubmitButton();
});

const userInfo = new UserInfo(USER_INFO_CONFIG, () => {
    popupAvatar.setInputValues({
        'src-avatar': userInfo.getUserInfo().avatar,
    })
    const formName = popupAvatar.getFormName();
    validators[formName].disableSubmitButton();
    popupAvatar.open();
})

userInfo.setEventListeners();

const popupEditProfile = new PopupWithForm(EDIT_PROFILE_CONFIG, (values) => {
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
        .catch(err => console.error(err))
        .finally(() => {
            popupEditProfile.setLoading(false);
        });
});

popupEditProfile.setEventListeners();

const popupAvatar = new PopupWithForm(EDIT_AVATAR_CONFIG, (values) => {
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
        .catch(err => console.error(err))
        .finally(() => {
            popupAvatar.setLoading(false);
        });
});

popupAvatar.setEventListeners();

popupEditFormOpen.addEventListener('click', () => {
    popupEditProfile.setInputValues(userInfo.getUserInfo());
    const formName = popupEditProfile.getFormName();
    validators[formName].disableSubmitButton();
    popupEditProfile.open();
});

const popupImage = new PopupWithImage(POPUP_IMAGE_CONFIG);

popupImage.setEventListeners();

const popupConfirmation = new PopupWithConfirmation(POPUP_CONFIRMATION_CONFIG);

popupConfirmation.setEventListeners();

const renderer = (item) => {
    const card = new Card(
        item,
        userInfo.getId(),
        {cardTemplateSelector: CARD_TEMPLATE_SELECTOR},
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
}, CARDS_SELECTOR);

const validators = {};

const formList = Array.from(document.querySelectorAll(VALIDATOR_CONFIG.formSelector));
formList.forEach((form) => {
    const formValidator = new FormValidator(VALIDATOR_CONFIG, form);
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
