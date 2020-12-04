import React from 'react';
import { text } from '@storybook/addon-knobs';
import TitleSubText from './index';

export default {
  title: 'Molecules/TitleSubText',
  component: TitleSubText,
};

export const Default = () => {
  const title = text('title', '아이디가 나온다');
  const sub = text('sub', '닉네임이 나온다');

  return <TitleSubText title={title} sub={sub} />;
};
