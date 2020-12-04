/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { FunctionComponent, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import SearchBar from '../../components/molecules/SearchBar'
import SideBar from '../../components/organisms/SideBar';
import TabBar from '../../components/molecules/TabBar';
import { Container, MainContainer } from './styled';
import TweetContainer from '../../components/organisms/TweetContainer';
import UserCard from '../../components/organisms/UserCard';
import useOnTabChange from '../../hooks/useOnTabChange';
import GET_SEARCH_TWEETLIST from '../../graphql/getSearchedTweetList.gql'
import GET_SEARCH_USERLIST from '../../graphql/getSearchedUserList.gql'
import useOnTextChange from '../../hooks/useOnTextChange';

interface QueryVariable {
  variables: Variable;
}

interface Variable {
  searchWord: string;
}

interface Tweet {
  content: string;
  author: Author;
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
}

interface User {
  user_id: string;
  name: string;
  profile_img_url?: string;
  comment?: string;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const Explore: FunctionComponent = () => {
  const router = useRouter();
  const param = router.asPath.split('?')[2] || 'tweets';
  const splitedSearchWord = router.asPath.split('?')[1]
  const initalText = splitedSearchWord ? splitedSearchWord.split("=")[1] : '';
  const [textValue,setTextValue,onTextChange] = useOnTextChange(initalText); 
  const [value, , onChange] = useOnTabChange(param);
  const queryArr = { tweets: GET_SEARCH_TWEETLIST, 'people': GET_SEARCH_USERLIST };
  const queryVariable: QueryVariable = { variables: { searchWord: textValue } };
  const { loading, error, data, refetch } = useQuery(queryArr[value], queryVariable);

  const placeholder = 'Search Twitter';
  const type = 'text';
  const variant = 'standard';

  useEffect(() => {
    router.replace(`/explore`, `/explore?searchWord=${textValue}?${value}`, { shallow: true });
  }, [value,textValue]);

  return (
    <Container>
      <SideBar />
      <MainContainer>
        <SearchBar
          placeholder={placeholder}
          type={type}
          variant={variant}
          width="90%"
          value={textValue}
          onChange={onTextChange}
        />
        <TabBar value={value} handleChange={onChange} labels={['tweets', 'people']} />
        {data ? (
        data.tweetList ? (
          data.tweetList?.map((tweet: Tweet, index: number) => (
            <TweetContainer key={index} tweet={tweet} />
          ))
        ) : (
          data.userList?.map((user: User, index: number) => (
            <UserCard key={index} user={user} />
          )))
        ): (<div> loading..</div>)
        }
      </MainContainer>
    </Container>
  );
};

export default Explore;
