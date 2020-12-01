import React, { ReactElement, FunctionComponent, useState } from 'react';
import { ListItem } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import Button from '../../molecules/Button';
import UserModal from '../../molecules/UserModal';
import { Home, Explore, Twitter, Notifications, Profiles } from '../../atoms/Icons';
import UserInfo from '../../molecules/UserInfo';
import SearchBar from '../../molecules/SearchBar';
import GET_MYINFO from '../../../graphql/getMyInfo.gql';
import Container from './styled';
import useOnTextChange from '../../../hooks/useOnTextChange';
import useDisplay from '../../../hooks/useDisplay';

interface ButtonProps {
  id: number;
  text: string;
  icon?: ReactElement | null;
  color?: 'primary' | 'inherit' | 'default' | 'secondary' | undefined;
  variant?: 'contained' | 'text' | 'outlined' | undefined;
  width?: string;
  onClick?: () => void;
}

const TITLE: Array<ButtonProps> = [
  { id: 0, text: '', icon: Twitter({ width: '40px', height: '40px' }) },
  { id: 1, text: '홈', icon: Home({ width: '30px', height: '30px' }) },
  { id: 2, text: '탐색하기', icon: Explore({ width: '30px', height: '30px' }) },
  { id: 3, text: '알림', icon: Notifications({ width: '30px', height: '30px' }) },
  { id: 4, text: '프로필', icon: Profiles({ width: '30px', height: '30px' }) },
  {
    id: 5,
    text: 'Tweet',
    color: 'primary',
    variant: 'contained',
    width: '90%',
  },
];

const SideBar: FunctionComponent = () => {
  const { data } = useQuery(GET_MYINFO);
  const placeholder = 'Search Twitter';
  const type = 'text';
  const variant = 'standard';

  const [value,, onTextChange] = useOnTextChange('')
  const [display,, onClick] = useDisplay(false)

  
  if (data) {
    const userId = data.user.user_id;
    const userName = data.user.name;
    const userProfileImg = data.user.profile_img_url;
  return (
    <Container component="ul">
      {TITLE.map((v) => (
        <ListItem key={v.id}>
          <Button
            text={v.text}
            icon={v.icon}
            color={v.color}
            variant={v.variant}
            width={v.width}
          />
        </ListItem>
      ))}
          <ListItem>
            <SearchBar
              placeholder={placeholder}
              type={type}
              variant={variant}
              width="90%"
              value={value}
              onChange={onTextChange}
            />
          </ListItem>
          {display ? <UserModal /> : <></>}
          <ListItem onClick={onClick}>
            <UserInfo
              title={userId}
              sub={userName}
              img={userProfileImg}
              width="90%"
            />
          </ListItem>

          </Container>

  );
      }
      return <div>loading...</div>;
    };

export default SideBar;
