import React, { FunctionComponent, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { TabBar, ComponentLoading, LoadingCircle } from '@molecules';
import { PageLayout, TweetContainer, UserDetailContainer } from '@organisms';
import { useDataWithInfiniteScroll, useTypeRouter } from '@hooks';
import { initializeApollo, getJWTFromBrowser } from '@libs';
import { GET_USER_TWEETLIST, GET_USER_ALL_TWEETLIST, GET_HEART_TWEETLIST } from '@graphql/tweet';
import DETAIL_PAGE from '@graphql/custom';
import { TweetType } from '@types';

const UserDetail: FunctionComponent = () => {
  const apolloClient = initializeApollo();
  const { type, userId, router } = useTypeRouter();
  const value = type ? type[0] : 'tweets';

  const fetchMoreEl = useRef(null);
  const keyValue = {
    tweets: ['userId', userId, 'oldestTweetId', 'tweetList', GET_USER_TWEETLIST, fetchMoreEl],
    'tweets & replies': [
      'userId',
      userId,
      'oldestTweetId',
      'tweetList',
      GET_USER_ALL_TWEETLIST,
      fetchMoreEl,
    ],
    likes: ['userId', userId, 'oldestTweetId', 'tweetList', GET_HEART_TWEETLIST, fetchMoreEl],
  };
  const [data, setIntersecting, loadFinished, setLoadFinished] = useDataWithInfiniteScroll(
    ...keyValue[value],
  );

  const onClick = (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    let newValue = target.textContent;
    if (newValue !== value) {
      if (newValue === 'tweets') newValue = '';
      router.replace('/[userId]/[type]', `/${userId}/${newValue}`, { shallow: true });
      setLoadFinished(false);
      setIntersecting(false);
    }
  };
  useEffect(() => {
    apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: 'user_all_tweet_list' });
    apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: 'heart_tweet_list' });
  }, [userId]);

  return (
    <PageLayout>
      <UserDetailContainer userId={userId as string} />
      <TabBar
        value={value}
        handleChange={onClick}
        labels={['tweets', 'tweets & replies', 'likes']}
      />
      <div>
        {data ? (
          data.tweetList?.map((tweet: TweetType, index: number) => (
            <TweetContainer key={index} tweet={tweet} updateQuery={{ query: keyValue[value][4] }} />
          ))
        ) : (
          <ComponentLoading />
        )}
      </div>
      <LoadingCircle loadFinished={loadFinished} fetchMoreEl={fetchMoreEl} />
    </PageLayout>
  );
};

export default UserDetail;

export const getServerSideProps: GetServerSideProps<{}, {}> = async (ctx) => {
  const jwt = getJWTFromBrowser(ctx.req, ctx.res);
  const apolloClient = initializeApollo();
  const { userId } = ctx.query || {};

  const { data } = await apolloClient.query({
    query: DETAIL_PAGE,
    variables: { userId },
    context: {
      headers: { cookie: `jwt=${jwt}` },
    },
  });
  if (!data.user) {
    return {
      notFound: true,
    };
  }
  const initialState = apolloClient.cache.extract();

  return {
    props: {
      initialState,
    },
  };
};
