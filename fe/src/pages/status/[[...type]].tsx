import React, { FunctionComponent, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { Loading } from '@molecules';
import { PageLayout, TweetContainer, TweetDetailContainer } from '@organisms';
import { useTypeRouter, useDataWithInfiniteScroll } from '@hooks';
import { initializeApollo, getJWTFromBrowser } from '@libs';
import { TweetType } from '@types';
import { GET_CHILD_TWEETLIST, GET_TWEET_DETAIL } from '@graphql/tweet';

const TweetDetail: FunctionComponent = () => {
  const apolloClient = initializeApollo();
  const { type } = useTypeRouter();
  const tweetId = type ? type[0] : '';

  const fetchMoreEl = useRef(null);
  const [data] = useDataWithInfiniteScroll(
    'tweetId',
    tweetId,
    'oldestTweetId',
    'tweetList',
    GET_CHILD_TWEETLIST,
    fetchMoreEl,
  );

  useEffect(() => {
    apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: 'child_tweet_list' });
  }, [tweetId]);

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

export default TweetDetail;

export const getServerSideProps: GetServerSideProps<{}, {}> = async (ctx) => {
  const apolloClient = initializeApollo();
  const {
    type: [tweetId],
  } = ctx.query;
  const jwt = getJWTFromBrowser(ctx.req, ctx.res);

  await apolloClient.query({
    query: GET_TWEET_DETAIL,
    variables: { tweetId },
    context: {
      headers: { cookie: `jwt=${jwt}` },
    },
  });

  await apolloClient.query({
    query: GET_CHILD_TWEETLIST,
    variables: { tweetId },
    context: {
      headers: { cookie: `jwt=${jwt}` },
    },
  });
  const initialState = apolloClient.cache.extract();

  return {
    props: {
      initialState,
    },
  };
};
