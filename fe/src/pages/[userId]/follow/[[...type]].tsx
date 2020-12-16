import React, { FunctionComponent, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { TabBar, TitleSubText, ComponentLoading, LoadingCircle } from '@molecules';
import { PageLayout, UserCard } from '@organisms';
import { useTypeRouter, useDataWithInfiniteScroll } from '@hooks';
import { GET_FOLLOWING_LIST, GET_FOLLOWER_LIST } from '@graphql/user';
import { UserType } from '@types';
import { getJWTFromBrowser, initializeApollo } from '@libs';
import UserBox from './styled';

const getValue = (type?: string[] | string) => {
  if (!type || !type.length) return 'follower';
  if (type[0] === 'following') return 'following';
  return 'follower';
};

const Follow: FunctionComponent = () => {
  const { type, userId, router } = useTypeRouter();
  const value = getValue(type);
  const fetchMoreEl = useRef<HTMLDivElement>(null);

  const keyValue = {
    follower: {
      variableTarget: 'userId',
      variableValue: userId,
      moreVariableTarget: 'oldestUserId',
      dataTarget: 'list',
      updateQuery: GET_FOLLOWER_LIST,
      fetchMoreEl,
    },
    following: {
      variableTarget: 'userId',
      variableValue: userId,
      moreVariableTarget: 'oldestUserId',
      dataTarget: 'list',
      updateQuery: GET_FOLLOWING_LIST,
      fetchMoreEl,
    },
  };
  const [data, setIntersecting, loadFinished, setLoadFinished] = useDataWithInfiniteScroll(
    keyValue[value],
  );

  const onClick = (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    let newValue = target.textContent;
    if (newValue !== value) {
      if (newValue === 'follower') newValue = '';
      router.replace(`/[userId]/follow/[[...type]]`, `/${userId}/follow/${newValue}`, {
        shallow: true,
      });
      initializeApollo().cache.evict({ id: 'ROOT_QUERY', fieldName: 'following_list' });
      initializeApollo().cache.evict({ id: 'ROOT_QUERY', fieldName: 'follower_list' });
      setLoadFinished(false);
      setIntersecting(false);
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
        {data?.list?.length === 0 ? <div>팔로우 x </div> : null}
      </div>
      <LoadingCircle loadFinished={loadFinished} fetchMoreEl={fetchMoreEl} />
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
