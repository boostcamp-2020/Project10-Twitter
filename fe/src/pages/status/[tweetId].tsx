import React, { FunctionComponent, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import SideBar from '../../components/organisms/SideBar';
import { Container, MainContainer } from './styled';
import TweetContainer from '../../components/organisms/TweetContainer';
import TweetDetailContainer from '../../components/organisms/TweetDetailContainer';
import GET_CHILD_TWEETLIST from '../../graphql/getChildTweetList.gql';

interface QueryVariable {
  variables: Variable;
}

interface Variable {
  tweetId: string;
}

interface Tweet {
  _id: string;
  content: string;
  author: Author;
  img_url_list: [string];
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const UserDetail: FunctionComponent = () => {
  const router = useRouter();
  const { tweetId } = router.query;
  const queryVariable: QueryVariable = { variables: { tweetId: tweetId as string } };
  const { loading, error, data, refetch } = useQuery(GET_CHILD_TWEETLIST, queryVariable);

  return (
    <Container>
      <SideBar />
      <MainContainer>
        <TweetDetailContainer tweetId={tweetId as string} />
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
