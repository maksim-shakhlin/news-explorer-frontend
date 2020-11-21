import { useState, useCallback } from 'react';

export default function usePrompt(callback) {
  const [promptText, setPromptText] = useState('');
  const [promptItems, setPromptItems] = useState([]);
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  const closePrompt = useCallback(
    (data) => {
      if (callback) {
        callback(data);
      }
      setIsPromptOpen(false);
    },
    [callback],
  );

  const openPrompt = useCallback((text, items) => {
    setPromptText(text);
    setPromptItems(items);
    setIsPromptOpen(true);
  }, []);

  return { promptText, isPromptOpen, promptItems, closePrompt, openPrompt };
}
