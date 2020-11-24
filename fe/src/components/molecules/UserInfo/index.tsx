import React, { FunctionComponent } from 'react';
import { Box } from '@material-ui/core';
import TitleSubText from '../TitleSubText';
import ProfileImg from '../../atoms/ProfileImg';

interface Props {
  img?: string;
  title: string;
  sub: string;
  inRow?: boolean;
}

const UserInfo: FunctionComponent<Props> = ({ img, title, sub, inRow }) => (
  <Box component="div" display="flex" alignItems="center">
    <ProfileImg img={img} />
    <TitleSubText title={title} sub={sub} inRow={inRow} />
  </Box>
);

export default UserInfo;
