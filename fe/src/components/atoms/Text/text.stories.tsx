import React from 'react';
import { text, select } from '@storybook/addon-knobs';
import Text from './index';

export default {
  title: 'Atoms/Text',
  component: Text,
};

export const Default = () => {
  const content = text('text', 'text');
  const styled = select('styled', ['root', 'title', 'sub'], 'root');

  return <Text value={content} styled={styled} />;
};
