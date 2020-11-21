export default class Err extends Error {
  constructor(code = 500, message = '', ...args) {
    super(message, ...args);
    this.code = code;
  }
}
