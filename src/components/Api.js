export default class Api {
    constructor(options) {
      this._baseURL = options.baseUrl;
      this._headers = options.headers;
    }
  
    getInitialCards() {
      return fetch(`${this._baseURL}/cards`, {
        headers: this._headers
      }).then(this._getResponse)
    }

    getUserInfo() {
      return fetch(`${this._baseURL}/users/me`, {
        headers: this._headers
      }).then(this._getResponse)
    }

    setUser(name, job) {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: job
              })
        }).then(this._getResponse)
    }

    addCard(name, link) {
        return fetch(`${this._baseURL}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
              })
        }).then(this._getResponse)
    }

    deleteCard(cardId) {
      return fetch(`${this._baseURL}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
    }).then(this._getResponse)
    }

    likeCardAdd(cardId) {
      return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      }).then(this._getResponse)
    }

    likeCardDel(cardId) {
      return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      }).then(this._getResponse)
    }

    avatarChange(link) {
      return fetch(`${this._baseURL}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            avatar: link
          })
    }).then(this._getResponse)
    } 
  
    _getResponse(result) {
        if (result.ok) {
            return result.json()
        }
        return Promise.reject(`Ошибка: ${result.status}`)
    }
  }