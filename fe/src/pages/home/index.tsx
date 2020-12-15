import React, { FunctionComponent, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { PageLayout, TweetContainer, NewTweetContainer } from '@organisms';
import { useHomeTweetListInfiniteScroll } from '@hooks';
import { GET_TWEETLIST, ADD_BASIC_TWEET } from '@graphql/tweet';
import { TweetType } from '@types';
import { initializeApollo, getJWTFromBrowser } from '@libs';
import { LoadingCircle } from '@molecules';
import HomeBox from './styled';

const Home: FunctionComponent = () => {
  const [addBasicTweet] = useMutation(ADD_BASIC_TWEET);
  const fetchMoreEl = useRef(null);

  const [data, , loadFinished] = useHomeTweetListInfiniteScroll(fetchMoreEl);

  return (
    <PageLayout>
      <HomeBox>Home</HomeBox>
      <NewTweetContainer onClickQuery={addBasicTweet} />
      <div>
        {data?.tweetList?.map((tweet: TweetType, index: number) => (
          <TweetContainer key={index} tweet={tweet} updateQuery={{ query: GET_TWEETLIST }} />
        ))}
      </div>
      <LoadingCircle loadFinished={loadFinished} fetchMoreEl={fetchMoreEl} />
    </PageLayout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<{}, {}> = async (ctx) => {
  const apolloClient = initializeApollo();
  const jwt = getJWTFromBrowser(ctx.req, ctx.res);
  await apolloClient.query({
    query: GET_TWEETLIST,
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
