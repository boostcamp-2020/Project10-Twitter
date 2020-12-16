import React, { useState } from 'react';
import { useOnTextChange } from '@hooks';
import Inputcontainer from './index';

export default {
  title: 'Molecules/Inputcontainer',
  component: Inputcontainer,
};

export const Default = () => {
  const labelValue = '이메일';
  const placeholder = '입력!';
  const type = 'email';
  const [value, , onChange] = useOnTextChange('');

  return (
    <Inputcontainer
      labelValue={labelValue}
      placeholder={placeholder}
      type={type}
      inputValue={value}
      onChange={onChange}
    />
  );
};
