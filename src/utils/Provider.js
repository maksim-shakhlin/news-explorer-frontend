export default class Provider {
  constructor(increment = 10, onUpdate = () => {}) {
    this._data = [];
    this.increment = increment;
    this._give = 0;
    this._ref = 0;
    this._onUpdate = onUpdate;
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
    this._onUpdate();
  }

  get() {
    return this._data.slice(0, this._give);
  }

  add(data = []) {
    this._data.push(...data);
    this._onUpdate();
  }

  reset(data = [], give, ref, increment = this.increment) {
    this._data = data;
    this.increment = increment;
    if (!(give && ref)) {
      this._give = 0;
      this._ref = 0;
      this.more();
    } else {
      this.setState(give, ref);
    }
  }

  set(data = [], increment = this.increment) {
    this._data = data;
    this.increment = increment;
    this._onUpdate();
  }

  ref() {
    return this._ref;
  }

  all() {
    return this._data;
  }

  decrement() {
    this._give = Math.max(0, this._give - 1);
    if (!this._give) {
      this.more();
    } else {
      this._onUpdate();
    }
  }

  restart() {
    this._give = 0;
    this.more();
  }

  setState(give, ref) {
    this._give = Math.min(give, this._data.length);
    this._ref = Math.min(ref, this._give);
    this._onUpdate();
  }

  setOnUpdate(onUpdate = () => {}) {
    this._onUpdate = onUpdate;
  }
}
