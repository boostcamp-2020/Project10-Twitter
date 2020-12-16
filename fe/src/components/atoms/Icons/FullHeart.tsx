import React, { FunctionComponent } from 'react';
import { SvgIcon } from '@material-ui/core';
import styled from 'styled-components';

interface StyledProps {
  width?: string;
  height?: string;
}

const SvgContainer = styled(SvgIcon)`
  width: ${(props) => props.width} !important;
  height: ${(props) => props.height} !important;
  fill: #cc3366 !important;
`;

const FullHeartIcon: FunctionComponent<StyledProps> = ({ width, height }) => (
  <SvgContainer width={width} height={height}>
    <path d="M 12 21.638 h -0.014 C 9.403 21.59 1.95 14.856 1.95 8.478 c 0 -3.064 2.525 -5.754 5.403 -5.754 c 2.29 0 3.83 1.58 4.646 2.73 c 0.814 -1.148 2.354 -2.73 4.645 -2.73 c 2.88 0 5.404 2.69 5.404 5.755 c 0 6.376 -7.454 13.11 -10.037 13.157 H 12 Z" />
  </SvgContainer>
);

export default FullHeartIcon;
