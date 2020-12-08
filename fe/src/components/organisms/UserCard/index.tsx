import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import useUserState from '../../../hooks/useUserState';
import UserInfo from '../../molecules/UserInfo';
import Button from '../../molecules/Button';
import Text from '../../atoms/Text';
import Container from './styled';
import { getJSXwithUserState } from '../../../utilitys';

interface User {
  user_id: string;
  name: string;
  profile_img_url?: string;
  comment?: string;
  following_id_list?: string[];
}

interface Props {
  user: User;
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
        <></>,
        <Button text="unfollow" color="primary" variant="contained" onClick={onClickUnfollow} />,
        <Button text="follow" color="primary" variant="outlined" onClick={onClickFollow} />,
      )}
    </Container>
  );
};

export default UserCard;
