import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { PageLayout, TweetContainer, NewTweetContainer } from '@organisms';
import { useInfiniteScroll } from '@hooks';
import { GET_TWEETLIST, ADD_BASIC_TWEET } from '@graphql/tweet';
import { TweetType } from '@types';
import HomeBox from './styled';

const Home: FunctionComponent = () => {
  const [tweetList, setTweetList] = useState<TweetType[]>([]);
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
        {tweetList?.map((tweet: TweetType, index: number) => (
          <TweetContainer key={index} tweet={tweet} updateQuery={GET_TWEETLIST} />
        ))}
      </div>
      <div ref={fetchMoreEl} />
    </PageLayout>
  );
};

export default Home;
