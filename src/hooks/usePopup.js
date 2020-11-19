import { useState, useCallback } from 'react';

export function usePopup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  const openPopup = useCallback(() => {
    setIsPopupOpen(true);
  }, []);

  return { isPopupOpen, closePopup, openPopup };
}
