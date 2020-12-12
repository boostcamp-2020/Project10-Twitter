import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { PageLayout, TweetContainer, NewTweetContainer } from '@organisms';
import { useInfiniteScroll } from '@hooks';
import HomeBox from './styled';
import GET_TWEETLIST from '../../graphql/getTweetList.gql';
import ADD_BASIC_TWEET from '../../graphql/addBasicTweet.gql';

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
  const [addBasicTweet, { loading: mutationLoading, error: mutationError }] = useMutation(
    ADD_BASIC_TWEET,
  );
  const { loading, error, data, fetchMore } = useQuery(GET_TWEETLIST, {
    variables: { latestTweetId: topTweetId },
    pollInterval: 500,
  });
  const fetchMoreEl = useRef(null);
  const [intersecting, loadFinished, setLoadFinished] = useInfiniteScroll(fetchMoreEl);

  useEffect(() => {
    if (data?.tweetList) setTweetList(data?.tweetList);
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
      <NewTweetContainer onClickQuery={addBasicTweet} />
      <div>
        {tweetList?.map((tweet: Tweet, index: number) => (
          <TweetContainer key={index} tweet={tweet} updateQuery={GET_TWEETLIST} />
        ))}
      </div>
      <div ref={fetchMoreEl} />
    </PageLayout>
  );
};

export default Home;
