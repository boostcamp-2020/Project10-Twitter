import React, { FunctionComponent } from 'react';
import Profile from './styled';

interface Props {
  img?: string;
  onClick?: () => void;
}

const ProfileImg: FunctionComponent<Props> = ({
  img = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  onClick = () => {},
}) => <Profile alt="user" src={img} onClick={onClick} />;

export default ProfileImg;
