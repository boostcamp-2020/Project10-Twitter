import React from 'react';
import Label from './index';

export default {
  title: 'Atoms/Label',
  component: Label,
};

export const Default = () => {
  const value = '이메일';
  return <Label value={value} />;
};
