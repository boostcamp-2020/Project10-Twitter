import React, { FunctionComponent, ReactChild } from 'react';
import { IconButton as MaterialIconButton, SvgIcon } from '@material-ui/core';

interface Props {
  label: string;
  icon: FunctionComponent;
}

const IconButton: FunctionComponent<Props> = ({ label, icon }) => (
  <MaterialIconButton aria-label={label}>
    <SvgIcon component={icon} />
  </MaterialIconButton>
);

export default IconButton;
