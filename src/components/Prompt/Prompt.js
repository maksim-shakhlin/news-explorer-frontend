import { memo } from 'react';
import Popup from '../Popup/Popup';
import classNames from 'classnames';

const Prompt = memo(({ text, isOpen, items = [], onClose }) => {
  if (!items.length) return '';
  const len = items.filter((item) => item.default).length;
  if (!len) items[0].default = true;

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      extraClasses={{
        container: 'popup__container_solid popup__container_for_prompt',
      }}
    >
      <h2 className="prompt__title">{text}</h2>
      {items.length && (
        <div className="prompt__buttons">
          {items.map((item, i) => {
            return item.text ? (
              <button
                className={classNames('prompt__button', {
                  prompt__button_default: item.default,
                })}
                onClick={() => onClose(item.value)}
                key={i}
              >
                {item.text}
              </button>
            ) : (
              ''
            );
          })}
        </div>
      )}
    </Popup>
  );
});

export default Prompt;
