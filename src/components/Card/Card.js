import { useRef, memo, useEffect, useCallback, useContext } from 'react';

import { getDateString, fitTextContent, isOverflown } from '../../utils/utils';
import { statuses } from '../../utils/constants';

import BookmarkIcon from '../icons/BookmarkIcon';
import TrashCanIcon from '../icons/TrashCanIcon';
import classNames from 'classnames';

import { UI } from '../../configs/ru';

import CurrentUserContext from '../../contexts/CurrentUserContext';

const Card = memo(({ card, onAction, isFound = false }) => {
  card.saved = card.saved !== undefined ? card.saved : !!card._id;

  const currentUser = useContext(CurrentUserContext);

  function handleAction() {
    buttonRef.current.blur();
    onAction(card);
  }

  const textBlockRef = useRef(null);
  const buttonRef = useRef(null);
  const keywordRef = useRef(null);
  const tooltipRef = useRef(null);

  const MIN_BETWEEN = 5;

  const fitText = useCallback(() => {
    fitTextContent(textBlockRef.current);
    if (keywordRef.current && tooltipRef.current) {
      if (
        tooltipRef.current.getBoundingClientRect().left -
          keywordRef.current.getBoundingClientRect().right <
        MIN_BETWEEN
      ) {
        keywordRef.current.classList.add('card__top-item_type_overlapped');
      } else {
        keywordRef.current.classList.remove('card__top-item_type_overlapped');
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', fitText);
    return () => window.removeEventListener('resize', fitText);
  }, [fitText]);

  useEffect(() => {
    fitText();
  }, [fitText]);

  useEffect(() => {
    if (keywordRef.current && isOverflown(keywordRef.current)) {
      keywordRef.current.title = card.keyword;
    }
  }, [card.keyword]);

  return (
    <article className="card">
      <a
        href={card.link}
        className="card__link"
        rel="noreferrer"
        target="_blank"
      >
        <img alt={UI.IMG_ALT} src={card.image} className="card__pic" />
        <p className="card__date card__item">{getDateString(card.date)}</p>
        <div className="card__text-block" ref={textBlockRef}>
          <h3 className="card__title card__item">{card.title}</h3>
          <p className="card__text card__item">{card.text}</p>
        </div>
        <p className="card__source card__item">{card.source}</p>
      </a>
      <div className="card__top-block">
        <button
          className="card__top-item card__top-item_type_button"
          onClick={handleAction}
          ref={buttonRef}
        >
          {isFound ? (
            <BookmarkIcon
              className={classNames('card__button-icon', {
                'card__button-icon_saved': card.saved,
              })}
              checked={card.saved}
            />
          ) : (
            <TrashCanIcon className="card__button-icon" />
          )}
        </button>
        {!isFound && (
          <p
            className="card__top-item card__top-item_type_keyword"
            ref={keywordRef}
          >
            {card.keyword}
          </p>
        )}
        {(isFound && currentUser.status !== statuses.user.AUTHORIZED) ||
        !isFound ? (
          <p
            className={classNames(
              'card__top-item card__top-item_type_tooltip',
              {
                'card__top-item_type_delete-tooltip': !isFound,
                'card__top-item_type_bookmark-tooltip': isFound,
              },
            )}
            ref={tooltipRef}
          >
            {isFound ? UI.AUTH_TOOLTIP : UI.DEL_TOOLTIP}
          </p>
        ) : (
          ''
        )}
      </div>
    </article>
  );
});

export default Card;
