import React, { FunctionComponent } from 'react';
import { Box } from '@material-ui/core';
import Text from '../../atoms/Text';

interface Props {
  title: string;
  sub: string;
  className?: string;
}

const TitleSubText: FunctionComponent<Props> = ({ title, sub, className }) => (
  <Box component="div" className={className}>
    <Text styled="title" value={title} />
    <Text styled="sub" value={sub} />
  </Box>
);

export default TitleSubText;
