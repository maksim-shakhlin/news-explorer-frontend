export const statuses = Object.freeze({
  SEARCHING: 0,
  ERROR: 1,
  UNKNOWN: 2,
  OK: 3,
  NOT_FOUND: 4,
  LOADING: 5,
  NO_DATA: 6,
  UPDATING: 7,
  user: Object.freeze({
    UNAUTHORIZED: 0,
    UNKNOWN: 1,
    AUTHORIZED: 2,
  }),
});

export const modes = Object.freeze({
  REGISTERED: 0,
  LOGIN: 1,
  SIGNUP: 2,
});
