import { forwardRef, memo } from 'react';

const Input = forwardRef(
  (
    { classes = {}, error = '', label = '', validate = false, ...props },
    ref,
  ) => {
    const input = (
      <input {...props} ref={ref} className={classes.input || ''} />
    );

    return validate ? (
      <label className={classes.label || ''}>
        {label}
        {input}
        <span className={classes.error || ''}>{error}</span>
      </label>
    ) : (
      input
    );
  },
);

export default memo(Input);
