import React from 'react';
import { Home } from '@atoms';
import IconButton from './index';

export default {
  title: 'Molecules/IconButton',
  component: IconButton,
};

export const Default = () => {
  const label = 'home';
  return <IconButton label={label} icon={Home} />;
};
