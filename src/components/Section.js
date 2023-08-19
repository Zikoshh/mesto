export default class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(card) {
    this._container.prepend(card);
  }

  renderItems(cards) {
    cards.forEach(item => {
      this._renderer(item);
    });
  }
}
