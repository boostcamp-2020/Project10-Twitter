import React, { FunctionComponent, ReactNode } from 'react';
import { Button as MaterialButton } from '@material-ui/core';

interface Props {
  color?: 'primary' | 'secondary' | 'inherit' | 'default' | undefined;
  variant?: 'contained' | 'text' | 'outlined' | undefined;
  text: string;
  onClick?: () => void;
  icon?: ReactNode;
  isStart?: true;
  borderRadius?: number;
  width?: string;
}

const Button: FunctionComponent<Props> = ({
  color = undefined,
  variant = undefined,
  text,
  onClick,
  icon = undefined,
  isStart = true,
  borderRadius = 15,
  width = '',
}) =>
  isStart ? (
    <MaterialButton
      style={{ borderRadius, width }}
      color={color}
      variant={variant}
      onClick={onClick}
      startIcon={icon}
    >
      {text}
    </MaterialButton>
  ) : (
    <MaterialButton
      style={{ borderRadius }}
      color={color}
      variant={variant}
      onClick={onClick}
      endIcon={icon}
    >
      {text}
    </MaterialButton>
  );

export default Button;
