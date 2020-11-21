import Err from '../utils/Err';

export default class Api {
  constructor({ baseUrl = 'http://localhost:3000', ...options }) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  _request(tag, method = 'GET', body) {
    const options = {
      ...this._options,
      method: method,
    };
    if (body) {
      Object.assign(options, { body: JSON.stringify(body) });
    }
    return fetch(this._baseUrl + tag, options).then((response) => {
      if (response.ok) {
        if (response.status !== 204) {
          return response.json();
        }
      } else {
        return response.json().then((data) => {
          return Promise.reject(new Err(response.status, data.message));
        });
      }
    });
  }
}
