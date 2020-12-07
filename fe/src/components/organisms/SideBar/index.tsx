import React, { ReactElement, FunctionComponent, useState } from 'react';
import { ListItem } from '@material-ui/core';
import useMyInfo from '../../../hooks/useMyInfo';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from '../../molecules/Button';
import UserPopover from '../../molecules/UserPopover';
import { Home, Explore, Twitter, Notifications, Profiles } from '../../atoms/Icons';
import UserInfo from '../../molecules/UserInfo';
import SearchBar from '../../molecules/SearchBar';
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
  link: string;
}

const TITLE: Array<ButtonProps> = [
  { id: 0, text: '', icon: Twitter({ width: '40px', height: '40px' }), link: '/home' },
  { id: 1, text: '홈', icon: Home({ width: '30px', height: '30px' }), link: '/home' },
  { id: 2, text: '탐색하기', icon: Explore({ width: '30px', height: '30px' }), link: '/explore' },
  {
    id: 3,
    text: '알림',
    icon: Notifications({ width: '30px', height: '30px' }),
    link: '/notification',
  },
  { id: 4, text: '프로필', icon: Profiles({ width: '30px', height: '30px' }), link: '/' },
  {
    id: 5,
    text: 'Tweet',
    color: 'primary',
    variant: 'contained',
    width: '90%',
    link: '/home',
  },
];

const SideBar: FunctionComponent = () => {
  const router = useRouter();

  const { myProfile } = useMyInfo();
  const [value, , onTextChange] = useOnTextChange('');
  const [display, , onClick] = useDisplay(false);

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      router.push(`explore?searchWord=${value}?tweets`);
    }
  };

  const userId: string = myProfile.user_id;
  const userName: string = myProfile.name;
  const userProfileImg: string = myProfile.profile_img_url;
  TITLE[4].link = `/${userId}`;

  const placeholder = 'Search Twitter';
  const type = 'text';
  const variant = 'standard';

  return (
    <Container component="ul">
      {TITLE.map((v) => (
        <ListItem key={v.id}>
          <Link href={v.link}>
            <Button
              text={v.text}
              icon={v.icon}
              color={v.color}
              variant={v.variant}
              width={v.width}
            />
          </Link>
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
          onKeyDown={onKeyDown}
        />
      </ListItem>
      {display ? <UserPopover /> : <></>}
      <ListItem onClick={onClick}>
        <UserInfo title={userName} sub={userId} img={userProfileImg} width="90%" />
      </ListItem>
    </Container>
  );
};

export default SideBar;
