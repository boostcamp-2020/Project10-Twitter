import React, { useCallback, useState, useRef, useEffect } from 'react';

const useInfiniteScroll = (
  targetEl: any,
  ssr = false,
): [boolean, boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isFirstRender = useRef(!ssr);
  const [isIntersecting, setIntersecting] = useState(false);
  const [loadFinished, setLoadFinished] = useState(false);

  const getObserver = useCallback((): IntersectionObserver => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        const intersecting = entries.some((entry) => entry.isIntersecting);
        if (isFirstRender.current && intersecting) {
          isFirstRender.current = false;
          return;
        }
        setIntersecting(intersecting);
      });
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

  return [isIntersecting, loadFinished, setLoadFinished];
};

export default useInfiniteScroll;
