import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import Cookies from 'cookies';
import { useRouter } from 'next/router';
import { TabBar, Loading } from '@molecules';
import { PageLayout, TweetContainer, UserDetailContainer } from '@organisms';
import { useDisplay, useInfiniteScroll } from '@hooks';
import { initializeApollo } from '@libs';
import { GET_USER_TWEETLIST, GET_USER_ALL_TWEETLIST, GET_HEART_TWEETLIST } from '@graphql/tweet';
import { TweetType, QueryVariableType } from '@types';
import { GetServerSideProps } from 'next';

const UserDetail: FunctionComponent = () => {
  const router = useRouter();
  const apolloClient = initializeApollo();
  const { userId, type } = router.query;
  const queryArr = {
    tweets: GET_USER_TWEETLIST,
    'tweets & replies': GET_USER_ALL_TWEETLIST,
    likes: GET_HEART_TWEETLIST,
  };

  const queryVariable: QueryVariableType = { variables: { userId: userId as string } };
  const value = type ? type[0] : 'tweets';
  const { data, fetchMore } = useQuery(queryArr[value], queryVariable);
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
          <Loading message="Loading" />
        )}
      </div>
      <div ref={fetchMoreEl} />
    </PageLayout>
  );
};

export default UserDetail;

export const getServerSideProps: GetServerSideProps<{}, {}> = async (ctx) => {
  const query = gql`
    query($userId: String, $oldestTweetId: String) {
      tweetList: user_tweet_list(user_id: $userId, oldest_tweet_id: $oldestTweetId) {
        _id
        createAt
        content
        child_tweet_number
        retweet_user_number
        heart_user_number
        retweet_id
        img_url_list
        retweet {
          _id
          content
          child_tweet_number
          retweet_user_number
          heart_user_number
          img_url_list
          author {
            user_id
            name
            profile_img_url
          }
        }
        author {
          user_id
          name
          profile_img_url
        }
      }
      user: user_info(user_id: $userId) {
        _id
        user_id
        name
        comment
        profile_img_url
        background_img_url
        following_id_list
      }
      followerCount: follower_count(user_id: $userId) {
        count
      }
    }
  `;
  const cookies = new Cookies(ctx.req, ctx.res);
  const reqCookie = cookies.get('jwt');
  const apolloClient = initializeApollo();
  const result = await apolloClient.query({
    query,
    variables: { userId: ctx.params?.userId },
    context: {
      headers: { cookie: `jwt=${reqCookie}` },
    },
  });
  if (!result) {
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
