import Api from './Api';
import { LOCALE, API_KEY } from '../utils/constants';

const defaults = {
  from: '7d',
  to: 'current',
  language: LOCALE,
  pageSize: 100,
};

export default class NewsApi extends Api {
  constructor() {
    super({
      baseUrl: 'https://nomoreparties.co/news/v2/everything',
    });
    this._key = API_KEY;
  }

  search(
    keyword,
    {
      from = defaults.from,
      to = defaults.to,
      language = defaults.language,
      pageSize = defaults.pageSize,
    } = defaults,
  ) {
    to = to === 'current' ? new Date() : new Date(this.to);

    const delta = from.split('d');
    if (
      delta.length === 2 &&
      delta[1] === '' &&
      typeof Number(delta[0]) === 'number'
    ) {
      from = new Date(to);
      from.setDate(from.getDate() - Number(delta[0]));
      from = from.toISOString();
    }

    to = to.toISOString();
    return this._request(
      `?language=${language}&apiKey=${this._key}&q=${keyword}&pageSize=${pageSize}&from=${from}&to=${to}&sortBy=publishedAt`,
    );
  }
}
