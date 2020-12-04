import React from 'react';
import { text } from '@storybook/addon-knobs';
import UserInfo from './index';

export default {
  title: 'Molecules/UserInfo',
  component: UserInfo,
};

export const Default = () => {
  const title = text('title', '아이디가 나온다');
  const sub = text('sub', '닉네임이 나온다');

  return <UserInfo title={title} sub={sub} />;
};
