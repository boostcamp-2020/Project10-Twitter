import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { SearchBar, TabBar, ComponentLoading } from '@molecules';
import { PageLayout, TweetContainer, UserCard } from '@organisms';
import { useOnTextChange, useInfiniteScroll } from '@hooks';
import { apolloClient } from '@libs';
import { GET_SEARCH_TWEETLIST } from '@graphql/tweet';
import { GET_SEARCH_USERLIST } from '@graphql/user';
import { TweetType, VariableType } from '@types';

const Explore: FunctionComponent = () => {
  const router = useRouter();
  const { type } = router.query;
  const [textValue, setTextValue, onTextChange] = useOnTextChange(type ? type[1] || '' : '');
  const [searchWord, setSearchWord] = useState(textValue);
  const value = type ? type[0] : 'tweets';
  const queryArr = { tweets: GET_SEARCH_TWEETLIST, people: GET_SEARCH_USERLIST };
  const variable: VariableType = { searchWord };
  const { loading, error, data, fetchMore } = useQuery(queryArr[value], {
    variables: variable,
  });
  const { _id: bottomId } = data?.searchList?.[data?.searchList?.length - 1] || {};
  const fetchMoreEl = useRef(null);
  const [intersecting] = useInfiniteScroll(fetchMoreEl);

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

  useEffect(() => {
    const asyncEffect = async () => {
      if (!intersecting || !bottomId || !fetchMore) return;
      const newVariable =
        value === 'tweets' ? { oldestTweetId: bottomId } : { oldestUserId: bottomId };
      const mergeVariable = { ...variable, ...newVariable };
      const { data: fetchMoreData } = await fetchMore({ variables: mergeVariable });
    };
    asyncEffect();
  }, [intersecting]);

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
            data.searchList?.map((tweet: Tweet, index: number) => (
              <TweetContainer key={index} tweet={tweet} updateQuery={GET_SEARCH_TWEETLIST} />
            ))
          ) : (
            data.searchList?.map((user: User, index: number) => (
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
