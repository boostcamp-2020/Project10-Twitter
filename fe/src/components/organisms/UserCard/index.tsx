import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { UserInfo, Button } from '@molecules';
import { Text } from '@atoms';
import { useUserState } from '@hooks';
import { getJSXwithUserState } from '@libs';
import { UserType } from '@types';
import { Container, EmptyDiv } from './styled';

interface Props {
  user: UserType;
}

const UserCard: FunctionComponent<Props> = ({ user }) => {
  const [userState, onClickFollow, onClickUnfollow] = useUserState(user);

  return (
    <Container>
      <Link href={`/${user.user_id}`}>
        <UserInfo img={user.profile_img_url} title={user.name} sub={user.user_id} />
      </Link>
      <Link href={`/${user.user_id}`}>
        <Text value={user.comment ? user.comment : ''} />
      </Link>
      {getJSXwithUserState(
        userState,
        <EmptyDiv />,
        <Button text="unfollow" color="primary" variant="contained" onClick={onClickUnfollow} />,
        <Button text="follow" color="primary" variant="outlined" onClick={onClickFollow} />,
      )}
    </Container>
  );
};

export default UserCard;
