import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import Cookies from 'cookies';
import { GetServerSideProps } from 'next';
import { useQuery, useMutation } from '@apollo/client';
import { PageLayout, TweetContainer, NewTweetContainer } from '@organisms';
import { useInfiniteScroll } from '@hooks';
import { GET_TWEETLIST, ADD_BASIC_TWEET } from '@graphql/tweet';
import { TweetType } from '@types';
import { initializeApollo } from '@libs';
import HomeBox from './styled';

const Home: FunctionComponent = () => {
  const [tweetList, setTweetList] = useState<TweetType[]>([]);
  const { _id: bottomTweetId } = tweetList[tweetList.length - 1] || {};
  const { _id: topTweetId } = tweetList[0] || {};
  const [addBasicTweet] = useMutation(ADD_BASIC_TWEET);
  const { data, fetchMore } = useQuery(GET_TWEETLIST);
  useQuery(GET_TWEETLIST, {
    variables: { latestTweetId: topTweetId },
    pollInterval: 60000,
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

export const getServerSideProps: GetServerSideProps<{}, {}> = async (ctx) => {
  const cookies = new Cookies(ctx.req, ctx.res);
  const reqCookie = cookies.get('jwt');
  const apolloClient = initializeApollo();
  const result = await apolloClient.query({
    query: GET_TWEETLIST,
    context: {
      headers: { cookie: `jwt=${reqCookie}` },
    },
  });
  const initialState = apolloClient.cache.extract();

  return {
    props: {
      initialState,
      stweetList: result.data?.tweetList,
    },
  };
};
