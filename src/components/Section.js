export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this.renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element, meth) {
        this._container[meth](element);
    }

    rendererItems() {
        this._items.forEach((item) => {
            this.renderer(item)
          })
    }
}