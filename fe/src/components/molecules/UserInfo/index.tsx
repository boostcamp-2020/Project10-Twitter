import React, { FunctionComponent } from 'react';
import Container from './styled';
import TitleSubText from '../TitleSubText';
import ProfileImg from '../../atoms/ProfileImg';

interface Props {
  onClick?: () => void;
  img?: string;
  title: string;
  sub: string;
  inRow?: boolean;
  width?: string;
}

const UserInfo: FunctionComponent<Props> = ({
  onClick = () => {},
  img,
  title,
  sub,
  inRow,
  width = '',
}) => (
  <Container component="div" onClick={onClick} width={width}>
    <ProfileImg img={img} />
    <TitleSubText title={title} sub={sub} inRow={inRow} />
  </Container>
);

export default UserInfo;
