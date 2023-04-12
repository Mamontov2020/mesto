import {Popup} from './Popup.js';

export class PopupWithConfirmation extends Popup {
    constructor(config) {
        super(config);
        this._button = this._popup.querySelector(config.buttonSelector);

    }

    setEventListeners() {
        super.setEventListeners();

        this._button.addEventListener('click', () => {
            this._onSubmit(this._confirmationId);
        });
    }

    open(onSubmit) {
        this._onSubmit = onSubmit;
        super.open();
    }
}
