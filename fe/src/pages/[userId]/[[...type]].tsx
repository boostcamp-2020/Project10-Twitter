import React, { FunctionComponent, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import PageLayout from '../../components/organisms/PageLayout';
import TabBar from '../../components/molecules/TabBar';
import { Container, MainContainer } from './styled';
import TweetContainer from '../../components/organisms/TweetContainer';
import UserDetailContainer from '../../components/organisms/UserDetailContainer';
import GET_USER_TWEETLIST from '../../graphql/getUserTweetList.gql';
import GET_USER_ALL_TWEETLIST from '../../graphql/getUserAllTweetList.gql';
import GET_HEART_TWEETLIST from '../../graphql/getHeartTweetList.gql';

interface QueryVariable {
  variables: Variable;
}

interface Variable {
  userId: string;
}

interface Tweet {
  _id: string;
  content: string;
  author: Author;
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
  retweet: Tweet;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const UserDetail: FunctionComponent = () => {
  const router = useRouter();
  const { userId, type } = router.query;
  const queryArr = {
    tweets: GET_USER_TWEETLIST,
    'tweets & replies': GET_USER_ALL_TWEETLIST,
    likes: GET_HEART_TWEETLIST,
  };
  const queryVariable: QueryVariable = { variables: { userId: userId as string } };
  const value = type ? type[0] : 'tweets';
  const { loading, error, data, refetch } = useQuery(queryArr[value], queryVariable);

  const onClick = (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    let newValue = target.textContent;
    if (newValue !== value) {
      if (newValue === 'tweets') newValue = '';
      router.replace('/[userId]/[type]', `/${userId}/${newValue}`, { shallow: true });
    }
  };

  return (
    <PageLayout>
      <UserDetailContainer userId={userId as string} />
      <TabBar
        value={value}
        handleChange={onClick}
        labels={['tweets', 'tweets & replies', 'likes']}
      />
      {data ? (
        data.tweetList?.map((tweet: Tweet, index: number) => (
          <TweetContainer key={index} tweet={tweet} />
        ))
      ) : (
        <>loading..</>
      )}
    </PageLayout>
  );
};

export default UserDetail;
