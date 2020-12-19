import React, { FunctionComponent } from 'react';
import { ProfileImg } from '@atoms';
import { Container, StyledTitleSub } from './styled';

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
  <Container component="div" onClick={onClick}>
    <ProfileImg img={img} />
    <StyledTitleSub title={title} sub={sub} />
  </Container>
);

export default UserInfo;
