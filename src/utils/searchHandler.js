import foundArticles from './foundArticles';
import { statuses } from './constants';
import Handler from './Handler';

class SearchHandler extends Handler {
  constructor() {
    super();
    this._keyword = '';
  }

  search(keyword = '', refresh = true) {
    // DEMO implementation
    if (keyword === this._keyword && !refresh) {
      return;
    }

    const res =
      keyword === undefined
        ? statuses.ERROR
        : keyword === 'демо'
        ? statuses.OK
        : statuses.NOT_FOUND;

    if (keyword === 'демо') {
      this._provider.reset(foundArticles);
    } else {
      this._provider.reset();
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  }

  handle(card) {
    const cards = this.data().map((c) => (c.link === card.link ? card : c));
    super.handle(cards);
  }
}

const searchHandler = new SearchHandler();

export default searchHandler;
