import { memo, useCallback } from 'react';
import Form from '../Form/Form';

import { UI, CONTENT } from '../../configs/ru';

const classes = {
  form: 'search__form',
  input: 'search__input',
  submit: 'search__button',
};

const content = [
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
];

const Search = memo(({ onSearch, ...headerHandlers }) => {
  const stopFocus = useCallback((e) => {
    e.preventDefault();
  }, []);

  content[1].onMouseDown = stopFocus;

  return (
    <section className="search unit unit_flat unit_full app__unit">
      <div className="search__main unit">
        <h1 className="search__title">{CONTENT.SEARCH_TITLE}</h1>
        <p className="search__subtitle">{CONTENT.SEARCH_SUBTITLE}</p>
        <Form
          onSubmit={onSearch}
          classes={classes}
          content={content}
          name="search"
          // DEMO
          state={{ keyword: 'демо' }}
        />
      </div>
    </section>
  );
});

export default Search;
