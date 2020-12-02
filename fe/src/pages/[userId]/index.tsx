/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { FunctionComponent, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import SideBar from '../../components/organisms/SideBar';
import TabBar from '../../components/molecules/TabBar';
import { Container, MainContainer } from './styled';
import TweetContainer from '../../components/organisms/TweetContainer';
import UserDetailContainer from '../../components/organisms/UserDetailContainer';
import GET_USER_TWEETLIST from '../../graphql/getUserTweetList.gql';
import GET_USER_ALL_TWEETLIST from '../../graphql/getUserAllTweetList.gql';
import useOnTabChange from '../../hooks/useOnTabChange';

interface QueryVariable {
  variables: Variable;
}

interface Variable {
  userId: string;
}

interface Tweet {
  content: string;
  author: Author;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const UserDetail: FunctionComponent = () => {
  const router = useRouter();
  const { userId } = router.query;
  const queryArr = [GET_USER_TWEETLIST, GET_USER_ALL_TWEETLIST];
  const queryVariable: QueryVariable = { variables: { userId: userId as string } };
  const [value, , onChange] = useOnTabChange(0);
  const { loading, error, data, refetch } = useQuery(queryArr[value], queryVariable);

  return (
    <Container>
      <SideBar />
      <MainContainer>
        <UserDetailContainer userId={userId as string} />
        <TabBar value={value} handleChange={onChange} labels={['tweets', 'tweets & replies']} />
        {data ? (
          data.tweetList?.map((tweet: Tweet, index: number) => (
            <TweetContainer key={index} tweet={tweet} />
          ))
        ) : (
          <>loading..</>
        )}
      </MainContainer>
    </Container>
  );
};

export default UserDetail;
