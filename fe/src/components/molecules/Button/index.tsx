import React, { FunctionComponent, ReactNode } from 'react';
import { Button as MaterialButton } from '@material-ui/core';

interface Props {
  className?: string;
  color?: 'primary' | 'secondary' | 'inherit' | 'default' | undefined;
  variant?: 'contained' | 'text' | 'outlined' | undefined;
  text: string | number;
  onClick?: () => void;
  icon?: ReactNode;
  isStart?: true;
  borderRadius?: number;
  width?: string;
  disabled?: boolean;
}

const Button: FunctionComponent<Props> = ({
  className,
  color = undefined,
  variant = undefined,
  text,
  onClick,
  icon = undefined,
  isStart = true,
  borderRadius = 15,
  width = '',
  disabled = false,
}) =>
  isStart ? (
    <MaterialButton
      className={className}
      style={{ borderRadius, width }}
      color={color}
      variant={variant}
      onClick={onClick}
      startIcon={icon}
      disabled={disabled}
    >
      {text}
    </MaterialButton>
  ) : (
    <MaterialButton
      style={{ borderRadius, width }}
      color={color}
      variant={variant}
      onClick={onClick}
      endIcon={icon}
      disabled={disabled}
    >
      {text}
    </MaterialButton>
  );

export default Button;
