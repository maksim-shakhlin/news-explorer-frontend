import { memo, useState, useCallback } from 'react';
import Form from '../Form/Form';
import signup from '../../forms/signup';
import login from '../../forms/login';
import { modes } from '../../utils/constants';
import classNames from 'classnames';

import { UI } from '../../configs/ru';

const texts = {
  [modes.LOGIN]: UI.SIGNUP,
  [modes.SIGNUP]: UI.LOGIN,
};

const Auth = memo(({ onLogin, onSignup }) => {
  const [mode, setMode] = useState(modes.REGISTERED); // DEMO

  const switchMode = useCallback(() => {
    switch (mode) {
      case modes.LOGIN:
        setMode(modes.SIGNUP);
        break;
      case modes.SIGNUP:
      case modes.REGISTERED:
        setMode(modes.LOGIN);
        break;
      default:
    }
  }, [mode]);

  const props = {
    [modes.LOGIN]: {
      ...login,
      onSubmit: onLogin,
    },
    [modes.SIGNUP]: {
      ...signup,
      onSubmit: onSignup,
    },
    [modes.REGISTERED]: {
      title: UI.SIGNUP_SUCCESS,
      name: 'registered',
      validate: false,
      content: [{ kind: 'submit', text: UI.LOGIN }],
      extraClasses: {
        submit: 'form__button_type_text',
        title: 'form__title_no-inputs',
      },
      onSubmit: switchMode,
    },
  };

  return (
    <section
      className={classNames('auth', {
        auth_type_message: mode === modes.REGISTERED,
      })}
    >
      <Form
        {...props[mode]}
        state={{ values: {}, errors: {}, isValid: false }}
      />
      {texts[mode] && (
        <p className="auth__bottom">
          {UI.OR}{' '}
          <button className="auth__link" onClick={switchMode}>
            {texts[mode]}
          </button>
        </p>
      )}
    </section>
  );
});

export default Auth;
