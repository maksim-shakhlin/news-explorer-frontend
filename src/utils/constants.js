export const statuses = Object.freeze({
  SEARCHING: 0,
  ERROR: 1,
  UNKNOWN: 2,
  OK: 3,
  NOT_FOUND: 4,
  LOADING: 5,
  NO_DATA: 6,
  user: Object.freeze({
    UNAUTHORIZED: 0,
    UNKNOWN: 1,
    AUTHORIZED: 2,
    LOGGEDOUT: 3,
  }),
});

export const modes = Object.freeze({
  REGISTERED: 0,
  LOGIN: 1,
  SIGNUP: 2,
});

export const NAVBAR_COLLAPSE_BREAKPOINT = 680;
export const MOBILE_HEADER_HEIGHT = 30;
export const MIN_BETWEEN = 5;
export const HEADER_ON_MAIN_BAKCGROUND_COLOR = '26, 27, 34';
export const MAX_NAME_CHARS_SHOWN = 15;
export const FALLBACK_IMAGE_URL = 'example.com/';
export const SHOW_INCREMENT = 3;
export const LOCALE = 'ru';
export const MAX_KEYWORDS_SHOWN = 3;
export const PASSWORD_PATTERN =
  '[0-9a-zA-Z!@#$%^&*()-_+=;:,./?\\|`~[\\]{}<>"\']+';

export const API_KEY = 'f737c9f5b5b7402b99df6310f9bab712';
