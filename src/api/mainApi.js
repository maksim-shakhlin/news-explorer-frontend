import Api from './Api';

class MainApi extends Api {
  constructor(baseUrl = 'https://api.news.deque.ru') {
    super({
      baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    });
  }

  signup(data) {
    return this._request('/signup', 'POST', data);
  }

  signin(data) {
    return this._request('/signin', 'POST', data);
  }

  logout() {
    return this._request('/logout', 'POST');
  }

  me() {
    return this._request('/users/me');
  }

  saveArticle(data) {
    return this._request('/articles', 'POST', data);
  }

  deleteArticle(id) {
    return this._request(`/articles/${id}`, 'DELETE');
  }

  getArticles() {
    return this._request('/articles');
  }
}

const mainApi = new MainApi(/* 'http://localhost:3000' */);

export default mainApi;
