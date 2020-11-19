import { memo, useCallback, useState, useRef } from 'react';
import About from '../About/About';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';

import searchHandler from '../../utils/searchHandler';
import { statuses } from '../../utils/constants';
import { setFocus } from '../../utils/utils';

import { UI } from '../../configs/ru';

const Main = memo(({ onSave, ...headerHandlers }) => {
  const [searchStatus, setSearchStatus] = useState(statuses.UNKNOWN);
  const [data, setData] = useState([]);

  const titleRef = useRef();

  const handleSearch = useCallback(({ keyword }) => {
    setSearchStatus(statuses.SEARCHING);
    searchHandler
      .search(keyword) // possible errors handled in searchHandler
      .then((res) => {
        setData(searchHandler.data());
        setSearchStatus(res);
        setFocus(titleRef);
      });
  }, []);

  const handleSave = useCallback(
    (card) => {
      onSave(card).then((savedCard) => {
        if (!savedCard) {
          return;
        }
        searchHandler.handle(savedCard);
        setData(searchHandler.data());
      });
    },
    [onSave],
  );

  return (
    <>
      <Search onSearch={handleSearch} {...headerHandlers} />
      <main className="app__unit">
        <Cards
          isSearch={true}
          onAction={handleSave}
          status={searchStatus}
          provider={searchHandler.provider()}
          dataset={data}
        >
          <h2 className="title cards__main-title" ref={titleRef}>
            {UI.SEARCH_RESULTS}
          </h2>
        </Cards>
        <About />
      </main>
    </>
  );
});

export default Main;
