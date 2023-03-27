import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(config, onSubmit) {
        super(config);
        this._form = this._popup.querySelector(config.formSelector);
        this._allInputs = this._form.querySelectorAll(config.inputSelector);
        this._onSubmit = onSubmit;
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


    close() {
        this._form.reset();
        super.close();
    }

    getFormName() {
        return this._form.getAttribute('name');
    }
}
