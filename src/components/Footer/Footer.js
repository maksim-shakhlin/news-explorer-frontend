import { useHistory } from 'react-router-dom';
import { memo, useCallback } from 'react';
import EmailIcon from '../icons/EmailIcon';
import GithubIcon from './../icons/GithubIcon';

import { UI } from '../../configs/ru';

const Footer = memo(() => {
  const year = new Date().getFullYear();
  const tag = year - 2020 ? `—${year}` : '';

  const history = useHistory();

  const toMain = useCallback(() => {
    history.push('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [history]);

  return (
    <footer className="footer unit unit_flat app__unit app__footer">
      <div className="footer__links">
        <ul className="footer__text-links">
          <li className="footer__text-links-item">
            <p className="footer__text-link footer__link" onClick={toMain}>
              {UI.MAIN}
            </p>
          </li>
          <li className="footer__text-links-item">
            <a
              href="https://praktikum.yandex.ru"
              className="footer__text-link footer__link"
              rel="noreferrer"
              target="_blank"
            >
              {UI.PRAKTIKUM}
            </a>
          </li>
        </ul>
        <ul className="footer__icon-links">
          <li>
            <a
              href="mailto:maksim-shakhlin@yandex.ru"
              className="footer__icon-link footer__link"
            >
              <EmailIcon className="footer__icon" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/maksim-shakhlin"
              className="footer__icon-link footer__link"
              rel="noreferrer"
              target="_blank"
            >
              <GithubIcon className="footer__icon" />
            </a>
          </li>
        </ul>
      </div>
      <p className="footer__text">
        {' '}
        {`© 2020${tag} NewsExplorer. Powered\xa0by\xa0News\xa0API`}
      </p>
    </footer>
  );
});

export default Footer;
