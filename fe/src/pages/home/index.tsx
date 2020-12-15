import React, { FunctionComponent, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { PageLayout, TweetContainer, NewTweetContainer } from '@organisms';
import { useHomeTweetListInfiniteScroll } from '@hooks';
import { GET_TWEETLIST, ADD_BASIC_TWEET } from '@graphql/tweet';
import { TweetType } from '@types';
import { apolloClient, getJWTFromBrowser } from '@libs';
import HomeBox from './styled';

const Home: FunctionComponent = () => {
  const [addBasicTweet] = useMutation(ADD_BASIC_TWEET);
  const fetchMoreEl = useRef(null);
  const [data] = useHomeTweetListInfiniteScroll(fetchMoreEl);

  return (
    <PageLayout>
      <HomeBox>Home</HomeBox>
      <NewTweetContainer onClickQuery={addBasicTweet} />
      <div>
        {data?.tweetList?.map((tweet: TweetType, index: number) => (
          <TweetContainer key={index} tweet={tweet} updateQuery={GET_TWEETLIST} />
        ))}
      </div>
      <div ref={fetchMoreEl} />
    </PageLayout>
  );
};

export default Home;

export async function getServerSideProps({ req, res }) {
  const jwt = getJWTFromBrowser(req, res);

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
}
