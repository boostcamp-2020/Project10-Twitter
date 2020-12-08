/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { FunctionComponent, ReactEventHandler, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import TabBar from '../../../components/molecules/TabBar';
import PageLayout from '../../../components/organisms/PageLayout';
import UserCard from '../../../components/organisms/UserCard';
import GET_FOLLOWINGLIST from '../../../graphql/getFollowingList.gql';
import GET_FOLLOWERLIST from '../../../graphql/getFollowerList.gql';
import { UserBox } from '../styled';
import TitleSubText from '../../../components/molecules/TitleSubText';

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
  const { userId, type } = router.query;
  const queryArr = { follower: GET_FOLLOWERLIST, following: GET_FOLLOWINGLIST };
  const queryVariable: QueryVariable = { variables: { userId: userId as string } };
  const value = type ? type[0] : 'follower';
  const { loading, error, data } = useQuery(queryArr[value], queryVariable);

  const onClick = (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    let newValue = target.textContent;
    if (newValue !== value) {
      if (newValue === 'follower') newValue = '';
      router.replace(`/[userId]/follow/[[...type]]`, `/${userId}/follow/${newValue}`, {
        shallow: true,
      });
    }
  };

  return (
    <PageLayout>
      <UserBox>
        <TitleSubText title={userId as string} sub={userId as string} />
      </UserBox>
      <TabBar value={value} handleChange={onClick} labels={['follower', 'following']} />
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
