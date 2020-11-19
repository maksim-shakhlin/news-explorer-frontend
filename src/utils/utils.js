import { LOCALE } from '../configs/config';
import { MAX_NAME_CHARS_SHOWN } from '../configs/config';
import { UI } from '../configs/ru';

export function omit(object, skip) {
  const newObj = {};
  for (const key in object) {
    if (skip.includes(key)) {
      continue;
    }
    newObj[key] = object[key];
  }
  return newObj;
}

export function isOverflown(el) {
  if (el.scrollWidth > el.clientWidth) {
    return true;
  }

  if (el.scrollHeight < el.clientHeight) {
    return false;
  }
  const lineHeight = Number(getComputedStyle(el).lineHeight.split('px')[0]);
  return (
    Math.floor(el.scrollHeight / lineHeight) !==
    Math.floor(el.clientHeight / lineHeight)
  );
}

export function clamp(el, initialText, ending = '...') {
  el.textContent = initialText;

  let flag = false;
  let prev;

  while (isOverflown(el)) {
    if (el.textContent === ending) {
      el.textContent = '';
      return;
    }
    if (flag) {
      el.textContent =
        el.textContent.substring(0, el.textContent.length - 4) + ending;
      continue;
    }
    prev = el.textContent;
    el.textContent = el.textContent.replace(
      /[\s!@#$%^&*()-_+=;:,./?\\|`~[\]{}<>"']*\s(\S)*$/,
      ending,
    );
    if (el.textContent === prev) {
      flag = true;
    }
  }
}

export function getDateString(dateISO8601) {
  const date = new Date(dateISO8601);
  const now = new Date();
  const daysDelta = parseInt((now - date) / (24 * 3600 * 1000));

  if (daysDelta < 7) {
    const realDelta = (now.getDay() - date.getDay()) % 7;
    switch (realDelta) {
      case 0:
        return UI.TODAY;
      case 1:
        return UI.YESTERDAY;
      case 2:
        return UI.DAY_BEFORE_YESTERDAY;
      default:
        return date.toLocaleString(LOCALE, { weekday: 'long' });
    }
  }

  const dayAndMonth = date.toLocaleString(LOCALE, {
    day: 'numeric',
    month: 'long',
  });

  if (date.getFullYear() === now.getFullYear()) {
    return dayAndMonth;
  }

  return dayAndMonth + ', ' + date.getFullYear();
}

export function getName(string) {
  if (string.length <= MAX_NAME_CHARS_SHOWN) {
    return string;
  }

  const name = string.split(' ')[0];
  if (name.length <= MAX_NAME_CHARS_SHOWN) {
    return name;
  }

  return name.substring(0, MAX_NAME_CHARS_SHOWN - 4) + '...';
}

export function getInputs(content, inputs = [], all = false) {
  for (const item of content) {
    if (item.kind === 'input' || all) {
      inputs.push(item);
    }
    if (item.kind === 'fieldset') {
      getInputs(item.content, inputs, true);
    }
  }
  return inputs;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function isEmpty(obj) {
  if (!obj) return true;

  if (typeof obj !== 'object') return false;

  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

export function cleanSpaces(string) {
  return string.replace(/\s+/g, ' ').trim();
}

export function setFocus(ref, offset = 30) {
  if (ref.current) {
    const pos = ref.current.offsetTop - offset;
    window.scrollTo({ top: pos, behavior: 'smooth' });
  }
}

export function fillTemplate(template = '', fillers = {}) {
  const vars = (template.match(/%\w+%/gi) || []).map(
    (item) => item.split('%')[1],
  );
  const parts = template.split('%');

  let res = '';

  parts.forEach((part) => {
    if (vars.includes(part)) {
      res += fillers[part] || UI.UNDEFINED;
    } else {
      res += part;
    }
  });
  return res;
}
