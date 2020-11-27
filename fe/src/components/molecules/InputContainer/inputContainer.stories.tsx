import React, { useState } from 'react';
import Inputcontainer from './index';

export default {
  title: 'Molecules/Inputcontainer',
  component: Inputcontainer,
};

export const Default = () => {
  const labelValue = '이메일';
  const placeholder = '입력!';
  const type = 'email';
  const variant = 'standard';

  return (
    <Inputcontainer
      labelValue={labelValue}
      placeholder={placeholder}
      type={type}
      variant={variant}
    />
  );
};
