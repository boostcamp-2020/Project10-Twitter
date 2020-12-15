/* eslint-disable no-nested-ternary */
import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { SearchBar, TabBar, ComponentLoading } from '@molecules';
import { PageLayout, TweetContainer, UserCard } from '@organisms';
import { useOnTextChange, useTypeRouter, useDataWithInfiniteScroll } from '@hooks';
import { initializeApollo, getJWTFromBrowser } from '@libs';
import { GET_SEARCH_TWEETLIST } from '@graphql/tweet';
import { GET_SEARCH_USERLIST } from '@graphql/user';
import { TweetType, UserType } from '@types';

const Explore: FunctionComponent = () => {
  const apolloClient = initializeApollo();
  const { type, router } = useTypeRouter();
  const value = type ? type[0] : 'tweets';
  const [textValue, setTextValue, onTextChange] = useOnTextChange(type ? type[1] : '');
  const [searchWord, setSearchWord] = useState(textValue);
  const fetchMoreEl = useRef(null);

  const keyValue = {
    tweets: [
      'searchWord',
      searchWord,
      'oldestTweetId',
      'tweetList',
      GET_SEARCH_TWEETLIST,
      fetchMoreEl,
    ],
    people: [
      'searchWord',
      searchWord,
      'oldestUserId',
      'searchList',
      GET_SEARCH_USERLIST,
      fetchMoreEl,
    ],
  };

  const [data] = useDataWithInfiniteScroll(...keyValue[value]);

  const onKeyDown = (e: any) => {
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
  }, [searchWord]);

  const onClick = (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    const newValue = target.textContent;
    if (newValue !== value) {
      router.replace('/explore/[[...type]]', `/explore/${newValue}/${textValue}`, {
        shallow: true,
      });
    }
  };

  return (
    <PageLayout>
      <SearchBar
        placeholder="Search Twitter"
        type="text"
        variant="standard"
        width="90%"
        value={textValue}
        onChange={onTextChange}
        onKeyDown={onKeyDown}
      />
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
          <ComponentLoading />
        )}
      </div>
      <div ref={fetchMoreEl} />
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
