import { memo, useCallback, useRef, useEffect } from 'react';
import About from '../About/About';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';

import searchHandler from '../../handlers/searchHandler';
import { setFocus } from '../../utils/utils';

import { UI } from '../../locales/ru';

const Main = memo(({ onAction, onSearch, data, status, keyword, clear }) => {
  const titleRef = useRef();

  const handleSearch = useCallback(
    ({ keyword }) => {
      onSearch(keyword).then((res) => {
        if (res) setFocus(titleRef);
      });
    },
    [onSearch],
  );

  useEffect(() => {
    return () => clear();
  }, [clear]);

  return (
    <>
      <Search onSearch={handleSearch} keyword={keyword} />
      <Cards
        isSearch={true}
        onAction={onAction}
        status={status}
        provider={searchHandler.provider()}
        dataset={data}
      >
        <h2 className="title cards__main-title" ref={titleRef}>
          {UI.SEARCH_RESULTS}
        </h2>
      </Cards>
      <About />
    </>
  );
});

export default Main;
