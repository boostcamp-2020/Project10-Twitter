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
`;

const XIcon: FunctionComponent<StyledProps> = ({ width, height }) => (
  <SvgContainer width={width} height={height}>
    <path stroke="black" strokeWidth="2" fill="none" d="M6.25,6.25,17.75,17.75" />
    <path stroke="black" strokeWidth="2" fill="none" d="M6.25,17.75,17.75,6.25" />
  </SvgContainer>
);

export default XIcon;
