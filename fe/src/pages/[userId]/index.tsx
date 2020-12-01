/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { FunctionComponent, useState } from 'react';
import { useQuery } from '@apollo/client';
import SideBar from '../../components/organisms/SideBar';
import { Container , MainContainer } from './styled';
import TweetContainer from '../../components/organisms/TweetContainer';
import UserDetailContainer from '../../components/organisms/UserDetailContainer'
import { useRouter } from 'next/router';
import GET_USERTWEETLIST from '../../graphql/getUserTweetList.gql';



interface QueryVariable{
  variables : Variable;
}

interface Variable{
  userId : string;
}

interface Tweet {
  content: string;
  author: Author;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const UserDetail: FunctionComponent = () => {
    const router = useRouter();
    const { userId } = router.query;

    const queryVariable:QueryVariable = { variables: {userId: userId as string}}
    const { loading, error, data } = useQuery(GET_USERTWEETLIST,queryVariable);

  if (loading) return <div>'Loading...'</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  const {tweetList} = data


    return (
      <Container>
        <SideBar/>
        <MainContainer>
          <UserDetailContainer userId={userId as string}>
          {tweetList?.map((tweet: Tweet, index: number) => (
            <TweetContainer key={index} tweet={tweet} />
          ))}
          </UserDetailContainer>
        </MainContainer>
      </Container>
    );
};

export default UserDetail;
