import React, { FunctionComponent } from 'react';
import { Button } from '@material-ui/core';

interface Props {
  color: 'primary' | 'secondary';
  variant?: 'contained';
  text: string;
  onClick?: () => void;
}

const Button: FunctionComponent<Props> = ({ color, variant = '', text, onClick }) => (
  <Button color={color} variant={variant} onClick={onClick}>
    {text}
  </Button>
);

export default Button;
