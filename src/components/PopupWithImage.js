import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popup.querySelector('.popup__title');
    this._image = this._popup.querySelector('.popup__image');
  }

  open(name, link) {
    this._title.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    this._popup.classList.add('popup_opened_image');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened_image');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}