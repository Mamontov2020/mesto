export class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach(item => {
            const element = this._renderer(item);
            this.addItem(element);
        })
    }

    addItem(item) {
        this._container.prepend(item);
    }
}
