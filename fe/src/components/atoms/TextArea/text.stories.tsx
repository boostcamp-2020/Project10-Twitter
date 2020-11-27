import React, { useState } from 'react';
import { text, select } from '@storybook/addon-knobs';
import Text from './index';

export default {
  title: 'Atoms/TextArea',
  component: Text,
};

export const Default = () => {
  const [value, setValue] = useState('');
  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };
  const placeholder = "What's happening";

  return <Text placeholder={placeholder} value={value} onChange={onChange} />;
};
