import React, { FunctionComponent } from 'react';
import Profile from './styled';

interface Props {
  img?: string;
  size?: number;
  onClick?: () => void;
}

const ProfileImg: FunctionComponent<Props> = ({
  img = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  onClick = () => {},
  size = 50,
}) => <Profile alt="user" style = { {width : `${size}px` , height : `${size}px`}}  src={img} onClick={onClick} />;

export default ProfileImg;
