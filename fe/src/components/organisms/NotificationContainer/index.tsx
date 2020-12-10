import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import TweetContainer from '../TweetContainer';
import HeartContainer from './HeartContainer';
import { Container, UnderLine } from './styled';
import useMyInfo from '../../../hooks/useMyInfo';
import FollowContainer from './FollowContainer';

interface Props {
  noti: Noti;
}

interface Noti {
  curTabValue: string;
  user: User;
  tweet: Tweet;
  type: string;
  _id: string;
}

interface User {
  user_id: string;
  name: string;
  profile_img_url?: string;
  comment?: string;
  following_user?: User;
}

interface Tweet {
  _id: string;
  content: string;
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
  img_url_list: [string];
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
  noti: { user, tweet, type, _id, curTabValue },
}) => {
  const { myProfile } = useMyInfo();
  const isRead = myProfile.lastest_notification_id < _id;

  if (type === 'mention')
    return (
      <Container color={isRead ? 'rgba(29,161,242,0.1)' : undefined}>
        <TweetContainer tweet={tweet} />
      </Container>
    );

  if (curTabValue === 'all') {
    if (type === 'follow')
      return (
        <Container color={isRead ? 'rgba(29,161,242,0.1)' : undefined}>
          <Link href={`/${user.user_id}/`}>
            <FollowContainer user={user} />
          </Link>
          <UnderLine />
        </Container>
      );
    if (type === 'heart')
      return (
        <Container color={isRead ? 'rgba(29,161,242,0.1)' : undefined}>
          <HeartContainer tweet={tweet} user={user} />
          <UnderLine />
        </Container>
      );
    return (
      <Container color={isRead ? 'rgba(29,161,242,0.1)' : undefined}>
        <TweetContainer tweet={tweet} />
      </Container>
    );
  }
  return <></>;
};

export default NotificationContainer;
