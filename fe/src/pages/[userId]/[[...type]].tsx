import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { TabBar, ComponentLoading } from '@molecules';
import { PageLayout, TweetContainer, UserDetailContainer } from '@organisms';
import { useInfiniteScroll } from '@hooks';
import { apolloClient } from '@libs';
import { GET_USER_TWEETLIST, GET_USER_ALL_TWEETLIST, GET_HEART_TWEETLIST } from '@graphql/tweet';
import { TweetType, QueryVariableType } from '@types';

const UserDetail: FunctionComponent = () => {
  const router = useRouter();
  const { userId, type } = router.query;
  const queryArr = {
    tweets: GET_USER_TWEETLIST,
    'tweets & replies': GET_USER_ALL_TWEETLIST,
    likes: GET_HEART_TWEETLIST,
  };
  const queryVariable: QueryVariableType = { variables: { userId: userId as string } };
  const value = type ? type[0] : 'tweets';
  const { loading, error, data, fetchMore } = useQuery(queryArr[value], queryVariable);
  const { _id: bottomTweetId } = data?.tweetList[data?.tweetList.length - 1] || {};
  const fetchMoreEl = useRef(null);
  const [intersecting] = useInfiniteScroll(fetchMoreEl);

  const onClick = (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    let newValue = target.textContent;
    if (newValue !== value) {
      if (newValue === 'tweets') newValue = '';
      router.replace('/[userId]/[type]', `/${userId}/${newValue}`, { shallow: true });
    }
  };

  useEffect(() => {
    apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: 'user_tweet_list' });
    apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: 'user_all_tweet_list' });
    apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: 'heart_tweet_list' });
  }, [userId]);

  useEffect(() => {
    const asyncEffect = async () => {
      if (!intersecting || !bottomTweetId || !fetchMore) return;
      const { data: fetchMoreData } = await fetchMore({
        variables: { ...queryVariable, oldestTweetId: bottomTweetId },
      });
    };
    asyncEffect();
  }, [intersecting]);

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
            <TweetContainer key={index} tweet={tweet} updateQuery={queryArr[value]} />
          ))
        ) : (
          <ComponentLoading />
        )}
      </div>
      <div ref={fetchMoreEl} />
    </PageLayout>
  );
};

export default UserDetail;
