import React, { FunctionComponent } from 'react';
import { InputProps, TextField } from '@material-ui/core';

interface Props {
  onChange?: (e: React.SyntheticEvent) => void;
  onKeyDown?: (e: React.SyntheticEvent) => void;
  placeholder?: string;
  type?: string;
  value?: string;
  variant?: 'filled' | 'outlined' | 'standard' | undefined;
  disableUnderline? : boolean
}

const Input: FunctionComponent<Props> = ({
  placeholder = '',
  variant = 'standard',
  type = 'text',
  onChange,
  onKeyDown,
  value = '',
  disableUnderline = true
}) => (
  <TextField
    placeholder={placeholder}
    variant={variant}
    type={type}
    onChange={onChange}
    onKeyDown={onKeyDown}
    value={value}
    InputProps={{ disableUnderline: disableUnderline }}
  />
);

export default Input;
