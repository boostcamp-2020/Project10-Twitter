/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { FunctionComponent, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import TabBar from '../../components/molecules/TabBar';
import TweetContainer from '../../components/organisms/TweetContainer';
import PageLayout from '../../components/organisms/PageLayout';
import GET_FOLLOWINGLIST from '../../graphql/getFollowingList.gql';
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
  userId: string;
  name: string;
  profileImgUrl?: string;
  comment?: string;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const Follow: FunctionComponent = () => {
  const router = useRouter();
  const { userId } = router.query;
  const queryArr = [GET_FOLLOWINGLIST];
  const queryVariable: QueryVariable = { variables: { userId: userId as string } };
  const [value, , onChange] = useOnTabChange(0);
  const { loading, error, data } = useQuery(queryArr[value], queryVariable);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error!
        {error.message}
      </div>
    );

  const { followList } = data;

  return (
    <PageLayout>
      <UserBox>
        <TitleSubText title={userId as string} sub={userId as string} />
      </UserBox>
      <TabBar value={value} handleChange={onChange} labels={['Follwer', 'Follwing']} />
      {followList?.map((user: User, index: number) => (
        <TweetContainer key={index} tweet={user} />
      ))}
    </PageLayout>
  );
};

export default Follow;
