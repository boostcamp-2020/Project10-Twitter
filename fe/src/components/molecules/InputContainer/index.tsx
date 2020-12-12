import React, { FunctionComponent } from 'react';
import { Label, Input } from '@atoms';
import Container from './styled';

interface Props {
  labelValue: string;
  placeholder?: string;
  type?: string;
  variant?: 'filled' | 'outlined' | 'standard' | undefined;
  inputValue: string;
  onChange: (e: React.SyntheticEvent) => void;
  className?: string;
}

const InputContainer: FunctionComponent<Props> = ({
  labelValue,
  placeholder = '',
  type,
  variant,
  inputValue,
  onChange,
  className,
}) => (
  <Container className={className}>
    <Label value={labelValue} />
    <Input
      placeholder={placeholder}
      type={type}
      variant={variant}
      value={inputValue}
      onChange={onChange}
    />
  </Container>
);

export default InputContainer;
