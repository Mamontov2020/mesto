import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(config, onSubmit) {
        super(config);
        this._form = this._popup.querySelector(config.formSelector);
        this._allInputs = this._form.querySelectorAll(config.inputSelector);
        this._submitButton = this._form.querySelector('button[type="submit"]');
        this._submitButtonText = this._submitButton.textContent;
        this._onSubmit = onSubmit;
        this._isLoading = false;
    }

    _getInputValues() {
        const inputValues = {};
        this._allInputs.forEach(input => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._onSubmit(this._getInputValues());
            this.setLoading(true);
        });
        super.setEventListeners();
    }

    setInputValues(values) {
        if (values) {
            this._allInputs.forEach(input => {
                input.value = values[input.name];
            });
        }
    }

    setLoading(isLoading) {
        this._isLoading = isLoading;
        if (isLoading) {
            this._submitButton.disabled = true;
            this._submitButton.textContent = 'Сохранение...'
        } else {
            this._submitButton.disabled = false;
            this._submitButton.textContent = this._submitButtonText;
        }
    }

    close() {
        this._form.reset();
        super.close();
    }

    getFormName() {
        return this._form.getAttribute('name');
    }
}
