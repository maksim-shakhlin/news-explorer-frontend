import { memo, useCallback, useEffect, useState, useContext } from 'react';
import Cards from '../Cards/Cards';
import savedHandler from '../../utils/savedHandler';
import { statuses } from '../../utils/constants';
import { fillTemplate } from '../../utils/utils';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { UI } from '../../configs/ru';

const SavedNews = memo(() => {
  const [status, setStatus] = useState(statuses.UNKNOWN);
  const [data, setData] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setStatus(statuses.LOADING);
    savedHandler.obtain().then((res) => {
      setStatus(res);
      setData(savedHandler.data());
    });
  }, []);

  const handleDelete = useCallback(() => {}, []);

  return (
    <>
      <section className="saved unit">
        <h1 className="saved__text saved__title">{UI.SAVED_NEWS}</h1>
        <p className="title">
          {fillTemplate(UI.YOU_HAVE_TEMPLATE, {
            name: currentUser.name,
            count: savedHandler.count(),
          })}
        </p>

        <p className="saved__text saved__info">
          {UI.ON_KEYWORDS}
          <span className="saved__keyword">Природа, Тайга</span>
          {UI.AND}
          <span className="saved__keyword">
            {fillTemplate(UI.KEYWORDS_REMAINDER_TEMPLATE, { remainder: 2 })}
          </span>
        </p>
      </section>
      <Cards
        dataset={data}
        onAction={handleDelete}
        provider={savedHandler.provider()}
        status={status}
        extraClass="saved__cards"
      />
    </>
  );
});

export default SavedNews;
