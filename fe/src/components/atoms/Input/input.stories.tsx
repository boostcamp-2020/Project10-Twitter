import React, { useState } from 'react';
import Input from './index';

export default {
  title: 'Atoms/Input',
  component: Input,
};

export const Default = () => {
  const [value, setValue] = useState('');
  const placeholder = '입력!';
  const type = 'text';
  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };
  return <Input placeholder={placeholder} type={type} value={value} onChange={onChange} />;
};

export const noUnderLineInput = () => {
  const [value, setValue] = useState('');
  const placeholder = '입력!';
  const type = 'text';
  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };
  return <Input placeholder={placeholder} type={type} value={value} onChange={onChange} />;
};
