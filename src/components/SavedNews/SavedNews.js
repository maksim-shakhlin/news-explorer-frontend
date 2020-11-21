import { memo, useEffect, useState, useContext, useCallback } from 'react';
import Cards from '../Cards/Cards';
import Prompt from '../Prompt/Prompt';
import savedHandler from '../../handlers/savedHandler';
import { statuses } from '../../utils/constants';
import { fillTemplate } from '../../utils/utils';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { UI } from '../../locales/ru';
import usePrompt from '../../hooks/usePrompt';

const SavedNews = memo(({ onDelete }) => {
  const [status, setStatus] = useState(statuses.UNKNOWN);
  const [data, setData] = useState();
  const currentUser = useContext(CurrentUserContext);
  const {
    promptText,
    isPromptOpen,
    promptItems,
    openPrompt,
    closePrompt,
  } = usePrompt();

  useEffect(() => {
    setStatus(statuses.LOADING);
    savedHandler.obtain().then((res) => {
      setStatus(res);
      setData(savedHandler.data());
    });
  }, []);

  const handlePromptClose = useCallback(
    (value) => {
      closePrompt();
      if (value && value.action === 'delete') {
        onDelete(value.data).then((data) => {
          if (data) {
            setData(savedHandler.data());
          }
        });
      }
    },
    [closePrompt, onDelete],
  );

  const handleDeleteClick = useCallback(
    (data) => {
      openPrompt(UI.DELETE_TITLE, [
        { text: UI.LEAVE },
        { text: UI.DELETE, value: { action: 'delete', data }, default: true },
      ]);
    },
    [openPrompt],
  );

  const count = savedHandler.count();

  useEffect(() => {
    setData(savedHandler.data());
    savedHandler.provider().restart();
  }, []);

  return (
    <>
      <section className="saved unit">
        <h1 className="saved__text saved__title">{UI.SAVED_NEWS}</h1>
        <p className="title">
          {fillTemplate(UI.YOU_HAVE_TEMPLATE, {
            name: currentUser.name,
            count,
          })}
        </p>
        {count ? (
          <p className="saved__text saved__info">
            {UI.ON_KEYWORDS}
            <span className="saved__keyword">{savedHandler.getKeywords()}</span>
            {savedHandler.getKeywordsRemainder() ? UI.AND : ''}
            {savedHandler.getKeywordsRemainder() ? (
              <span className="saved__keyword">
                {fillTemplate(UI.KEYWORDS_REMAINDER_TEMPLATE, {
                  remainder: savedHandler.getKeywordsRemainder(),
                })}
              </span>
            ) : (
              ''
            )}
          </p>
        ) : (
          ''
        )}
      </section>
      {count ? (
        <Cards
          dataset={data}
          onAction={handleDeleteClick}
          provider={savedHandler.provider()}
          status={status}
          extraClass="saved__cards"
        />
      ) : (
        ''
      )}
      <Prompt
        text={promptText}
        isOpen={isPromptOpen}
        items={promptItems}
        onClose={handlePromptClose}
      />
    </>
  );
});

export default SavedNews;
