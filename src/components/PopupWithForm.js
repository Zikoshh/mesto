import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');

    this._inputValues = {};

    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  close() {
    super.close()
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();

      this._callback(this._getInputValues());
    })
  }
}