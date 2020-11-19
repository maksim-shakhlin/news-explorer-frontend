import { isEmpty } from './utils';
import savedArticles from './savedArticles';
import { statuses } from './constants';
import Handler from './Handler';
import { MAX_KEYWORDS_SHOWN } from '../configs/config';

class SavedHandler extends Handler {
  constructor(defaultFilterKey = 'keyword') {
    super();
    this._data = [];
    this._filters = {};
    this.defaultFilterKey = defaultFilterKey;
    this._keywords = [];
  }

  obtain() {
    // DEMO implementation
    if (this._data.length) {
      return Promise.resolve(statuses.OK);
    }

    this._provider.reset(savedArticles);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(statuses.OK);
      }, 1000);
    });
  }

  _meets(value) {
    for (const key in this._filters) {
      if (!Array.of(this._filters[key]).includes(value[key])) {
        return false;
      }
    }
    return true;
  }

  _countKeywords() {
    const counts = this._data.reduce((dict, item) => {
      dict[item.keyword] ? dict[item.keyword]++ : (dict[item.keyword] = 1);
      return dict;
    }, {});

    this._keywords = Object.keys(counts);
    this._keywords.sort((a, b) => {
      return counts[a] - counts[b];
    });
  }

  _filter() {
    if (isEmpty(this._filters)) {
      this.resetFilters();
      return;
    }
    this._provider.reset(this._data.filter(this._meets));
  }

  set(data = []) {
    this._data = data;
    this._filter();
    this._countKeywords();
  }

  setFilters(filters) {
    if (Array.isArray(filters) || typeof filters !== 'object') {
      this._filters = { [this.defaultFilterKey]: filters };
    } else {
      this._filters = filters;
    }
    this._filter();
  }

  resetFilters() {
    this._filters = {};
    this._provider.reset(this._data);
  }

  count() {
    return this.data().length;
  }

  getKeywords(all = false) {
    if (all || this._keywords.length === MAX_KEYWORDS_SHOWN) {
      return this._keywords;
    }
    return [
      this._keywords.slice(0, MAX_KEYWORDS_SHOWN - 1),
      this._keywords.length - MAX_KEYWORDS_SHOWN + 1,
    ];
  }
}

const savedHandler = new SavedHandler();

export default savedHandler;
