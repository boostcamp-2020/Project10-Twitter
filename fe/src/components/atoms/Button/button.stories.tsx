import React from 'react';
import { text } from '@storybook/addon-knobs';
import Button from './index';

export default {
  title: 'Atoms/Button',
  component: Button,
};

export const Default = () => {
  const content = text('text', 'default');
  const color = 'primary';
  const variant = 'contained';

  return <Button text={content} color={color} variant={variant} />;
};
