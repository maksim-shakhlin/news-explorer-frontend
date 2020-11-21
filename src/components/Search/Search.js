import { memo, useCallback, useEffect } from 'react';
import Form from '../Form/Form';

import { useForm } from '../../hooks/useForm';
import { CONTENT } from '../../locales/ru';
import search from './../../forms/search';

const Search = memo(({ onSearch, keyword }) => {
  const stopFocus = useCallback((e) => {
    e.preventDefault();
  }, []);

  const { values, handleChange, resetForm } = useForm();

  search.content[1].onMouseDown = stopFocus;

  useEffect(() => {
    resetForm({ keyword });
  }, [keyword, resetForm]);

  return (
    <section className="search unit unit_flat unit_full app__unit">
      <div className="search__main unit">
        <h1 className="search__title">{CONTENT.SEARCH_TITLE}</h1>
        <p className="search__subtitle">{CONTENT.SEARCH_SUBTITLE}</p>
        <Form
          onSubmit={onSearch}
          {...search}
          onChange={handleChange}
          values={values}
        />
      </div>
    </section>
  );
});

export default Search;
