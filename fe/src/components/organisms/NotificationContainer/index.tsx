/* eslint-disable camelcase */
import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import UserInfo from '../../molecules/UserInfo';
import ReTweetContainer from '../ReTweetContainer';
import TweetContainer from '../TweetContainer';
import { BodyContainer, Container, UnderLine } from './styled';

interface Props {
  noti: Noti;
}

interface Noti {
  curTabValue: string;
  user: User;
  tweet: Tweet;
  type: string;
  is_read: boolean;
}

interface User {
  user_id: string;
  name: string;
  profile_img_url?: string;
  comment?: string;
  following_user?: User;
}

interface Tweet {
  content: string;
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
  author: Author;
  retweet_id: string;
  retweet: Tweet;
}

interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const NotificationContainer: FunctionComponent<Props> = ({
  noti: { user, tweet, type, is_read, curTabValue },
}) => {
  if (type === 'mention') {
    if (tweet.retweet_id) {
      return (
        <Container color={!is_read ? '#CCFFFF' : undefined}>
          <ReTweetContainer tweet={tweet} />
        </Container>
      );
    }
    return (
      <Container color={!is_read ? '#CCFFFF' : undefined}>
        <TweetContainer tweet={tweet} />
      </Container>
    );
  }

  if (curTabValue === 'all') {
    if (type === 'follow') {
      return (
        <Container color={!is_read ? '#CCFFFF' : undefined}>
          <Link href={`/${user.user_id}/`}>
            <UnderLine>
              <UserInfo img={user.profile_img_url} title={user.name} sub={user.user_id} />
              <BodyContainer>님이 follow 했습니다.</BodyContainer>
            </UnderLine>
          </Link>
        </Container>
      );
    }
    if (tweet.retweet_id) {
      return (
        <Container color={!is_read ? '#CCFFFF' : undefined}>
          <ReTweetContainer tweet={tweet} />
        </Container>
      );
    }
  }
  return null;
};

export default NotificationContainer;
