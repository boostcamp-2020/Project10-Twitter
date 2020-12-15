import React, { FunctionComponent, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { Loading, LoadingCircle } from '@molecules';
import { PageLayout, TweetContainer, TweetDetailContainer } from '@organisms';
import { useTypeRouter, useDataWithInfiniteScroll } from '@hooks';
import { initializeApollo, getJWTFromBrowser } from '@libs';
import { TweetType } from '@types';
import { GET_CHILD_TWEETLIST, GET_TWEET_DETAIL } from '@graphql/tweet';

const TweetDetail: FunctionComponent = () => {
  const { type } = useTypeRouter();
  const tweetId = type ? type[0] : '';

  const fetchMoreEl = useRef(null);
  const [data, , loadFinished] = useDataWithInfiniteScroll(
    'tweetId',
    tweetId,
    'oldestTweetId',
    'tweetList',
    GET_CHILD_TWEETLIST,
    fetchMoreEl,
  );

  return (
    <PageLayout>
      <TweetDetailContainer tweetId={tweetId as string} />
      {data ? (
        data.tweetList?.map((tweet: TweetType, index: number) => (
          <TweetContainer
            key={index}
            tweet={tweet}
            updateQuery={{ query: GET_CHILD_TWEETLIST, variables: { tweetId } }}
          />
        ))
      ) : (
        <Loading message="Loading" />
      )}
      <LoadingCircle loadFinished={loadFinished} fetchMoreEl={fetchMoreEl} />
    </PageLayout>
  );
};

export default TweetDetail;

export const getServerSideProps: GetServerSideProps<{}, {}> = async (ctx) => {
  const apolloClient = initializeApollo();
  const { type } = ctx.query;
  const jwt = getJWTFromBrowser(ctx.req, ctx.res);

  await apolloClient.query({
    query: GET_TWEET_DETAIL,
    variables: { tweetId: type?.length ? type[0] : '' },
    context: {
      headers: { cookie: `jwt=${jwt}` },
    },
  });

  await apolloClient.query({
    query: GET_CHILD_TWEETLIST,
    variables: { tweetId: type?.length ? type[0] : '' },
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
