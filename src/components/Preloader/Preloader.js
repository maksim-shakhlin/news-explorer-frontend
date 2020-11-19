import { memo } from 'react';
import classNames from 'classnames';

const Preloader = memo(({ extraClass }) => {
  return <div className={classNames('preloader', extraClass)}></div>;
});

export default Preloader;
