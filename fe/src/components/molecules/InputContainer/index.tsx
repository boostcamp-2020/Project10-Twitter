import React, { FunctionComponent } from 'react';
import { Label, Input } from '@atoms';
import Container from './styled';

interface Props {
  labelValue: string;
  placeholder?: string;
  type?: string;
  inputValue: string;
  onChange: (e: React.SyntheticEvent) => void;
  className?: string;
}

const InputContainer: FunctionComponent<Props> = ({
  labelValue,
  placeholder = '',
  type,
  inputValue,
  onChange,
  className,
}) => (
  <Container className={className}>
    <Label value={labelValue} />
    <Input placeholder={placeholder} type={type} value={inputValue} onChange={onChange} />
  </Container>
);

export default InputContainer;
