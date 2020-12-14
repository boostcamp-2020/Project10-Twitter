import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Loading } from '@molecules';
import { PageLayout, TweetContainer, TweetDetailContainer } from '@organisms';
import { useInfiniteScroll } from '@hooks';
import { initializeApollo } from '@libs';
import { TweetType, QueryVariableType } from '@types';

import { GET_CHILD_TWEETLIST } from '@graphql/tweet';

const UserDetail: FunctionComponent = () => {
  const apolloClient = initializeApollo();
  const router = useRouter();
  const { type } = router.query;
  const tweetId = type ? type[0] : '';
  const queryVariable: QueryVariableType = { variables: { tweetId: tweetId as string } };
  const { loading, error, data, fetchMore } = useQuery(GET_CHILD_TWEETLIST, queryVariable);
  const { _id: bottomTweetId } = data?.tweetList[data?.tweetList.length - 1] || {};
  const fetchMoreEl = useRef(null);
  const [intersecting, loadFinished, setLoadFinished] = useInfiniteScroll(fetchMoreEl);

  useEffect(() => {
    apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: 'child_tweet_list' });
  }, [tweetId]);

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
      <TweetDetailContainer tweetId={tweetId as string} />
      {data ? (
        data.tweetList?.map((tweet: TweetType, index: number) => (
          <TweetContainer key={index} tweet={tweet} updateQuery={GET_CHILD_TWEETLIST} />
        ))
      ) : (
        <Loading message="Loading" />
      )}
      <div ref={fetchMoreEl} />
    </PageLayout>
  );
};

export default UserDetail;
