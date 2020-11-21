import { memo, useEffect, useRef, createRef, useMemo } from 'react';
import classNames from 'classnames';

import { omit } from '../../utils/utils';
import Input from '../Input/Input';

const inputOmit = ['kind', 'ref', 'extra'];

const Form = memo(
  ({
    name,
    error,
    onSubmit,
    title = '',
    classes = {
      form: 'form',
      input: 'form__input',
      fieldset: 'form__fields',
      title: 'form__title',
      submit: 'form__button',
      label: 'form__field',
      error: 'form__error',
      formError: 'form__error form__error_type_total',
    },
    content = [],
    sendingClasses = { submit: 'form__button_sending' },
    errorClasses = {
      error: 'form__error_visible',
      input: 'form__input_invalid',
      submit: 'form__button_disabled',
    },
    extraClasses = {},
    isSending = false,
    blurOnSubmit = true,
    validate = false,
    values,
    errors,
    isValid,
    onChange,
  }) => {
    function getClasses(item) {
      return classNames(
        classes[item] || '',
        extraClasses[item] || '',
        {
          [sendingClasses[item]]: sendingClasses[item] && isSending,
        },
        { [errorClasses[item]]: errorClasses[item] && validate && !isValid },
      );
    }

    const focusedInput = useMemo(() => createRef(), []);
    const submit = useRef(null);

    useEffect(() => {
      setTimeout(() => {
        if (focusedInput.current) {
          focusedInput.current.focus();
          if (
            ['text', 'url', 'tel', 'search'].includes(focusedInput.current.type)
          ) {
            focusedInput.current.selectionStart =
              focusedInput.current.value.length;
            focusedInput.current.selectionEnd =
              focusedInput.current.value.length;
          }
        }
      }, 0);
    }, [content, focusedInput]);

    function handleSubmit(event) {
      event.preventDefault();

      if (blurOnSubmit) {
        submit.current.focus();
        submit.current.blur();
      }

      if (isSending) {
        return;
      }

      if (onSubmit) {
        onSubmit(values);
      }
    }

    return (
      <form
        name={name}
        className={getClasses('form')}
        noValidate
        onSubmit={handleSubmit}
      >
        {title ? <h2 className={getClasses('title')}>{title}</h2> : ''}
        {content.map((item) => {
          switch (item.kind) {
            case 'fieldset':
              return (
                <fieldset
                  key={`${name}_${item.kind}_${
                    item.title ||
                    (item.content && item.content[0].name) ||
                    Math.random()
                  }`}
                  disabled={isSending}
                  className={getClasses('fieldset')}
                >
                  <legend className={getClasses('title')}>{item.title}</legend>
                  {item.content.map((subitem) => (
                    <Input
                      key={`${name}_${item.kind}_${item.title}_${subitem.name}`}
                      {...omit(subitem, inputOmit)}
                      ref={(subitem.ref && focusedInput) || null}
                      value={values[subitem.name] || ''}
                      error={validate ? errors[subitem.name] : ''}
                      onChange={onChange}
                      validate={validate}
                      classes={{
                        input: getClasses('input'),
                        label: getClasses('label'),
                        error: getClasses('error'),
                      }}
                    />
                  ))}
                </fieldset>
              );
            case 'input':
              return (
                <Input
                  key={`${name}_${item.kind}_${item.name}`}
                  {...omit(item, inputOmit)}
                  ref={(item.ref && focusedInput) || null}
                  value={values[item.name] || ''}
                  error={validate ? errors[item.name] : ''}
                  onChange={onChange}
                  validate={validate}
                  disabled={isSending}
                  classes={{
                    input: getClasses('input'),
                    label: getClasses('label'),
                    error: getClasses('error'),
                  }}
                />
              );
            case 'error':
              return (
                <p
                  key={'error'}
                  className={classNames(getClasses('formError'), {
                    form__error_visible: isValid,
                  })}
                >
                  {error}
                </p>
              );
            case 'submit':
              return (
                <button
                  {...omit(item, ['kind', 'text', 'sendingText'])}
                  key={`${name}_${item.kind}`}
                  type="submit"
                  disabled={isSending || (validate && !isValid)}
                  className={getClasses('submit')}
                  ref={submit}
                >
                  {(isSending && item.sendingText) || item.text || ''}
                </button>
              );
            default:
              return <></>;
          }
        })}
      </form>
    );
  },
);

export default Form;
