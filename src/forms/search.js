import { UI } from '../locales/ru';

const search = {
  name: 'search',
  validate: false,
  classes: {
    form: 'search__form',
    input: 'search__input',
    submit: 'search__button',
  },

  content: [
    {
      kind: 'input',
      name: 'keyword',
      type: 'text',
      required: true,
      placeholder: UI.SEARCH_PLACEHOLDER,
      autoComplete: 'off',
      ref: true,
    },
    {
      kind: 'submit',
      text: UI.SEARCH_SUBMIT,
      tabIndex: -1,
    },
  ],
};

export default search;
