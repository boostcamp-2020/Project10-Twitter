import React, { ReactElement, FunctionComponent, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ListItem } from '@material-ui/core';
import { useRouter } from 'next/router';
import { DocumentNode } from 'graphql';
import Link from 'next/link';
import { Button, UserPopover, UserInfo, SearchBar } from '@molecules';
import { Home, Explore, Twitter, Notifications, Profiles } from '@atoms';
import { useMyInfo, useOnTextChange, useDisplay } from '@hooks';
import { NewTweetModal } from '@organisms';
import { GET_NOTIFICATION_COUNT } from '@graphql/notification';
import Container from './styled';

const TEN_SECONDS = 10 * 1000;

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
  { id: 0, text: '', icon: Twitter({ width: '40px', height: '40px' }), link: '/' },
  { id: 1, text: '홈', icon: Home({ width: '30px', height: '30px' }), link: '/' },
  {
    id: 2,
    text: '탐색하기',
    icon: Explore({ width: '30px', height: '30px' }),
    link: '/explore/tweets',
  },
  {
    id: 3,
    text: '알림',
    icon: Notifications({ width: '30px', height: '30px' }),
    link: '/notifications',
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

interface Props {
  page?: string;
  updateQuery?: { query: DocumentNode; variables?: {} };
}

const SideBar: FunctionComponent<Props> = ({ page, updateQuery }) => {
  const router = useRouter();
  const { myProfile } = useMyInfo();
  const [value, , onTextChange] = useOnTextChange('');
  const [displayPopover, , onClickUserprofile] = useDisplay(false);
  const [displayModal, , onClickTweetBtn] = useDisplay(false);
  const variables = { id: myProfile ? myProfile.lastest_notification_id : undefined };
  const { data } = useQuery(GET_NOTIFICATION_COUNT, {
    variables,
    pollInterval: TEN_SECONDS,
  });

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      router.push('/explore/[[...type]]', `/explore/tweets/${value}`, { shallow: false });
    }
  };

  const userId: string = myProfile.user_id;
  const userName: string = myProfile.name;
  const userProfileImg: string = myProfile.profile_img_url;
  if (data) TITLE[3].text = `알림 ${data.count.count !== 0 ? data.count.count : ''}`;
  TITLE[4].link = `/${userId}`;
  TITLE[5].onClick = onClickTweetBtn;

  const placeholder = 'Search Twitter';
  const type = 'text';

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
                  color={page && v.text.startsWith(page) ? 'primary' : v.color}
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
        {page !== '탐색하기' ? (
          <ListItem>
            <SearchBar
              placeholder={placeholder}
              type={type}
              width="90%"
              value={value}
              onChange={onTextChange}
              onKeyDown={onKeyDown}
            />
          </ListItem>
        ) : null}
        {displayPopover ? <UserPopover closeEvent={onClickUserprofile} /> : <></>}
        <ListItem onClick={onClickUserprofile}>
          <UserInfo title={userName} sub={userId} img={userProfileImg} width="90%" />
        </ListItem>
      </Container>
      <NewTweetModal
        displayModal={displayModal}
        onClickCloseBtn={onClickTweetBtn}
        updateQuery={updateQuery}
      />
    </>
  );
};

export default SideBar;
