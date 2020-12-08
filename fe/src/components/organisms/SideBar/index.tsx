import React, { ReactElement, FunctionComponent, useState } from 'react';
import { ListItem } from '@material-ui/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useMyInfo from '../../../hooks/useMyInfo';
import Button from '../../molecules/Button';
import UserPopover from '../../molecules/UserPopover';
import { Home, Explore, Twitter, Notifications, Profiles } from '../../atoms/Icons';
import UserInfo from '../../molecules/UserInfo';
import SearchBar from '../../molecules/SearchBar';
import Container from './styled';
import useOnTextChange from '../../../hooks/useOnTextChange';
import useDisplay from '../../../hooks/useDisplay';
import Modal from '../../molecules/Modal';

interface ButtonProps {
  id: number;
  text: string;
  icon?: ReactElement | null;
  color?: 'primary' | 'inherit' | 'default' | 'secondary' | undefined;
  variant?: 'contained' | 'text' | 'outlined' | undefined;
  width?: string;
  link?: string;
  onClick?: () => void;
}

const TITLE: Array<ButtonProps> = [
  { id: 0, text: '', icon: Twitter({ width: '40px', height: '40px' }), link: '/home' },
  { id: 1, text: '홈', icon: Home({ width: '30px', height: '30px' }), link: '/home' },
  { id: 2, text: '탐색하기', icon: Explore({ width: '30px', height: '30px' }), link: '/explore' },
  {
    id: 3,
    text: '알림',
    icon: Notifications({ width: '30px', height: '30px' }),
    link: '/notifications/all',
  },
  { id: 4, text: '프로필', icon: Profiles({ width: '30px', height: '30px' }), link: '/' },
  {
    id: 5,
    text: 'Tweet',
    color: 'primary',
    variant: 'contained',
    width: '90%',
  },
];

const SideBar: FunctionComponent = () => {
  const router = useRouter();

  const { myProfile } = useMyInfo();
  const [value, , onTextChange] = useOnTextChange('');
  const [displayPopover, , onClickUserprofile] = useDisplay(false);
  const [displayModal, , onClickTweetBtn] = useDisplay(false);

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      router.push(`explore?searchWord=${value}?tweets`);
    }
  };

  const userId: string = myProfile.user_id;
  const userName: string = myProfile.name;
  const userProfileImg: string = myProfile.profile_img_url;
  TITLE[4].link = `/${userId}`;
  TITLE[5].onClick = onClickTweetBtn;

  const placeholder = 'Search Twitter';
  const type = 'text';
  const variant = 'standard';

  return (
    <>
      <Container component="ul">
        {TITLE.map((v) => (
          <ListItem key={v.id}>
            {v.link ? (
              <Link href={v.link}>
                <Button
                  text={v.text}
                  icon={v.icon}
                  color={v.color}
                  variant={v.variant}
                  width={v.width}
                />
              </Link>
            ) : (
              <Button
                text={v.text}
                icon={v.icon}
                color={v.color}
                variant={v.variant}
                width={v.width}
                onClick={v.onClick}
              />
            )}
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
        {displayPopover ? <UserPopover /> : <></>}
        <ListItem onClick={onClickUserprofile}>
          <UserInfo title={userName} sub={userId} img={userProfileImg} width="90%" />
        </ListItem>
      </Container>
      <Modal open={displayModal}>
        <div>안농</div>
        <Button onClick={onClickTweetBtn} color="primary" text="닫기" variant="contained" />
      </Modal>
    </>
  );
};

export default SideBar;
