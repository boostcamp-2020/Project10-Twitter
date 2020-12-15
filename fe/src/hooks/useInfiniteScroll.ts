import React, { useCallback, useState, useRef, useEffect } from 'react';

const useInfiniteScroll = (
  targetEl: React.MutableRefObject<null>,
): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isIntersecting, setIntersecting] = useState(false);
  const [loadFinished, setLoadFinished] = useState(false);

  const getObserver = useCallback((): IntersectionObserver => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const intersecting = entries.some((entry) => entry.isIntersecting);
          setIntersecting(intersecting);
        },
        { root: null, rootMargin: '0px', threshold: 0 },
      );
    }
    return observerRef.current;
  }, [observerRef.current]);

  const stopObserving = useCallback(() => {
    getObserver().disconnect();
  }, []);

  useEffect(() => {
    if (targetEl.current) getObserver().observe(targetEl.current);
    return stopObserving;
  }, [targetEl.current]);

  useEffect(() => {
    if (loadFinished) stopObserving();
  }, [loadFinished]);

  return [isIntersecting, setIntersecting, loadFinished, setLoadFinished];
};

export default useInfiniteScroll;
