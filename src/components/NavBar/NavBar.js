import { memo, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '../icons/LogoutIcon';

import classNames from 'classnames';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import { statuses } from '../../utils/constants';
import { UI } from '../../configs/ru';

const NavBar = memo(
  ({ items, isMain, extraClass = '', onClick, isMobile = false }) => {
    const currentUser = useContext(CurrentUserContext);

    return (
      <nav
        className={classNames(
          'navbar',
          extraClass,
          {
            'navbar_mobile unit': isMobile,
          },
          {
            navbar_place_main: isMain,
          },
        )}
      >
        <ul
          className={classNames('navbar__list', {
            navbar__list_mobile: isMobile,
          })}
        >
          {items.map((item) => (
            <li className="navbar__list-item" key={item.to}>
              <NavLink
                className={classNames(
                  'navbar__item navbar__link',
                  {
                    navbar__link_place_main: isMain,
                  },
                  { navbar__link_mobile: isMobile },
                )}
                activeClassName="navbar__link_active"
                exact
                to={item.to}
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          className={classNames(
            'navbar__item navbar__button',
            {
              navbar__button_place_main: isMain,
            },
            {
              navbar__button_mobile: isMobile,
            },
            {
              navbar__button_type_logout:
                currentUser.status === statuses.user.AUTHORIZED,
            },
          )}
          onClick={onClick}
        >
          {currentUser.status === statuses.user.AUTHORIZED
            ? currentUser.name || UI.LOGOUT
            : UI.AUTHORIZE}

          {currentUser.status === statuses.user.AUTHORIZED ? (
            <LogoutIcon
              className={classNames('navbar__button-icon', {
                'navbar__button-icon_place_main': isMain,
              })}
            />
          ) : (
            ''
          )}
        </button>
      </nav>
    );
  },
);

export default NavBar;
