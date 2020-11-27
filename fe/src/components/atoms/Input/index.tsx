import React, { FunctionComponent } from 'react';
import { TextField } from '@material-ui/core';

interface Props {
  onChange?: (e: React.SyntheticEvent) => void;
  placeholder?: string;
  type?: string;
  value?: string;
  variant?: 'filled' | 'outlined' | 'standard' | undefined;
}

const Input: FunctionComponent<Props> = ({
  placeholder = '',
  variant = 'standard',
  type = 'text',
  onChange,
  value = '',
}) => (
  <TextField
    placeholder={placeholder}
    variant={variant}
    type={type}
    onChange={onChange}
    value={value}
  />
);

export default Input;
