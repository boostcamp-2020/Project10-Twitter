import React, { useState } from 'react';
import Input from './index';

export default {
  title: 'Atoms/Input',
  component: Input,
};

export const Default = () => {
  const [data, setData] = useState('');
  const placeholder = '입력!';
  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };
  return <Input value={data} placehonder={placeholder} onChange={changeEvent} />;
};
