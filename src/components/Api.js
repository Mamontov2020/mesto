const CARDS = 'cards';
const USERS = 'users';
const LIKES = 'likes';
const AVATAR = 'avatar';

export class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _composePath(path) {
        return `${this._baseUrl}/${path}`;
    }

    _request(method, path, body) {
        return fetch(path, {
            method,
            headers: this._headers,
            body: body ? JSON.stringify(body): undefined
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    getUserInfo() {
        return this._request('GET', this._composePath(`${USERS}/me`));
    }

    updateUserInfo({name, about}) {
        return this._request(
            'PATCH',
            this._composePath(`${USERS}/me`),
            {
                name,
                about
            }
        );
    }

    getInitialCards() {
        return this._request('GET', this._composePath(CARDS));
    }

    createCard({name, link}) {
        return this._request(
            'POST',
            this._composePath(CARDS),
            {
                name,
                link
            });
    }

    deleteCard(cardId) {
        return this._request('DELETE', this._composePath(`${CARDS}/${cardId}`));
    }

    setLike(cardId) {
        return this._request('PUT', this._composePath(`${CARDS}/${LIKES}/${cardId}`));
    }

    deleteLike(cardId) {
        return this._request('DELETE', this._composePath(`${CARDS}/${LIKES}/${cardId}`));
    }

    updateAvatar(avatar) {
        return this._request('PATCH', this._composePath(`${USERS}/me/${AVATAR}`), {
            avatar,
        });
    }
}

