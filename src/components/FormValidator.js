export class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(config.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass
    }

    _isInputValid(inputElement) {
        return inputElement.validity.valid;
    }

    _isAllInputsValid() {
        return this._inputList.every(this._isInputValid)
    };

    _setButtonDisabled(disabled) {
        this._buttonElement.disabled = disabled;
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        const errorMessage = inputElement.validationMessage;
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _toggleButtonState() {
        this._setButtonDisabled(!this._isAllInputsValid())
    }

    _toggleError(inputElement) {
        if (this._isInputValid(inputElement)) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    }

    _setEventListeners() {
        this._toggleButtonState();

        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleError(inputElement);
                this._toggleButtonState();
            });
        });
    }

    disableSubmitButton() {
        this._setButtonDisabled(true);
    }

    enableValidation() {
        this._setEventListeners();
    }
}
