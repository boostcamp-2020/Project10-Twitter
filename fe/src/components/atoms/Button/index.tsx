import React, { FunctionComponent } from 'react';
import { Button as MaterialButton } from '@material-ui/core';

interface Props {
  color?: 'primary' | 'secondary' | 'inherit' | 'default' | undefined;
  variant?: 'contained' | 'text' | 'outlined' | undefined;
  text: string;
  onClick?: () => void;
}

const Button: FunctionComponent<Props> = ({
  color = undefined,
  variant = undefined,
  text,
  onClick,
}) => (
  <MaterialButton color={color} variant={variant} onClick={onClick}>
    {text}
  </MaterialButton>
);

export default Button;
