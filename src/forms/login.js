import { validateEmail, validateLength } from '../utils/validators';
import { PASSWORD_PATTERN } from '../utils/constants';
import { UI } from '../locales/ru';

const login = {
  name: 'login',
  validate: true,
  content: [
    {
      kind: 'fieldset',
      title: UI.LOGIN_TITLE,
      content: [
        {
          name: 'email',
          type: 'text',
          required: true,
          autoComplete: 'on',
          placeholder: UI.EMAIL_PLACEHOLDER,
          extra: { validator: validateEmail },
          label: UI.EMAIL_LABEL,
          ref: true,
        },
        {
          name: 'password',
          type: 'password',
          minLength: 8,
          required: true,
          autoComplete: 'on',
          placeholder: UI.PASSWORD_PLACEHOLDER,
          pattern: `^\\s*${PASSWORD_PATTERN}\\s*$`,
          extra: { validator: validateLength },
          label: UI.PASSWORD_LABEL,
        },
      ],
    },
    { kind: 'error' },
    {
      kind: 'submit',
      text: UI.LOGIN,
    },
  ],
};

export default login;
