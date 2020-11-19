import { memo } from 'react';

const EmailIcon = memo(({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M22 18.21V5.79L15.1 12zM12 14.79l-1.97-1.77-6.9 6.21h17.74l-6.9-6.21zM20.87 4.77H3.13L12 12.75zM2 5.79v12.42L8.9 12z"></path>
    </svg>
  );
});

export default EmailIcon;
