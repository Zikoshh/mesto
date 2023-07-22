export class FormValidator {
  constructor(dataSelectors, form) {
    this._formEl = form;
    /* Sel = Selector */
    this._inputSel = dataSelectors.formInput;   
    this._inputInvalidSel = dataSelectors.formInputInvalid;
    this._submitSel = dataSelectors.formSubmit;
    this._submitDisabledSel = dataSelectors.formSubmitDisabled;
    this._errorActiveSel = dataSelectors.formErrorActive;
  }

  enableValidation() {
    this._inputList = Array.from(this._formEl.querySelectorAll(`.${this._inputSel}`));
    this._submitButton = this._formEl.querySelector(`.${this._submitSel}`);

    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      this._inputElement = inputElement;
      this._inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    };
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    };
  }

  _showInputError(inputElement) {
    const errorElement = this._formEl.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${this._inputInvalidSel}`);
    errorElement.classList.add(`${this._errorActiveSel}`);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formEl.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${this._inputInvalidSel}`);
    errorElement.classList.remove(`${this._errorActiveSel}`);
    errorElement.textContent = '';
  }

  disableSubmitButton() {
    this._submitButton.classList.add(`${this._submitDisabledSel}`);
    this._submitButton.setAttribute('disabled', 'disabled');
  }

  enableSubmitButton() {
    this._submitButton.classList.remove(`${this._submitDisabledSel}`);
    this._submitButton.removeAttribute('disabled', 'disabled');
  }
}