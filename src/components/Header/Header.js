import {
  memo,
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import { statuses } from '../../utils/constants';
import { usePopup } from '../../hooks/usePopup';

import Logo from '../icons/Logo';
import NavBar from '../NavBar/NavBar';
import Popup from '../Popup/Popup';
import Auth from '../Auth/Auth';
import BurgerIcon from '../icons/BurgerIcon';
import CloseIcon from '../icons/CloseIcon';

import { UI } from '../../configs/ru';

const rootEl = document.getElementById('root');

const Header = memo(({ isMain = false, onLogin, onLogout, onSignup }) => {
  const currentUser = useContext(CurrentUserContext);

  const { isPopupOpen, closePopup, openPopup } = usePopup();
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const showMenu = useCallback(() => {
    setIsNavBarOpen(true);
    openPopup();
  }, [openPopup]);

  const onLoginClick = useCallback(() => {
    setIsNavBarOpen(false);
    openPopup();
  }, [openPopup]);

  const handleClose = useCallback(() => {
    closePopup();
    setIsNavBarOpen(false);
  }, [closePopup]);

  const menu = [
    { text: UI.MAIN, to: '/' },
    { text: UI.SAVED_NEWS, to: 'saved-news' },
  ];

  const navBarProps = {
    items: menu,
    isMain,
    extraClass: 'header__navbar',
    onClick:
      currentUser.status === statuses.user.AUTHORIZED ? onLogout : onLoginClick,
  };

  const headerRef = useRef();

  const setBackgroundOpacity = useCallback(() => {
    const opacity = window.pageYOffset / 30;
    headerRef.current.style.backgroundColor = `rgba(26,27,34,${opacity})`;
  }, []);

  useEffect(() => {
    if (isNavBarOpen) {
      headerRef.current.style.backgroundColor = '';
    } else {
      setBackgroundOpacity();
    }
  }, [isNavBarOpen, setBackgroundOpacity]);

  useEffect(() => {
    document.addEventListener('scroll', setBackgroundOpacity);
    return () => {
      document.removeEventListener('scroll', setBackgroundOpacity);
    };
  }, [setBackgroundOpacity]);

  return createPortal(
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
            : 'popup__container_for_auth',
        }}
        nodeId="modal"
      >
        {isNavBarOpen ? (
          <NavBar {...navBarProps} extraClass="" isMobile={true} />
        ) : (
          <Auth onSignup={onSignup} onLogin={onLogin} />
        )}
      </Popup>
    </header>,
    rootEl,
  );
});

export default Header;
