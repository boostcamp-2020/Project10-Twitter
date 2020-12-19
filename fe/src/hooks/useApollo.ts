import { useMemo } from 'react';
import { NormalizedCacheObject } from '@apollo/client';
import { initializeApollo } from '@libs';

const useApollo = (initialState: NormalizedCacheObject) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};

export default useApollo;
