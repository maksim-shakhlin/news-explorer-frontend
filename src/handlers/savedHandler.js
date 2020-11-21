import Handler from './Handler';
import { statuses, MAX_KEYWORDS_SHOWN } from '../utils/constants';
import { omit, capitalize } from '../utils/utils';
import api from '../api/mainApi';

class SavedHandler extends Handler {
  constructor() {
    super();
    this._keywords = [];
  }

  obtain() {
    return api.getArticles().then((data) => {
      data.reverse();
      this._update(data);
      return data.length ? statuses.OK : statuses.NO_DATA;
    });
  }

  _countKeywords() {
    const counts = this.data().reduce((dict, item) => {
      dict[item.keyword] ? dict[item.keyword]++ : (dict[item.keyword] = 1);
      return dict;
    }, {});

    this._keywords = Object.keys(counts);
    this._keywords.sort((a, b) => {
      return counts[b] - counts[a];
    });
  }

  _update(data) {
    if (data) {
      this._provider.reset(data);
    }
    this._countKeywords();
  }

  delete(data) {
    return api.deleteArticle(data._id).then(() => {
      this._provider.set(this.data().filter((item) => item._id !== data._id));
      this._update();
      this._provider.decrement();
      return omit(data, ['_id']);
    });
  }

  count() {
    return this._provider.has();
  }

  _keywordsToShow(max) {
    return !max || this._keywords.length === max
      ? this._keywords.length
      : Math.min(max - 1, this._keywords.length);
  }

  getKeywords(max = MAX_KEYWORDS_SHOWN) {
    const end = this._keywordsToShow(max);
    return this._keywords
      .slice(0, end)
      .map((word) => capitalize(word))
      .join(', ');
  }

  getKeywordsRemainder(max = MAX_KEYWORDS_SHOWN) {
    const end = this._keywordsToShow(max);
    return this._keywords.length - end;
  }
}

const savedHandler = new SavedHandler();

export default savedHandler;
