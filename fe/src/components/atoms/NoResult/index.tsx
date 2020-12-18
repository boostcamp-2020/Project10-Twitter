import React, { FunctionComponent } from 'react';
import Container from './styled';

interface Props {
  value: string;
  start: string;
  end: string;
}

const NoResult: FunctionComponent<Props> = ({ start, value, end }) => {
  const string = `${start} ${value} ${end}`;
  return <Container>{string}</Container>;
};

export default NoResult;
