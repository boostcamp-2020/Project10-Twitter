import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { SearchBar, TabBar, Loading } from '@molecules';
import { PageLayout, TweetContainer, UserCard } from '@organisms';
import { useOnTextChange, useTypeRouter, useDataWithInfiniteScroll } from '@hooks';
import { apolloClient, getJWTFromBrowser } from '@libs';
import { GET_SEARCH_TWEETLIST } from '@graphql/tweet';
import { GET_SEARCH_USERLIST } from '@graphql/user';
import { TweetType, UserType } from '@types';

const Explore: FunctionComponent = () => {
  const [type, router] = useTypeRouter();
  const value = type ? type[0] : 'tweets';

  const [textValue, setTextValue, onTextChange] = useOnTextChange(type ? type[1] || '' : '');
  const [searchWord, setSearchWord] = useState(textValue);
  const fetchMoreEl = useRef(null);

  const keyValue = {
    tweets: [
      'searchWord',
      searchWord,
      'oldestTweetId',
      'searchList',
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
    let newValue = target.textContent;
    if (newValue !== value) {
      if (newValue === 'tweets') newValue = '';
      router.replace('/explore/[[...type]]', `/explore/${newValue}`, { shallow: true });
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
            data.searchList?.map((tweet: TweetType, index: number) => (
              <TweetContainer key={index} tweet={tweet} updateQuery={GET_SEARCH_TWEETLIST} />
            ))
          ) : (
            data.searchList?.map((user: UserType, index: number) => (
              <UserCard key={index} user={user} />
            ))
          )
        ) : (
          <Loading message="Loading" />
        )}
      </div>
      <div ref={fetchMoreEl} />
    </PageLayout>
  );
};

export default Explore;

export async function getServerSideProps({ req, res }) {
  const jwt = getJWTFromBrowser(req, res);

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
}
