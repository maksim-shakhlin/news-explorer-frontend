import {
  memo,
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import classNames from 'classnames';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import Logo from '../icons/Logo';
import NavBar from '../NavBar/NavBar';
import Popup from '../Popup/Popup';
import Auth from '../Auth/Auth';
import BurgerIcon from '../icons/BurgerIcon';
import CloseIcon from '../icons/CloseIcon';

import { UI } from '../../locales/ru';
import {
  statuses,
  NAVBAR_COLLAPSE_BREAKPOINT,
  MOBILE_HEADER_HEIGHT,
  HEADER_ON_MAIN_BAKCGROUND_COLOR,
} from './../../utils/constants';

const Header = memo(
  ({
    isMain = false,
    onLogin,
    onLogout,
    onSignup,
    popup: { isPopupOpen, closePopup, openPopup },
  }) => {
    const currentUser = useContext(CurrentUserContext);

    const history = createBrowserHistory();

    const [isNavBarOpen, setIsNavBarOpen] = useState(false);

    useEffect(() => {
      if (history.location.state && history.location.state.auth) {
        openPopup();
        const state = { ...history.location.state };
        delete state.auth;
        history.replace({ ...history.location, state });
      }
    }, [openPopup, history]);

    const showMenu = useCallback(() => {
      setIsNavBarOpen(true);
      openPopup();
    }, [openPopup]);

    const onLoginClick = useCallback(
      (evt) => {
        evt.stopPropagation();
        setIsNavBarOpen(false);
        openPopup();
      },
      [openPopup],
    );

    const handleClose = useCallback(() => {
      closePopup();
      setIsNavBarOpen(false);
    }, [closePopup]);

    const handleLogin = useCallback(
      (data) => {
        return onLogin(data).then(closePopup);
      },
      [onLogin, closePopup],
    );

    const menu = [{ text: UI.MAIN, to: '/' }];

    if (currentUser.status === statuses.user.AUTHORIZED) {
      menu.push({
        text: UI.SAVED_NEWS,
        to: 'saved-news',
      });
    }

    const navBarProps = {
      items: menu,
      isMain,
      extraClass: 'header__navbar',
      onClick:
        currentUser.status === statuses.user.AUTHORIZED
          ? onLogout
          : onLoginClick,
    };

    const headerRef = useRef();

    const setBackgroundOpacity = useCallback(() => {
      if (
        isNavBarOpen ||
        headerRef.current.clientWidth > NAVBAR_COLLAPSE_BREAKPOINT ||
        !headerRef.current.classList.contains('header_place_main')
      ) {
        return;
      }
      const opacity = window.pageYOffset / MOBILE_HEADER_HEIGHT;
      headerRef.current.style.backgroundColor = `rgba(${HEADER_ON_MAIN_BAKCGROUND_COLOR},${opacity})`;
    }, [isNavBarOpen]);

    useEffect(() => {
      if (isNavBarOpen) {
        headerRef.current.style.backgroundColor = '';
      } else {
        setBackgroundOpacity();
      }
    }, [isNavBarOpen, setBackgroundOpacity]);

    useEffect(() => {
      if (isMain) {
        document.addEventListener('scroll', setBackgroundOpacity);
        return () => {
          document.removeEventListener('scroll', setBackgroundOpacity);
        };
      }
    }, [setBackgroundOpacity, isMain]);

    return (
      <header
        className={classNames(
          'header unit unit_flat',
          {
            app__unit: !isMain,
          },
          { header_place_main: isMain },
          { 'header_navbar-open': isNavBarOpen },
        )}
        ref={headerRef}
      >
        {isMain ? (
          <Logo
            className={classNames('logo header__logo', {
              header__logo_place_main: isMain,
            })}
          />
        ) : (
          <Link to="/" className="header__link">
            <Logo className="logo header__logo" />
          </Link>
        )}
        <NavBar {...navBarProps} />
        <button
          className="header__button"
          onClick={isPopupOpen ? handleClose : showMenu}
        >
          {isPopupOpen ? (
            <CloseIcon
              className={classNames('header__button-icon', {
                'header__button-icon_place_main': isMain,
              })}
            />
          ) : (
            <BurgerIcon
              className={classNames('header__button-icon', {
                'header__button-icon_place_main': isMain,
              })}
            />
          )}
        </button>

        <Popup
          isOpen={isPopupOpen}
          onClose={handleClose}
          extraClasses={{
            container: isNavBarOpen
              ? 'popup__container_for_navbar'
              : 'popup__container_solid',
          }}
        >
          {isNavBarOpen ? (
            <NavBar
              {...navBarProps}
              extraClass=""
              isMobile={true}
              onTap={handleClose}
            />
          ) : (
            <Auth onSignup={onSignup} onLogin={handleLogin} />
          )}
        </Popup>
      </header>
    );
  },
);

export default Header;
