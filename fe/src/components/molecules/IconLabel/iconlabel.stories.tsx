import React from 'react';
import { Search, Text } from '@atoms';
import IconLabel from './index';

export default {
  title: 'Molecules/IconLabel',
  component: IconLabel,
};

export const Default = () => {
  const value = '관심사를 팔로우하세요.';
  const color = 'black';
  const size = '20px';
  const weight = 700;

  return (
    <IconLabel>
      <Search />
      &nbsp; &nbsp;
      <Text value={value} color={color} size={size} weight={weight} />
    </IconLabel>
  );
};
