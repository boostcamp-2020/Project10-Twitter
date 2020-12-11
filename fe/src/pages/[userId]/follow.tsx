/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { FunctionComponent, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import TabBar from '../../components/molecules/TabBar';
import PageLayout from '../../components/organisms/PageLayout';
import UserCard from '../../components/organisms/UserCard';
import GET_FOLLOWINGLIST from '../../graphql/getFollowingList.gql';
import GET_FOLLOWERLIST from '../../graphql/getFollowerList.gql';
import { UserBox } from './styled';
import TitleSubText from '../../components/molecules/TitleSubText';
import useOnTabChange from '../../hooks/useOnTabChange';

interface QueryVariable {
  variables: Variable;
}

interface Variable {
  userId: string;
}

interface User {
  user_id: string;
  name: string;
  profile_img_url?: string;
  comment?: string;
  following_user?: User;
}

const Follow: FunctionComponent = () => {
  const router = useRouter();
  const { userId } = router.query;
  const queryArr = { Follower: GET_FOLLOWERLIST, Following: GET_FOLLOWINGLIST };
  const queryVariable: QueryVariable = { variables: { userId: userId as string } };
  const param = router.asPath.split('?')[1] || 'Follower';
  const [value, , onChange] = useOnTabChange(param);
  const { loading, error, data } = useQuery(queryArr[value], queryVariable);

  useEffect(() => {
    router.replace(`/[userId]/follow`, `/${userId}/follow?${value}`, { shallow: true });
  }, [value]);

  return (
    <PageLayout>
      <UserBox>
        <TitleSubText title={userId as string} sub={userId as string} />
      </UserBox>
      <TabBar value={value} handleChange={onChange} labels={['Follower', 'Following']} />
      {data ? (
        data.list?.map((user: User, index: number) =>
          user.following_user ? (
            <UserCard key={index} user={user.following_user} />
          ) : (
            <UserCard key={index} user={user} />
          ),
        )
      ) : (
        <>loading..</>
      )}
    </PageLayout>
  );
};

export default Follow;
