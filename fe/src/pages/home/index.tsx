/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { FunctionComponent, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ListItem } from '@material-ui/core';
import NewTweetContainer from '../../components/organisms/NewTweetContainer';
import TweetContainer from '../../components/organisms/TweetContainer';
import UserInfo from '../../components/molecules/UserInfo';
import SearchBar from '../../components/molecules/SearchBar';
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
  const [value, setValue] = useState('');
  const { data } = useQuery(GET_LIST);
  const placeholder = 'Search Twitter';
  const type = 'text';
  const variant = 'standard';

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  if (data) {
    const userId = data.user.user_id;
    const userName = data.user.name;
    const userProfileImg = data.user.profile_img_url;
    return (
      <Container>
        <SideBar>
          <ListItem>
            <SearchBar
              placeholder={placeholder}
              type={type}
              variant={variant}
              width="90%"
              value={value}
              onChange={onChange}
            />
          </ListItem>
          <ListItem>
            <UserInfo title={userId} sub={userName} inRow={false} width="90%" />
          </ListItem>
        </SideBar>
        <MainContainer>
          <HomeBox>Home</HomeBox>
          <NewTweetContainer />
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
