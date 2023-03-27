export class Popup {
    constructor({popupSelector, popupOpenedClass, popupCloseButtonSelector}) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._popupCloseButton = this._popup.querySelector(popupCloseButtonSelector);
        this._popupOpenedClass = popupOpenedClass;
    }

    open() {
        this._popup.classList.add(this._popupOpenedClass);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove(this._popupOpenedClass);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', () => {
            this.close();
        });

        this._popup.addEventListener('click', (e) => {
            if (e.target.classList.contains(this._popupSelector.slice(1))) {
                this.close();
            }
        });
    }
}
