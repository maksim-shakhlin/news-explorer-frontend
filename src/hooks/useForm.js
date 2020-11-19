import { useState, useCallback } from 'react';

function getErrorMessage(input, errorsDict = {}) {
  const validity = input.validity;

  for (const key in validity) {
    if (validity[key]) {
      if (key === 'typeMismatch') {
        const spec = errorsDict[input.name];
        const specified_value = spec && spec[key];
        const def = errorsDict.default;
        const default_value =
          def &&
          def[key] &&
          (def[key][input.type] || def[key].default || def[key]);
        return specified_value || default_value || input.validationMessage;
      }
      return (
        (errorsDict[input.name] && errorsDict[input.name][key]) ||
        (errorsDict.default && errorsDict.default[key]) ||
        input.validationMessage
      );
    }
  }
}

function validate(input, validator) {
  if (validator) {
    input.setCustomValidity(validator(input));
  }
  return input.closest('form').checkValidity();
}

function useFormWithoutValidation() {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
  };

  const resetForm = useCallback((values) => {
    if (values) {
      setValues(values);
    }
  }, []);

  return { values, handleChange, resetForm };
}

function useFormWithValidation(errorsDict = {}, validators = {}) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setIsValid(validate(target, validators[name]));
    setErrors({
      ...errors,
      [name]: getErrorMessage(target, errorsDict),
    });
  };

  const resetForm = useCallback(
    ({ values, errors, isValid = false } = {}) => {
      if (values) {
        setValues(values);
      }
      setIsValid(isValid);
      if (errors) {
        setErrors(errors);
      }
    },
    [setValues, setErrors, setIsValid],
  );

  return { values, handleChange, errors, isValid, resetForm };
}

export default function useForm(validate = false, { errorsDict, validators }) {
  const validated = useFormWithValidation(errorsDict, validators);
  const simple = useFormWithoutValidation();

  if (validate) {
    return validated;
  }
  return simple;
}
