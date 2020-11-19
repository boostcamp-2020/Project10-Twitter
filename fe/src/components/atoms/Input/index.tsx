import React, { FunctionComponent } from 'react';
import { TextField } from '@material-ui/core';

interface Props {
  placehonder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FunctionComponent<Props> = ({placehonder='', value, onChange}) => (
  <TextField value={value} placeholder={placehonder} onChange={onChange} />
);

export default Input;
