export default class Provider {
  constructor(increment = 10) {
    this._data = [];
    this.increment = increment;
    this._give = 0;
    this._ref = 0;
  }

  remained() {
    return this._data.length - this._give;
  }

  has() {
    return this._data.length;
  }

  count() {
    return this._give;
  }

  more(increment = this.increment) {
    const remained = this.remained();
    if (!remained) {
      return;
    }

    this._ref = this._give;
    this._give += Math.min(remained, increment);
  }

  get() {
    return this._data.slice(0, this._give);
  }

  add(data = []) {
    this._data.push(...data);
  }

  reset(data = [], increment = this.increment) {
    this._data = data;
    this.increment = increment;
    this._give = 0;
    this._ref = 0;
    this.more();
  }

  set(data = [], increment = this.increment) {
    this._data = data;
    this.increment = increment;
  }

  ref() {
    return this._ref;
  }

  all() {
    return this._data;
  }
}
