import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(config) {
        super(config);
        this._image = this._popup.querySelector(config.imageSelector);
        this._title = this._popup.querySelector(config.titleSelector);

    }

    open(name, link) {
        this._image.src = link;
        this._image.alt = 'Картинка увеличенная ' + name;
        this._title.textContent = name;
        super.open();
    }
}
