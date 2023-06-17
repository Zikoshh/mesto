const enableValidation = ({form, formInput, formInputInvalid, formSubmit, formSubmitDisabled, formErrorActive}) => {
  
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${formInputInvalid}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${formErrorActive}`);
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${formInputInvalid}`);
    errorElement.classList.remove(`${formErrorActive}`);
    errorElement.textContent = '';
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };
  
  const toggleButtonState = (inputList, submitButton) => {
    if (hasInvalidInput(inputList)) {
      submitButton.classList.add(`${formSubmitDisabled}`);
      submitButton.setAttribute('disabled', 'disabled');
    } else {
      submitButton.classList.remove(`${formSubmitDisabled}`);
      submitButton.removeAttribute('disabled', 'disabled');
    };
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    };
  };
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(`.${formInput}`));
    const submitButton = formElement.querySelector(`.${formSubmit}`);
    toggleButtonState(inputList, submitButton);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, submitButton);
      });
    });
  };

  const formList = Array.from(document.querySelectorAll(`.${form}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', e => {
      e.preventDefault();
    });

    setEventListeners(formElement);
  });
};



enableValidation({
  form: 'popup__form',
  formInput: 'popup__input',
  formInputInvalid: 'popup__input_invalid',
  formSubmit: 'popup__submit',
  formSubmitDisabled: 'popup__submit_disabled',
  formErrorActive: 'popup__error_active'
});