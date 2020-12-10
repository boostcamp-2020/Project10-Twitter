import React, { FunctionComponent } from 'react';
import Label from '../../atoms/Label';
import Input from '../../atoms/Input';
import Container from './styled';

interface Props {
  labelValue: string;
  placeholder?: string;
  type?: string;
  variant?: 'filled' | 'outlined' | 'standard' | undefined;
}

const InputContainer: FunctionComponent<Props> = ({
  labelValue,
  placeholder = '',
  type,
  variant,
}) => (
  <Container>
    <Label value={labelValue} />
    <Input placeholder={placeholder} type={type} variant={variant} />
  </Container>
);

export default InputContainer;
