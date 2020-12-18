import React, { FunctionComponent } from 'react';
import { Box } from '@material-ui/core';
import { Text } from '@atoms';

interface Props {
  title: string;
  sub: string;
  className?: string;
  onClick?: () => void;
}

const TitleSubText: FunctionComponent<Props> = ({ title, sub, className, onClick }) => (
  <Box component="div" className={className} onClick={onClick}>
    <Text styled="title" value={title} />
    <Text styled="sub" value={sub} />
  </Box>
);

export default TitleSubText;
