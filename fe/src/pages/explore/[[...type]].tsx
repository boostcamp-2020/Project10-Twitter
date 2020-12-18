/* eslint-disable no-nested-ternary */
import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { SearchBar, TabBar, LoadingCircle } from '@molecules';
import { PageLayout, TweetContainer, UserCard } from '@organisms';
import { useOnTextChange, useTypeRouter, useDataWithInfiniteScroll } from '@hooks';
import { initializeApollo, getJWTFromBrowser } from '@libs';
import { GET_SEARCH_TWEETLIST } from '@graphql/tweet';
import { GET_SEARCH_USERLIST } from '@graphql/user';
import { NoResult } from '@atoms';
import { TweetType, UserType } from '@types';

const getValue = (type?: string[] | string) => {
  if (!type || !type.length) return 'tweets';
  if (type[0] === 'people') return 'people';
  return 'tweets';
};

const Explore: FunctionComponent = () => {
  const apolloClient = initializeApollo();
  const { type, router } = useTypeRouter();
  const value = getValue(type);
  const [textValue, setTextValue, onTextChange] = useOnTextChange(type ? type[1] || '' : '');
  const [searchWord, setSearchWord] = useState(textValue);
  const fetchMoreEl = useRef<HTMLDivElement>(null);

  const keyValue = {
    tweets: {
      variableTarget: 'searchWord',
      variableValue: searchWord,
      moreVariableTarget: 'oldestTweetId',
      dataTarget: 'tweetList',
      updateQuery: GET_SEARCH_TWEETLIST,
      fetchMoreEl,
    },
    people: {
      variableTarget: 'searchWord',
      variableValue: searchWord,
      moreVariableTarget: 'oldestUserId',
      dataTarget: 'searchList',
      updateQuery: GET_SEARCH_USERLIST,
      fetchMoreEl,
    },
  };

  const [data, setIntersecting, loadFinished, setLoadFinished] = useDataWithInfiniteScroll(
    keyValue[value],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      router.replace(`/explore/[[...type]]`, `/explore/${value}/${textValue}`, {
        shallow: true,
      });
      setSearchWord(textValue);
    }
  };

  useEffect(() => {
    apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: 'search_tweet_list' });
    apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: 'search_user_list' });
    setLoadFinished(false);
    setIntersecting(false);
  }, [searchWord]);

  const onClick = (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    const newValue = target.textContent;
    if (newValue !== value) {
      router.replace('/explore/[[...type]]', `/explore/${newValue}/${textValue}`, {
        shallow: true,
      });
      setLoadFinished(false);
      setIntersecting(false);
    }
  };

  return (
    <PageLayout
      page="탐색하기"
      updateQuery={{ query: GET_SEARCH_TWEETLIST, variables: { searchWord } }}
    >
      <div style={{ margin: '10px' }}>
        <SearchBar
          placeholder="Search Twitter"
          type="text"
          width="100%"
          value={textValue}
          onChange={onTextChange}
          onKeyDown={onKeyDown}
        />
      </div>
      <TabBar value={value} handleChange={onClick} labels={['tweets', 'people']} />
      <div>
        {data ? (
          value === 'tweets' ? (
            data.tweetList?.map((tweet: TweetType, index: number) => (
              <TweetContainer
                key={index}
                tweet={tweet}
                updateQuery={{ query: GET_SEARCH_TWEETLIST, variables: { searchWord } }}
              />
            ))
          ) : (
            data.searchList?.map((user: UserType, index: number) => (
              <UserCard key={index} user={user} />
            ))
          )
        ) : (
          <></>
        )}
        {data?.tweetList?.length === 0 || data?.searchList?.length === 0 ? (
          <NoResult start="No results for" value={value} end="" />
        ) : null}
      </div>
      <LoadingCircle loadFinished={loadFinished} fetchMoreEl={fetchMoreEl} />
    </PageLayout>
  );
};

export default Explore;

export const getServerSideProps: GetServerSideProps<{}, {}> = async (ctx) => {
  const jwt = getJWTFromBrowser(ctx.req, ctx.res);
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: GET_SEARCH_TWEETLIST,
    variables: { searchWord: '' },
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
