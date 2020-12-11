import React, { FunctionComponent } from 'react';
import UserInfo from '../../../molecules/UserInfo';
import { BodyContainer, Container } from './styled';

interface Props {
  user: {
    user_id: string;
    name: string;
    profile_img_url?: string;
    comment?: string;
  };
}

const FollowContainer: FunctionComponent<Props> = ({ user }) => {
  return (
    <Container>
      <UserInfo img={user.profile_img_url} title={user.user_id} sub="" />
      <BodyContainer> followed you</BodyContainer>
    </Container>
  );
};

export default FollowContainer;
