import React from 'react';
import IconButton from './index';
import Home from '../../atoms/icons/Home';

export default {
  title: 'Molecules/IconButton',
  component: IconButton,
};

export const Default = () => {
  const label = 'home';
  return <IconButton label={label} icon={Home} />;
};
