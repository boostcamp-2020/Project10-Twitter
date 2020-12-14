import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useInfiniteScroll } from '@hooks';
import { GET_TWEETLIST } from '@graphql/tweet';

const useHomeTweetInfiniteScroll = (fetchMoreEl: React.MutableRefObject<null>) => {
  const { data, fetchMore } = useQuery(GET_TWEETLIST);
  const { _id: topTweetId } = data?.tweetList[0] || {};
  const { _id: bottomTweetId } = data?.tweetList[data?.tweetList.length - 1] || {};
  useQuery(GET_TWEETLIST, {
    variables: { latestTweetId: topTweetId },
    pollInterval: 60 * 1000,
  });

  const [intersecting, loadFinished, setLoadFinished] = useInfiniteScroll(fetchMoreEl);

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

  return [data];
};

export default useHomeTweetInfiniteScroll;
