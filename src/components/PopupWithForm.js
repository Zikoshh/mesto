import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, createNewCard) {
    super(popupSelector);
    this._createNewCard = createNewCard;
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

      this._createNewCard(this._getInputValues());
    })
  }
}