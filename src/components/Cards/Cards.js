import { memo, useRef, useCallback } from 'react';
import Card from '../Card/Card';
import Preloader from '../Preloader/Preloader';
import NotFoundIcon from '../icons/NotFoundIcon';
import { statuses } from '../../utils/constants';
import { setFocus } from '../../utils/utils';
import useProvider from '../../hooks/useProvider';
import classNames from 'classnames';

import { UI } from '../../configs/ru';

const Cards = memo(
  ({
    status,
    children,
    isSearch = false,
    onAction,
    provider,
    dataset,
    extraClass = '',
  }) => {
    const button = useRef(null);
    const firstNewCardRef = useRef(null);
    const { data, more, ref, remained } = useProvider(dataset, provider);

    const handleShowMore = useCallback(() => {
      button.current.blur();
      more();
      setTimeout(() => setFocus(firstNewCardRef), 0);
    }, [more]);

    if (status === statuses.OK) {
      return (
        <section className={classNames('cards unit', extraClass)}>
          {children}
          <ul className="cards__list">
            {data.map((card, i) => {
              return (
                <li
                  key={card._id || card.link}
                  ref={i === ref() ? firstNewCardRef : null}
                >
                  <Card
                    card={card}
                    saved={card.saved} /* to force memo rerender */
                    isFound={isSearch}
                    onAction={onAction}
                  />
                </li>
              );
            })}
          </ul>
          {remained() ? (
            <button
              className="cards__button"
              onClick={handleShowMore}
              ref={button}
            >
              {UI.SHOW_MORE}
            </button>
          ) : (
            ''
          )}
        </section>
      );
    }

    let icon = <NotFoundIcon className="cards__icon" />;
    const preloader = <Preloader extraClass="cards__preloader" />;
    let title = '';
    let subtitle = '';

    switch (status) {
      case statuses.NOT_FOUND:
        title = UI.NOT_FOUND_TITLE;
        subtitle = UI.NOT_FOUND_SUBTITLE;
        break;

      case statuses.ERROR:
        title = UI.ERROR_TITLE;
        subtitle = UI.ERROR_SUBTITLE;
        break;

      case statuses.SEARCHING:
        icon = preloader;
        subtitle = UI.SEARCHING_SUBTITLE;
        break;

      case statuses.LOADING:
        icon = preloader;
        subtitle = UI.LOADING_SUBTITLE;
        break;
      case statuses.UPDATING:
        icon = preloader;
        break;

      default:
        return <></>;
    }

    return (
      <section className="cards cards_type_cap unit app__unit">
        {icon}
        {title && <h2 className="cards__title">{title}</h2>}
        {subtitle && <p className="cards__subtitle">{subtitle}</p>}
      </section>
    );
  },
);

export default Cards;
