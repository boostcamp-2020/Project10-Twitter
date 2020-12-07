/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { FunctionComponent, useState } from 'react';
import { useQuery } from '@apollo/client';
import NewTweetContainer from '../../components/organisms/NewTweetContainer';
import TweetContainer from '../../components/organisms/TweetContainer';
import PageLayout from '../../components/organisms/PageLayout';
import HomeBox from './styled';
import GET_TWEETLIST from '../../graphql/getTweetList.gql';

interface Tweet {
  _id: string;
  content: string;
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
  author: Author;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const Home: FunctionComponent = () => {
  const { loading, error, data } = useQuery(GET_TWEETLIST);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error!
        {error.message}
      </div>
    );

  const { tweetList } = data;

  return (
    <PageLayout>
      <HomeBox>Home</HomeBox>
      <NewTweetContainer />
      {tweetList?.map((tweet: Tweet, index: number) => (
        <TweetContainer key={index} tweet={tweet} />
      ))}
    </PageLayout>
  );
};

export default Home;
