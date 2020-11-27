import React from 'react';
import { text, select } from '@storybook/addon-knobs';
import Text from './index';

export default {
  title: 'Atoms/Text',
  component: Text,
};

export const Default = () => {
  const content = text('text', 'text');
  const color = '#0B614B';
  const size = '20px';

  return <Text value={content} color={color} size={size} />;
};

export const Title = () => {
  const content = text('text', 'text');
  const styled = select('styled', ['root', 'title', 'sub'], 'title');

  return <Text value={content} styled={styled} />;
};

export const Sub = () => {
  const content = text('text', 'text');
  const styled = select('styled', ['root', 'title', 'sub'], 'sub');

  return <Text value={content} styled={styled} />;
};
