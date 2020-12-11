import React, { useState } from 'react';
import SearchBar from './index';

export default {
  title: 'Molecules/SearchBar',
  component: SearchBar,
};

export const Default = () => {
  const placeholder = 'Search Twitter';
  const type = 'text';
  const variant = 'standard';
  return <SearchBar placeholder={placeholder} type={type} variant={variant} />;
};
