import Provider from '../utils/Provider';
import { SHOW_INCREMENT } from '../utils/constants';

export default class Handler {
  constructor(increment = SHOW_INCREMENT) {
    this._provider = new Provider(increment);
  }

  data() {
    return this._provider.all();
  }

  provider() {
    return this._provider;
  }

  handle(data) {
    this._provider.set(data);
  }
}
