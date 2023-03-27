export class Card {
    constructor({ name, link }, cardTemplateSelector, onCardClick) {
        this._name = name;
        this._link = link;
        this._cardTemplateSelector = cardTemplateSelector;
        this._onCardClick = onCardClick;
    }

    _createCard() {
        const cardTemplate = document.querySelector(this._cardTemplateSelector).content;
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

        this._element = cardElement;
        this._removeCardElement = cardElement.querySelector('.card__delete');
        this._imageCardElement = cardElement.querySelector('.card__picture');
        this._likeCard = cardElement.querySelector('.card__like-button');
        this._cardTitle = cardElement.querySelector('.card__title');
    }

    _handleImageClick() {
        this._onCardClick(this._name, this._link);
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
        this._createCard();
        this._setEventListeners();

        this._imageCardElement.src = this._link;
        this._imageCardElement.alt = this._name;
        this._cardTitle.textContent = this._name;

        return this._element;
    }
}
