import { useState, useCallback, useEffect } from 'react';

export default function useProvider(dataset, provider) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(provider.get());
  }, [dataset, provider]);

  const more = useCallback(() => {
    provider.more();
    setData(provider.get());
  }, [provider]);

  const ref = useCallback(() => {
    return provider.ref();
  }, [provider]);

  const remained = useCallback(() => {
    return provider.remained();
  }, [provider]);

  return {
    data,
    more,
    ref,
    remained,
  };
}
