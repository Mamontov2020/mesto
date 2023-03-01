const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);                        
    errorElement.textContent = errorMessage;                                     
    errorElement.classList.add(config.errorClass);                     
  };
  
  const hideInputError = (formElement, inputElement, config) => {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = ''; 
  };
  
  const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {                                            
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some(input => !input.validity.valid)
  };
  
  const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {                   
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false; 
  } 
  }; 
  
  const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector); 
    toggleButtonState(inputList, buttonElement); 
    inputList.forEach((inputElement) => {                             
      inputElement.addEventListener('input', function () {            
        checkInputValidity(formElement, inputElement, config);              
        toggleButtonState(inputList, buttonElement);                 
      });
    });
  };
  
  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector)); 
    formList.forEach((formElement) => {                              
      formElement.addEventListener('submit', function (evt) {       
        evt.preventDefault();                                         
      });
      setEventListeners(formElement, config);                                   
    });
  };

enableValidation({
  formSelector: '.popup__content',
  inputSelector: '.popup__text',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: '.popup__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});