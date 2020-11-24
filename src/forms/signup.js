import { validateLength, validateEmail } from '../utils/validators';
import { PASSWORD_PATTERN } from '../utils/constants';
import { NAME_PATTERN } from '../locales/ru';
import { UI } from '../locales/ru';

const signup = {
  name: 'signup',
  validate: true,
  content: [
    {
      kind: 'fieldset',
      title: UI.SIGNUP_TITLE,
      content: [
        {
          name: 'email',
          type: 'text',
          required: true,
          autoComplete: 'off',
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
          autoComplete: 'off',
          placeholder: UI.PASSWORD_PLACEHOLDER,
          pattern: `^${PASSWORD_PATTERN}$`,
          label: UI.PASSWORD_LABEL,
        },
        {
          name: 'name',
          type: 'text',
          minLength: 2,
          maxLength: 30,
          required: true,
          autoComplete: 'off',
          placeholder: UI.NAME_PLACEHOLDER,
          pattern: NAME_PATTERN,
          extra: { validator: validateLength },
          label: UI.NAME_LABEL,
        },
      ],
    },
    { kind: 'error' },
    {
      kind: 'submit',
      name: 'submit',
      text: UI.SIGNUP,
    },
  ],
};

export default signup;
