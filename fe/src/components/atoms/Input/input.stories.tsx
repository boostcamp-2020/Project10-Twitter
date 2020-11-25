import React, { useState } from 'react';
import Input from './index';

export default {
  title: 'Atoms/Input',
  component: Input,
};

export const Default = () => {
  const placeholder = '입력!';
  const type = 'text';
  const variant = 'standard';
  return <Input placeholder={placeholder} type={type} variant={variant} />;
};

export const noUnderLineInput = () => {
  const placeholder = '입력!';
  const type = 'text';
  const variant = 'outlined';
  return <Input placeholder={placeholder} type={type} variant={variant} />;
};
