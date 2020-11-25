import React, { FunctionComponent } from 'react';
import { Box } from '@material-ui/core';
import Text from '../../atoms/Text';

interface Props {
  title: string;
  sub: string;
  inRow?: boolean;
}

const TitleSubText: FunctionComponent<Props> = ({ title, sub, inRow = true }) => (
  <Box component="div">
    <Text styled="title" value={title} />
    {!inRow ? <br /> : <span>&nbsp;</span>}
    <Text styled="sub" value={sub} />
  </Box>
);

export default TitleSubText;
