export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.addEventListener('mousedown', this._handleOverlayClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydowm', this._handleEscClose.bind(this));
    this._popup.removeEventListener('mousedown', this._handleOverlayClose.bind(this));
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    };

  }

  _handleOverlayClose(event) {
    if (event.target === this._popup) {
      this.close()
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
  }
}


