import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import NewTweetContainer from '../../components/organisms/NewTweetContainer';
import TweetStateContainer from '../../components/organisms/TweetStateContainer';
import PageLayout from '../../components/organisms/PageLayout';
import HomeBox from './styled';
import GET_TWEETLIST from '../../graphql/getTweetList.gql';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

interface Tweet {
  _id: string;
  content: string;
  child_tweet_number: number;
  img_url_list: [string];
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
  const { _id: bottomTweetId } = tweetList[tweetList.length - 1] || {};
  const { _id: topTweetId } = tweetList[0] || {};
  const { loading, error, data, fetchMore } = useQuery(GET_TWEETLIST, {
    variables: { latestTweetId: topTweetId },
    pollInterval: 500,
  });
  const fetchMoreEl = useRef(null);
  const [intersecting, loadFinished, setLoadFinished] = useInfiniteScroll(fetchMoreEl);

  useEffect(() => {
    const tweetList = data?.tweetList;
    if (tweetList) setTweetList(tweetList);
  }, [data?.tweetList]);

  useEffect(() => {
    const asyncEffect = async () => {
      if (!intersecting || loadFinished || !bottomTweetId || !fetchMore) return;
      const { data: fetchMoreData } = await fetchMore({
        variables: { oldestTweetId: bottomTweetId },
      });
      if (fetchMoreData.tweetList.length < 20) setLoadFinished(true);
    };
    asyncEffect();
  }, [intersecting]);

  return (
    <PageLayout>
      <HomeBox>Home</HomeBox>
      <NewTweetContainer />
      <div>
        {tweetList?.map((tweet: Tweet, index: number) => (
          <TweetStateContainer key={index} tweet={tweet} />
        ))}
      </div>
      <div ref={fetchMoreEl} />
    </PageLayout>
  );
};

export default Home;
