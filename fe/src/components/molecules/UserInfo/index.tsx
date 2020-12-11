import React, { FunctionComponent } from 'react';
import { Container, StyledTitleSub } from './styled';
import ProfileImg from '../../atoms/ProfileImg';

interface Props {
  onClick?: () => void;
  img?: string;
  title: string;
  sub: string;
  width?: string;
}

const UserInfo: FunctionComponent<Props> = ({
  onClick = () => {},
  img,
  title,
  sub,
  width = '',
}) => (
  <Container component="div" onClick={onClick} width={width}>
    <ProfileImg img={img} />
    <StyledTitleSub title={title} sub={sub} />
  </Container>
);

export default UserInfo;
