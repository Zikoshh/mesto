import Popup from "./Popup.js";

export default class PopupWithDeleteCard extends Popup {
  constructor(popupSelector, deleteCard) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._deleteCard = deleteCard;
  }

  sendCardAndId(cardId, card) {
    this._cardId = cardId;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();

      this._deleteCard(this._cardId);
    })
  }

  deleteElCard() {
    this._card.remove();
    this._card = null;
  }
}