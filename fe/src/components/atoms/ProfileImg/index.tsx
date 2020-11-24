import React, { FunctionComponent } from 'react';
import { Avatar } from '@material-ui/core';

interface Props {
  img?: string;
}

const ProfileImg: FunctionComponent<Props> = ({
  img = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
}) => <Avatar alt="user" src={img} />;

export default ProfileImg;
