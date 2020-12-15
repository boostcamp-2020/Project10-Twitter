import React, { FunctionComponent, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { TabBar, TitleSubText, ComponentLoading } from '@molecules';
import { PageLayout, UserCard } from '@organisms';
import { useTypeRouter, useDataWithInfiniteScroll } from '@hooks';
import { GET_FOLLOWING_LIST, GET_FOLLOWER_LIST } from '@graphql/user';
import { UserType } from '@types';
import { getJWTFromBrowser, initializeApollo } from '@libs';
import UserBox from './styled';

const Follow: FunctionComponent = () => {
  const { type, userId, router } = useTypeRouter();
  const value = type ? type[0] : 'follower';
  const fetchMoreEl = useRef(null);

  const keyValue = {
    follower: ['userId', userId, 'oldestUserId', 'list', GET_FOLLOWER_LIST, fetchMoreEl],
    following: ['userId', userId, 'oldestUserId', 'list', GET_FOLLOWING_LIST, fetchMoreEl],
  };
  const [data] = useDataWithInfiniteScroll(...keyValue[value]);

  const onClick = (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    let newValue = target.textContent;
    if (newValue !== value) {
      if (newValue === 'follower') newValue = '';
      router.replace(`/[userId]/follow/[[...type]]`, `/${userId}/follow/${newValue}`, {
        shallow: true,
      });
    }
  };

  return (
    <PageLayout>
      <UserBox>
        <TitleSubText title={userId as string} sub={userId as string} />
      </UserBox>
      <TabBar value={value} handleChange={onClick} labels={['follower', 'following']} />
      <div>
        {data ? (
          data.list?.map((user: UserType, index: number) =>
            user.following_user ? (
              <UserCard key={index} user={user.following_user} />
            ) : (
              <UserCard key={index} user={user} />
            ),
          )
        ) : (
          <ComponentLoading />
        )}
      </div>
      <div ref={fetchMoreEl} />
    </PageLayout>
  );
};

export default Follow;

export const getServerSideProps: GetServerSideProps<{}, {}> = async (ctx) => {
  const jwt = getJWTFromBrowser(ctx.req, ctx.res);
  const { userId } = ctx.query || {};

  const apolloClient = initializeApollo();
  const result = await apolloClient.query({
    query: GET_FOLLOWER_LIST,
    variables: { userId },
    context: {
      headers: { cookie: `jwt=${jwt}` },
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
