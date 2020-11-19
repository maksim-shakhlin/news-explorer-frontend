import { memo } from 'react';

const CloseIcon = memo(({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 40 40"
    >
      <path d="M22.357 20l8.821 8.822-2.357 2.357L18.35 20.707a1 1 0 010-1.414L28.82 8.822l2.357 2.357L22.357 20z" />
      <path d="M18.13 20l-8.82 8.822 2.356 2.357 10.472-10.472a1 1 0 000-1.414L11.666 8.822 9.31 11.179 18.131 20z" />
    </svg>
  );
});

export default CloseIcon;
