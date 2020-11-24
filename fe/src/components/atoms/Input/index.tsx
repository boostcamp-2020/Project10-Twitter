import React, { FunctionComponent } from 'react';
import { TextField } from '@material-ui/core';

interface Props {
  placeholder?: string;
  type?: string;
  variant?: 'filled' | 'outlined' | 'standard' | undefined;
}

const Input: FunctionComponent<Props> = ({ 
  placeholder = '',
  variant = 'standard',
  type = 'text',
}) => <TextField placeholder={placeholder} variant={variant} type={type} />;

export default Input;
