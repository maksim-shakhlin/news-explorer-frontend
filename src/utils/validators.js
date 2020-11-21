import { isEmail } from 'validator';
import { ERRORS } from '../locales/ru';
import { cleanSpaces, fillTemplate } from './utils';

export function validateLength(input) {
  const realLength = cleanSpaces(input.value).length;
  const minLength = input.getAttribute('minlength') || +input.required;

  if (input.value.length >= minLength && realLength < minLength) {
    return fillTemplate(ERRORS.MIN_LENGTH_TEMPLATE, { min: minLength });
  }

  return '';
}

export function validateEmail(input) {
  if (!isEmail(input.value.trim())) {
    return ERRORS.INVALID_EMAIL;
  }

  return '';
}
