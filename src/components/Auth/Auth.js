import { memo, useState, useCallback, useEffect } from 'react';
import Form from '../Form/Form';
import signup from '../../forms/signup';
import login from '../../forms/login';
import { modes } from '../../utils/constants';
import { getValidators } from '../../utils/utils';
import classNames from 'classnames';

import { useValidatedForm } from '../../hooks/useForm';

import { UI } from '../../locales/ru';

const texts = {
  [modes.LOGIN]: UI.SIGNUP,
  [modes.SIGNUP]: UI.LOGIN,
};
const validators = {
  [modes.LOGIN]: getValidators(login.content),
  [modes.SIGNUP]: getValidators(signup.content),
};

const Auth = memo(({ onLogin, onSignup }) => {
  const [mode, setMode] = useState(modes.LOGIN);
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);

  const { values, handleChange, errors, isValid, resetForm } = useValidatedForm(
    validators[mode],
  );

  const handleLogin = useCallback(
    (data) => {
      setIsSending(true);
      onLogin(data).catch((err) => {
        setIsSending(false);
        setError(err.message);
      });
    },
    [onLogin],
  );

  const handleSignup = useCallback(
    (data) => {
      setIsSending(true);
      setError('');
      onSignup(data)
        .then(setMode(modes.REGISTERED))
        .catch((err) => setError(err.message))
        .finally(() => setIsSending(false));
    },
    [onSignup],
  );

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

  useEffect(() => {
    resetForm();
  }, [resetForm, mode]);

  const props = {
    [modes.LOGIN]: {
      ...login,
      onSubmit: handleLogin,
    },
    [modes.SIGNUP]: {
      ...signup,
      onSubmit: handleSignup,
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
      {
        <Form
          {...props[mode]}
          error={error}
          values={values}
          errors={errors}
          isValid={isValid}
          onChange={handleChange}
          isSending={isSending}
        />
      }
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
