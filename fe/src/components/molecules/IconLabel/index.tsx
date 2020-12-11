import React, { FunctionComponent } from 'react';
import { StyledIconLabel } from './styled';

interface Props {
  children: React.ReactChild[];
  className?: string;
}

const IconLabel: FunctionComponent<Props> = ({ children, className }) => (
  <StyledIconLabel className={className}>{children}</StyledIconLabel>
);

export default IconLabel;
