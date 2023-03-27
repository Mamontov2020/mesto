import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(config, onSubmit) {
        super(config);
        this._form = this._popup.querySelector(config.formSelector);
        this._allInputs = this._form.querySelectorAll(config.inputSelector);
        this._inputValues = {};
        this._onSubmit = onSubmit;
    }

    _getInputValues() {
        this._allInputs.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._onSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }

    open(values) {
        if (values) {
            this._allInputs.forEach(input => {
                input.value = values[input.name];
            });
        }
        super.open();
    }

    close() {
        this._allInputs.forEach(input => {
            input.value = '';
        });
        super.close();
    }
}
