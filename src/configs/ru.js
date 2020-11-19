// Patterns

export const NAME_PATTERN = '[A-Za-zА-Яа-яЁё\\s\\-]{1,}';
export const KEYWORD_PATTERN = 'not implemented';

// Dictionaries

export const ERRORS_DICT = {
  password: {
    patternMismatch: 'Можно латинские буквы, цифры и спецсимволы',
    tooShort: 'Минимум 8 символов',
  },
  name: {
    tooShort: 'От 2 до 30 значащих символов',
    patternMismatch: 'Можно только буквы, пробелы и дефисы',
  },
  default: {
    valueMissing: 'Это обязательное поле',
  },
};

// Errors

export const ERRORS = {
  MIN_LENGTH_TEMPLATE: 'Минимальное число значащих символов — %min%',
  INVALID_EMAIL: 'Невалидный email',
};

// Interface texts

export const UI = {
  SIGNUP: 'Зарегистрироваться',
  LOGIN: 'Войти',
  LOGOUT: 'Выйти',
  AUTHORIZE: 'Авторизоваться',
  SIGNUP_SUCCESS: 'Пользователь успешно зарегистрирован!',
  OR: 'или',
  IMG_ALT: 'Обложка новости',
  AUTH_TOOLTIP: 'Войдите, чтобы сохранять статьи',
  DEL_TOOLTIP: 'Убрать из сохранённых',
  SHOW_MORE: 'Показать ещё',
  NOT_FOUND_TITLE: 'Ничего не найдено',
  NOT_FOUND_SUBTITLE: 'К сожалению, по вашему запросу ничего не найдено.',
  ERROR_TITLE: 'Во время запроса произошла ошибка',
  ERROR_SUBTITLE:
    'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
  SEARCHING_SUBTITLE: 'Идет поиск новостей...',
  LOADING_SUBTITLE: 'Загружаем...',
  MAIN: 'Главная',
  PRAKTIKUM: 'Яндекс.Практикум',
  SAVED_NEWS: 'Сохранённые статьи',
  SEARCH_RESULTS: 'Результаты поиска',
  YOU_HAVE_TEMPLATE: '%name%, у вас %count% сохраненных статей',
  ON_KEYWORDS: 'По ключевым словам: ',
  KEYWORDS_REMAINDER_TEMPLATE: '%remainder%-м другим',
  SEARCH_PLACEHOLDER: 'Введите тему новости',
  SEARCH_SUBMIT: 'Искать',
  SEARCH_TITLE: 'Что творится в\xa0мире?',
  SEARCH_SUBTITLE:
    'Находите самые свежие статьи на\xa0любую тему и\xa0сохраняйте в\xa0своём личном\xa0кабинете.',
  LOGIN_TITLE: 'Вход',
  EMAIL_PLACEHOLDER: 'Введите почту',
  PASSWORD_PLACEHOLDER: 'Введите пароль',
  EMAIL_LABEL: 'Email',
  PASSWORD_LABEL: 'Пароль',
  SIGNUP_TITLE: 'Регистрация',
  NAME_PLACEHOLDER: 'Введите своё имя',
  NAME_LABEL: 'Имя',
  TODAY: 'сегодня',
  YESTERDAY: 'вчера',
  DAY_BEFORE_YESTERDAY: 'позавчера',
  UNDEFINED: 'неизвестно',
  AND: ' и ',
};
