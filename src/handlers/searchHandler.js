import Handler from './Handler';
import NewsApi from '../api/NewsApi';
import { statuses, FALLBACK_IMAGE_URL } from '../utils/constants';

const newsApi = new NewsApi();
class SearchHandler extends Handler {
  constructor() {
    super();
    this._provider.setOnUpdate(() => this._save());
    this._keyword = '';
  }

  obtain() {
    if (!localStorage.getItem('foundArticles')) {
      return;
    }

    const { keyword, shown, ref } = localStorage.getItem('state')
      ? JSON.parse(localStorage.getItem('state'))
      : {};

    this._keyword = keyword || '';
    this._provider.reset(
      JSON.parse(localStorage.getItem('foundArticles')),
      shown,
      ref,
    );
  }

  _save() {
    localStorage.setItem('foundArticles', JSON.stringify(this._provider.all()));
    localStorage.setItem(
      'state',
      JSON.stringify({
        keyword: this._keyword,
        shown: this._provider.count(),
        ref: this._provider.ref(),
      }),
    );
  }

  search(keyword) {
    this._keyword = keyword;

    let res = statuses.OK;

    return newsApi
      .search(keyword)
      .then((data) => {
        if (!data.articles.length) {
          res = statuses.NOT_FOUND;
          this._keyword = '';
        }

        const cleanedData = data.articles.map(
          ({
            title,
            description,
            publishedAt,
            source: { name },
            urlToImage,
            url,
          }) => {
            return {
              keyword,
              title,
              text: description,
              date: publishedAt,
              source: name,
              image: urlToImage || FALLBACK_IMAGE_URL,
              link: url,
            };
          },
        );

        this._provider.reset(cleanedData);
        this._save();
        return res;
      })
      .catch(() => {
        this._provider.reset();
        return statuses.ERROR;
      });
  }

  handle(card) {
    const cards = this.data().map((c) => (c.link === card.link ? card : c));
    super.handle(cards);
  }

  keyword() {
    return this._keyword;
  }

  clear() {
    localStorage.clear();
  }
}

const searchHandler = new SearchHandler();

export default searchHandler;
