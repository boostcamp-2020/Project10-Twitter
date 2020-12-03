import React, { FunctionComponent } from 'react';
import UserInfo from '../../molecules/UserInfo';
import Button from '../../molecules/Button';
import Text from '../../atoms/Text';
import Container from './styled';

interface User {
  user_id: string;
  name: string;
  profile_img_url?: string;
  comment?: string;
}

interface Props {
  user: User;
}

const UserCard: FunctionComponent<Props> = ({ user }) => (
  <Container>
    <UserInfo img={user.profile_img_url} title={user.user_id} sub={user.name} />
    <Text value={user.comment ? user.comment : ''} />
    <Button text="follow" color="primary" variant="outlined" />
  </Container>
);

export default UserCard;
