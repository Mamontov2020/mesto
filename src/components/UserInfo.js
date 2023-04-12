export class UserInfo {
    constructor({nameSelector, professionSelector, avatarSelector, avatarButtonSelector}, onClickAvatar) {
        this._name = document.querySelector(nameSelector);
        this._profession = document.querySelector(professionSelector);
        this._avatar = document.querySelector(avatarSelector);
        this._avatarButton = document.querySelector(avatarButtonSelector);
        this._onClickAvatar = onClickAvatar;
    }

    getId() {
        return this._id;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            profession: this._profession.textContent,
            avatar: this._avatar.src,
        }
    }

    setUserInfo({id, name, profession, avatar}) {
        if (id) {
            this._id = id;
        }
        this._name.textContent = name;
        this._profession.textContent = profession;
        this._avatar.src = avatar;
    }

    setEventListeners() {
        this._avatarButton.addEventListener('click', () => {
            this._onClickAvatar();
        });
    }
}
