import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useInfiniteScroll } from '@hooks';
import { GET_TWEETLIST } from '@graphql/tweet';

const THIRTY_SECONDS = 30 * 1000;

const useHomeTweetInfiniteScroll = (
  fetchMoreEl: React.RefObject<HTMLDivElement>,
): [
  any,
  React.Dispatch<React.SetStateAction<boolean>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const { data, fetchMore } = useQuery(GET_TWEETLIST);
  const { _id: topTweetId } = data?.tweetList[0] || {};
  const { _id: bottomTweetId } = data?.tweetList[data?.tweetList.length - 1] || {};
  useQuery(GET_TWEETLIST, {
    variables: { latestTweetId: topTweetId },
    pollInterval: THIRTY_SECONDS,
  });

  const [intersecting, setIntersecting, loadFinished, setLoadFinished] = useInfiniteScroll(
    fetchMoreEl,
  );

  useEffect(() => {
    const asyncEffect = async () => {
      if (!intersecting || loadFinished || !fetchMore) return;
      const { data: fetchMoreData } = await fetchMore({
        variables: { oldestTweetId: bottomTweetId },
      });
      if (!fetchMoreData) setIntersecting(false);
      if (fetchMoreData.tweetList.length < 20) setLoadFinished(true);
    };
    asyncEffect();
  }, [intersecting]);

  return [data, setIntersecting, loadFinished, setLoadFinished];
};

export default useHomeTweetInfiniteScroll;
