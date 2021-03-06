import React, { useState } from 'react';
import { useTypeRouter } from '@hooks';

const useDisplayWithShallow = (routeName: string): [boolean, () => void, () => void] => {
  const { type, router } = useTypeRouter();
  const tweetId = type ? type[0] : '';
  const currentRoute = type ? type[1] : '';
  const [display, setDisplay] = useState(currentRoute === routeName);

  const onOpenModal = () => {
    router.replace(`/status/[[...type]]`, `/status/${tweetId}/${routeName}`, {
      shallow: true,
    });
    setDisplay(true);
  };

  const onCloseModal = () => {
    router.replace(`/status/[[...type]]/${routeName}`, `/status/${tweetId}`, {
      shallow: true,
    });
    setDisplay(false);
  };

  return [display, onOpenModal, onCloseModal];
};

export default useDisplayWithShallow;
