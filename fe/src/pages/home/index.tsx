import React, { FunctionComponent, useState } from 'react';
import { ListItem } from '@material-ui/core';
import NewTweetContainer from '../../components/organisms/NewTweetContainer';
import TweetContainer from '../../components/organisms/TweetContainer';
import UserInfo from '../../components/molecules/UserInfo';
import SearchBar from '../../components/molecules/SearchBar';
import SideBar from '../../components/organisms/SideBar';
import { Container, MainContainer, HomeBox } from './styled';

const Home: FunctionComponent = () => {
  const [value, setValue] = useState('');
  const placeholder = 'Search Twitter';
  const type = 'text';
  const variant = 'standard';
  const userId = '홍길동';
  const userName = '@T22e3diXzsOmcpz';
  const tweets = [
    {
      user_id: '1',
      name: 'test',
      content: 'test',
      profile_img_url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    {
      user_id: '1',
      name: 'test',
      content: 'test',
      profile_img_url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    {
      user_id: '1',
      name: 'test',
      content: 'test',
      profile_img_url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    {
      user_id: '1',
      name: 'test',
      content: 'test',
      profile_img_url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    {
      user_id: '1',
      name: 'test',
      content: 'test',
      profile_img_url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    {
      user_id: '1',
      name: 'test',
      content: 'test',
      profile_img_url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    {
      user_id: '1',
      name: 'test',
      content: 'test',
      profile_img_url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    {
      user_id: '1',
      name: 'test',
      content: 'test',
      profile_img_url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    {
      user_id: '1',
      name: 'test',
      content: 'test',
      profile_img_url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    {
      user_id: '1',
      name: 'test',
      content: 'test',
      profile_img_url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    {
      user_id: '1',
      name: 'test',
      content: 'test',
      profile_img_url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
    {
      user_id: '1',
      name: 'test',
      content: 'test',
      profile_img_url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    },
  ];

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

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
        {tweets.map((tweet) => (
          <TweetContainer tweet={tweet} />
        ))}
      </MainContainer>
    </Container>
  );
};

export default Home;
