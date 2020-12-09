/* eslint-disable react/no-array-index-key */
import React, { FunctionComponent, useState, useEffect, useRef } from 'react'[import { useQuery, useMutation } from '@apollo/client';
import NewTweetContainer from '../../components/organisms/NewTweetContainer';
import PageLayout from '../../components/organisms/PageLayout';
import HomeBox from './styled';
import GET_TWEETLIST from '../../graphql/getTweetList.gql';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import apolloClient from '../../libs/apolloClient';
import TweetContainer from '../../components/organisms/TweetContainer';
import ADD_BASIC_TWEET from '../../graphql/addBasicTweet.gql';

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
  const [addBasicTweet, { loading: mutationLoading, error: mutationError }] = useMutation(
    ADD_BASIC_TWEET,
  );

  useEffect(() => {
    if (data?.tweetList) setTweetList(data?.tweetList);
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
      <NewTweetContainer onClickQuery={addBasicTweet} />
      <div>
        {tweetList?.map((tweet: Tweet, index: number) => (
          <TweetContainer tweet={tweet} />
        ))}
      </div>
      <div ref={fetchMoreEl} />
    </PageLayout>
  );
};

export default Home;
