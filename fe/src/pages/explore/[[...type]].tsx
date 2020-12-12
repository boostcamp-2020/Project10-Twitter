/* eslint-disable no-nested-ternary */
import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { SearchBar, TabBar, Loading } from '@molecules';
import { SideBar, TweetContainer, UserCard } from '@organisms';
import { useOnTextChange, useInfiniteScroll } from '@hooks';
import { apolloClient } from '@libs';
import { GET_SEARCH_TWEETLIST } from '@graphql/tweet';
import { GET_SEARCH_USERLIST } from '@graphql/user';
import { Container, MainContainer } from './styled';

interface QueryVariable {
  variables: Variable;
}

interface Variable {
  searchWord: string;
}

interface Tweet {
  _id: string;
  content: string;
  img_url_list: [string];
  author: Author;
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
  retweet: Tweet;
}

interface User {
  user_id: string;
  name: string;
  profile_img_url?: string;
  following_id_list: string[];
  comment?: string;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const Explore: FunctionComponent = () => {
  const router = useRouter();
  const { type } = router.query;
  const [textValue, setTextValue, onTextChange] = useOnTextChange(type ? type[1] || '' : '');
  const [searchWord, setSearchWord] = useState(textValue);
  const value = type ? type[0] : 'tweets';
  const queryArr = { tweets: GET_SEARCH_TWEETLIST, people: GET_SEARCH_USERLIST };
  const queryVariable: Variable = { searchWord };
  const { loading, error, data, fetchMore } = useQuery(queryArr[value], {
    variables: queryVariable,
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
      const newQueryVariable =
        value === 'tweets' ? { oldestTweetId: bottomId } : { oldestUserId: bottomId };
      const mergeQueryVariable = { ...queryVariable, ...newQueryVariable };
      const { data: fetchMoreData } = await fetchMore({ variables: mergeQueryVariable });
    };
    asyncEffect();
  }, [intersecting]);

  return (
    <Container>
      <SideBar />
      <MainContainer>
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
            <Loading message="Loading" />
          )}
        </div>
        <div ref={fetchMoreEl} />
      </MainContainer>
    </Container>
  );
};

export default Explore;
