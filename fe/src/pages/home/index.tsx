/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { FunctionComponent, useState } from 'react';
import { useQuery } from '@apollo/client';
import NewTweetContainer from '../../components/organisms/NewTweetContainer';
import TweetContainer from '../../components/organisms/TweetContainer';
import SideBar from '../../components/organisms/SideBar';
import { Container, MainContainer, HomeBox } from './styled';
import GET_LIST from '../../graphql/getList.gql';

interface Tweet {
  content: string;
  author: Author;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const Home: FunctionComponent = () => {
  const { data } = useQuery(GET_LIST);

  if (data) {
    return (
      <Container>
        <SideBar/>
        <MainContainer>
          <HomeBox>Home</HomeBox>
          <NewTweetContainer/>
          {data.list?.map((tweet: Tweet, index: number) => (
            <TweetContainer key={index} tweet={tweet} />
          ))}
        </MainContainer>
      </Container>
    );
  }
  return <div>loading...</div>;
};

export default Home;
