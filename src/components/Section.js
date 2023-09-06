export default class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addCard(card) {
    this._container.append(card);
  }

  addNewCard(card) {
    this._container.prepend(card);
  }

  renderItems(cards) {
    cards.forEach(item => {
      this._renderer(item);
    });
  }
}
