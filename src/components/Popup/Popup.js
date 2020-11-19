import { useEffect, useCallback, memo, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import CloseIcon from '../icons/CloseIcon';

const Popup = memo(
  ({ isOpen, extraClasses = {}, onClose, nodeId = 'root', children }) => {
    const closeOnEscape = useCallback(
      (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      },
      [onClose],
    );

    const containerRef = useRef();

    const closeIfEmpty = useCallback(() => {
      if (
        containerRef.current &&
        !(containerRef.current.clientWidth && containerRef.current.clientHeight)
      ) {
        onClose();
      }
    }, [onClose]);

    useEffect(() => {
      window.addEventListener('resize', closeIfEmpty);
      return () => window.removeEventListener('resize', closeIfEmpty);
    }, [closeIfEmpty]);

    const closeOnOverlayClick = useCallback(
      (event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      },
      [onClose],
    );

    useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', closeOnEscape);

        return function removeListener() {
          document.removeEventListener('keydown', closeOnEscape);
        };
      }
    });

    if (!isOpen) {
      return '';
    }

    return createPortal(
      <section
        className={classNames('popup', { popup_opened: isOpen })}
        onMouseDown={closeOnOverlayClick}
      >
        <div
          className={classNames('popup__container', extraClasses.container)}
          ref={containerRef}
        >
          {children}
          <button
            type="button"
            className={classNames('popup__close-button', extraClasses.button)}
            onClick={onClose}
          >
            <CloseIcon className="popup__icon" />
          </button>
        </div>
      </section>,
      document.getElementById(nodeId),
    );
  },
);

export default Popup;
