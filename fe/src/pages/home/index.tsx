/* eslint-disable react/no-array-index-key */
import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import NewTweetContainer from '../../components/organisms/NewTweetContainer';
import TweetStateContainer from '../../components/organisms/TweetStateContainer';
import PageLayout from '../../components/organisms/PageLayout';
import HomeBox from './styled';
import GET_TWEETLIST from '../../graphql/getTweetList.gql';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import apolloClient from '../../libs/apolloClient';

interface Tweet {
  _id: string;
  content: string;
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
  author: Author;
  retweet_id: string;
  retweet: Tweet;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const Home: FunctionComponent = () => {
  const [tweetList, setTweetList] = useState<Tweet[]>([]);
  const { loading, error, data, fetchMore } = useQuery(GET_TWEETLIST);
  const fetchMoreEl = useRef(null);
  const [intersecting, loadFinished, setLoadFinished] = useInfiniteScroll(fetchMoreEl);
  const { _id: bottomTweetId } = tweetList[tweetList.length - 1] || {};
  const { _id: topTweetId } = tweetList[0] || {};

  useEffect(() => {
    const fetchLatestTweet = async () => {
      console.log(topTweetId);
      const { data: fetchMoreData } = await fetchMore({
        variables: { latestTweetId: topTweetId },
      });
    };
    setInterval(() => {
      fetchLatestTweet();
    }, 1000 * 5);
  }, []);

  useEffect(() => {
    const tweetList = data?.tweetList;
    if (tweetList) setTweetList(tweetList);
  }, [data?.tweetList]);

  useEffect(() => {
    const asyncEffect = async () => {
      if (!intersecting || loadFinished || !bottomTweetId) return;
      const { data: fetchMoreData } = await fetchMore({
        variables: { oldestTweetId: bottomTweetId },
      });
      if (fetchMoreData.tweetList.length < 20) setLoadFinished(true);
    };
    asyncEffect();
  }, [intersecting]);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error!
        {error.message}
      </div>
    );

  return (
    <PageLayout>
      <HomeBox>Home</HomeBox>
      <NewTweetContainer />
      <div>
        {tweetList?.map((tweet: Tweet, index: number) => (
        <TweetStateContainer tweet={tweet} />
      ))}
      </div>
      <div ref={fetchMoreEl} />
    </PageLayout>
  );
};

export default Home;
