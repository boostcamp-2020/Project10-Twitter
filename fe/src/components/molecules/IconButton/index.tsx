import React, { FunctionComponent, ReactChild } from 'react';
import { IconButton as MaterialIconButton, SvgIcon } from '@material-ui/core';

interface Props {
  onClick?: () => void;
  label?: string;
  icon: FunctionComponent;
}

const IconButton: FunctionComponent<Props> = ({ onClick, label = '', icon }) => (
  <MaterialIconButton onClick={onClick} aria-label={label}>
    <SvgIcon component={icon} />
  </MaterialIconButton>
);

export default IconButton;
