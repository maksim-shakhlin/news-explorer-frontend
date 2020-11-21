import { LOCALE, MAX_NAME_CHARS_SHOWN } from '../utils/constants';
import { DICT, UI } from '../locales/ru';

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
  return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
}

function restore(el) {
  el.style.display = '';
  el.textContent = el.data;
}

function trimLine(el, ending = '...') {
  const lineHeight = Number(getComputedStyle(el).lineHeight.split('px')[0]);
  const linesCountTarget = Math.floor(el.clientHeight / lineHeight) - 1;

  if (!linesCountTarget) {
    el.textContent = '';
    return true;
  }
  if (linesCountTarget < 0) {
    el.style.display = 'none';
    return false;
  }

  const desiredHeight = lineHeight * linesCountTarget;

  while (el.clientHeight > desiredHeight) {
    if (el.textContent === ending) {
      el.textContent = '';
      return true;
    }

    el.textContent = el.textContent.replace(
      /[\s!@#$%^&*()-_+=;:,./?\\|`~[\]{}<>"']*\s(\S)*$/,
      ending,
    );
  }

  return true;
}

export function fitTextContent(el) {
  const children = el.children;
  if (!children.length) {
    return;
  }
  let index = children.length - 1;

  if (!children[0].data) {
    for (const child of children) {
      child.data = child.textContent;
    }
  }

  if (!isOverflown(el)) {
    for (const child of children) {
      restore(child);
    }
  }

  let res = true;
  while (isOverflown(el)) {
    if (!res) {
      index--;
    }
    if (index < 0) {
      return;
    }
    res = trimLine(children[index]);
  }
}

function modulo(x, m) {
  return ((x % m) + m) % m;
}

export function getDateString(dateISO8601) {
  const date = new Date(dateISO8601);
  const now = new Date();
  const daysDelta = parseInt((now - date) / (24 * 3600 * 1000));

  if (daysDelta < 3) {
    const realDelta = modulo(now.getDay() - date.getDay(), 7);

    switch (realDelta) {
      case 0:
        return UI.TODAY;
      case 1:
        return UI.YESTERDAY;
      case 2:
        return UI.DAY_BEFORE_YESTERDAY;
      default:
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

export function getValidators(content) {
  const validators = {};
  const inputs = getInputs(content);

  inputs.forEach((input) => {
    if (input.extra) {
      validators[input.name] = input.extra.validator;
    }
  });

  return validators;
}

export function cleanSpaces(string) {
  return string.replace(/\s+/g, ' ').trim();
}

export function clean(obj, keys) {
  for (const key in obj) {
    if (keys.includes(key)) {
      obj[key] = cleanSpaces(obj[key]);
    }
  }
  return obj;
}

export function setFocus(ref, offset = 80) {
  if (ref.current) {
    const pos = ref.current.offsetTop - offset;
    window.scrollTo({ top: pos, behavior: 'smooth' });
  }
}

export function plural(forms = [], n = 0) {
  let i;

  if (n % 10 === 1 && n % 100 !== 11) {
    i = 0; // one
  } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
    i = 1; // few
  } else {
    i = 2; // many
  }
  return forms[i] || '';
}

export function fillTemplate(template = '', fillers = {}, dict = DICT) {
  let isFiller = false;
  let filler = '';
  let res = '';

  for (let i = 0; i < template.length; i++) {
    if (template[i] !== '%') {
      if (isFiller) {
        filler += template[i];
      } else {
        res += template[i];
      }
    } else {
      if (isFiller) {
        const split = filler.split('_');
        if (split.length === 1) {
          res +=
            fillers[split[0]] === undefined
              ? UI.UNDEFINED
              : fillers[split[0]]
              ? fillers[split[0]]
              : UI.NONE;
        } else {
          res += plural(dict[split[1]], fillers[split[0]] || 0);
        }

        filler = '';
        isFiller = false;
      } else {
        isFiller = true;
      }
    }
  }

  return res;
}

export function capitalize(string) {
  if (!string) return '';
  return string[0].toUpperCase() + string.slice(1);
}
