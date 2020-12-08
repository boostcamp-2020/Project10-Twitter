import React, { FunctionComponent, ReactChild } from 'react';
import { IconButton as MaterialIconButton, SvgIcon } from '@material-ui/core';

interface Props {
  className?: string;
  onClick?: () => void;
  label?: string;
  icon: FunctionComponent;
}

const IconButton: FunctionComponent<Props> = ({ className, onClick, label = '', icon }) => (
  <MaterialIconButton className={className} onClick={onClick} aria-label={label}>
    <SvgIcon component={icon} />
  </MaterialIconButton>
);

export default IconButton;
