import { memo } from 'react';

const BookmarkIcon = memo(({ className, checked = false }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
    >
      {checked ? (
        <path d="M12 16.34l-7 5.5v-18c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v18l-7-5.5z" />
      ) : (
        <path d="M12 16.34l-7 5.5 0 -18c0,-0.55 0.45,-1 1,-1l12 0c0.55,0 1,0.45 1,1l0 18 -7 -5.5zm-5 1.39l5 -3.93 5 3.93 0 -12.89 -10 0 0 12.89z"></path>
      )}
    </svg>
  );
});

export default BookmarkIcon;
