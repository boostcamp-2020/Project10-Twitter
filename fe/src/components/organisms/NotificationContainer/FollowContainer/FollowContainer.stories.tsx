import React from 'react';
import FollowContainer from './index';

export default {
  title: 'Organisms/FollowContainer',
  component: FollowContainer,
};

export const Default = () => {
  const user = {
    user_id: '홍길동',
    name: '길동',
    profile_img_url: 'https://avatars2.githubusercontent.com/u/46195613?v=4',
    comment: '',
  };

  return <FollowContainer user={user} />;
};
