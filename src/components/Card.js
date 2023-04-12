export class Card {
    constructor(item, userId, {cardTemplateSelector}, {onCardClick, onDeleteClick, onLikeClick}) {
        this._userId = userId;
        this._cardTemplateSelector = cardTemplateSelector;
        this._onCardClick = onCardClick;
        this._onDeleteClick = onDeleteClick;
        this._onLikeClick = onLikeClick;
        this._setItemData(item);
    }

    _setItemData({ _id, name, link, likes, owner }) {
        this._id = _id;
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._owner = owner;
    }

    _createCard() {
        const cardTemplate = document.querySelector(this._cardTemplateSelector).content;
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

        this._element = cardElement;
        this._removeCardElement = cardElement.querySelector('.card__delete');
        this._imageCardElement = cardElement.querySelector('.card__picture');
        this._likeCard = cardElement.querySelector('.card__like-button');
        this._likeCount = cardElement.querySelector('.card__like-count');
        this._cardTitle = cardElement.querySelector('.card__title');
    }

    _handleImageClick() {
        this._onCardClick(this._name, this._link);
    }

    _handleLikeClick() {
        this._onLikeClick();
    }

    _handleDeleteClick() {
        this._onDeleteClick();
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

    _setContent() {
        this._imageCardElement.src = this._link;
        this._imageCardElement.alt = this._name;
        this._cardTitle.textContent = this._name;
        this._likeCount.textContent = this._likes.length;

        if (this.isLiked) {
            this._likeCard.classList.add('card__like-button_active');
        } else {
            this._likeCard.classList.remove('card__like-button_active');
        }


        if (!this.isEditable) {
            this._removeCardElement.remove();
        }
    }

    generateCard() {
        this._createCard();
        this._setEventListeners();

        this._setContent();

        return this._element;
    }

    updateCard(item) {
        this._setItemData(item);
        this._setContent();
    }

    getId() {
        return this._id;
    }

    get isEditable() {
        return this._owner._id === this._userId;
    }

    get isLiked() {
        return !!this._likes.find(like => like._id === this._userId)
    }

    remove() {
        this._element.remove();
    }
}
