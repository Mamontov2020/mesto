const popupImageLink = document.querySelector('.popup__zoom-image');
const popupImageTitle = document.querySelector('.popup__zoom-title');
const popupImageZoom = document.querySelector('.popup-zoom');

function closePopup(popup) {
    document.removeEventListener('keydown', keyHandler);
    popup.classList.remove('popup_is-opened');
}

function keyHandler(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
}

function openPopup(popup) {
    document.addEventListener('keydown', keyHandler);
    popup.classList.add('popup_is-opened');
}

export class Card {
    constructor(name, link, cardTemplateSelector) {
        this._name = name;
        this._link = link;
        this._cardTemplateSelector = cardTemplateSelector;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardTemplateSelector).content;
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

        this._element = cardElement;
        this._removeCardElement = cardElement.querySelector('.card__delete');
        this._imageCardElement = cardElement.querySelector('.card__picture');
        this._likeCard = cardElement.querySelector('.card__like-button');
        this._cardTitle = cardElement.querySelector('.card__title');
    }

    _handleImageClick() {
        popupImageLink.src = this._link;
        popupImageLink.alt = 'Картинка увеличенная ' + this._name;
        popupImageTitle.textContent = this._name;
        openPopup(popupImageZoom);
    }

    _handleLikeClick() {
        this._likeCard.classList.toggle('card__like-button_active');
    }

    _handleDeleteClick() {
        this._element.remove();
    }

    _setEventListeners() {
        this._imageCardElement.addEventListener('click', () => {
            this._handleImageClick();
        });

        this._likeCard.addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._removeCardElement.addEventListener('click', () => {
            this._handleDeleteClick();
        });
    }

    generateCard() {
        this._getTemplate();
        this._setEventListeners();

        this._imageCardElement.src = this._link;
        this._imageCardElement.alt = this._name;
        this._cardTitle.textContent = this._name;

        return this._element;
    }
}
