import React from 'react';
import HeartContainer from './index';

export default {
  title: 'Organisms/HeartContainer',
  component: HeartContainer,
};

export const Default = () => {
  const user = {
    user_id: '홍길동',
    name: '길동',
    profile_img_url: 'https://avatars2.githubusercontent.com/u/46195613?v=4',
    comment: '',
  };

  const tweet = {
    _id: '5fcddd8f096659ab703027b3',
    content: '하트 알림 테스트',
  };

  return <HeartContainer user={user} tweet={tweet} />;
};
