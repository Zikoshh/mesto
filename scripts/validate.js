const classNames = {
  form: 'popup__form',
  formInput: 'popup__input',
  formInputInvalid: 'popup__input_invalid',
  formSubmit: 'popup__submit',
  formSubmitDisabled: 'popup__submit_disabled',
  formErrorActive: 'popup__error_active'
};



const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(`.${classNames.form}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', e => {
      e.preventDefault();
    });

    setEventListeners(formElement);
  });
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${classNames.formInputInvalid}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${classNames.formErrorActive}`);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${classNames.formInputInvalid}`);
  errorElement.classList.remove(`${classNames.formErrorActive}`);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, submitButton) => {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(`${classNames.formSubmitDisabled}`);
  } else {
    submitButton.classList.remove(`${classNames.formSubmitDisabled}`);
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
  const inputList = Array.from(formElement.querySelectorAll(`.${classNames.formInput}`));
  const submitButton = formElement.querySelector(`.${classNames.formSubmit}`);
  toggleButtonState(inputList, submitButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });
};



enableValidation();