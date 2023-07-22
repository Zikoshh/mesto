export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderedItems = items;
    this._renderer = renderer;
  }

  addItem(card) {
    this._container.prepend(card);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}