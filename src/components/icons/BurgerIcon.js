import { memo } from 'react';

const BurgerIcon = memo(({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
    >
      <path d="M4 8h16v2H4zM4 14h16v2H4z" />
    </svg>
  );
});

export default BurgerIcon;
