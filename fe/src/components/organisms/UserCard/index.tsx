import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import UserInfo from '../../molecules/UserInfo';
import Button from '../../molecules/Button';
import Text from '../../atoms/Text';
import Container from './styled';
import GET_MYINFO from '../../../graphql/getMyInfo.gql';

interface User {
  user_id: string;
  name: string;
  profile_img_url?: string;
  comment?: string;
}

interface Props {
  user: User;
}

const UserCard: FunctionComponent<Props> = ({ user }) => {
  const { loading, error, data } = useQuery(GET_MYINFO);

  return (
    <Link href={`/${user.user_id}`}>
      <Container>
        <UserInfo img={user.profile_img_url} title={user.name} sub={user.user_id} />
        <Text value={user.comment ? user.comment : ''} />
        {data.myProfile.following_id_list.includes(user.user_id) ? (
          <Button text="unfollow" color="primary" variant="contained" />
        ) : data.myProfile.user_id != user.user_id ? (
          <Button text="follow" color="primary" variant="outlined" />
        ) : (
          <></>
        )}
      </Container>
    </Link>
  );
};

export default UserCard;
