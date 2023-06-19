const enableValidation = ({form, formInput, formInputInvalid, formSubmit, formSubmitDisabled, formErrorActive}) => {
  const formList = Array.from(document.querySelectorAll(`.${form}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', e => {
      e.preventDefault();
    });

    setEventListeners(formElement, formInput, formSubmit, formInputInvalid, formSubmitDisabled, formErrorActive);
  });
};

const showInputError = (formElement, inputElement, errorMessage, formInputInvalid, formErrorActive) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${formInputInvalid}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${formErrorActive}`);
};

const hideInputError = (formElement, inputElement, formInputInvalid, formErrorActive) => {
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

const toggleButtonState = (inputList, submitButton, formSubmitDisabled) => {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(`${formSubmitDisabled}`);
    submitButton.setAttribute('disabled', 'disabled');
  } else {
    submitButton.classList.remove(`${formSubmitDisabled}`);
    submitButton.removeAttribute('disabled', 'disabled');
  };
};

const checkInputValidity = (formElement, inputElement, formInputInvalid, formErrorActive) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formInputInvalid, formErrorActive);
  } else {
    hideInputError(formElement, inputElement, formInputInvalid, formErrorActive);
  };
};

const setEventListeners = (formElement, formInput, formSubmit, formInputInvalid, formSubmitDisabled, formErrorActive) => {
  const inputList = Array.from(formElement.querySelectorAll(`.${formInput}`));
  const submitButton = formElement.querySelector(`.${formSubmit}`);
  toggleButtonState(inputList, submitButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, formInputInvalid, formErrorActive);
      toggleButtonState(inputList, submitButton, formSubmitDisabled);
    });
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