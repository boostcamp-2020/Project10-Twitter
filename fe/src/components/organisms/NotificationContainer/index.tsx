import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import UserInfo from '../../molecules/UserInfo';
import TweetStateContainer from '../TweetStateContainer';
import { BodyContainer, Container, UnderLine } from './styled';
import useMyInfo from '../../../hooks/useMyInfo';

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
      <Container color={isRead ? '#CCFFFF' : undefined}>
        <TweetStateContainer tweet={tweet} />
      </Container>
    );

  if (curTabValue === 'all') {
    if (type === 'follow')
      return (
        <Container color={isRead ? '#CCFFFF' : undefined}>
          <Link href={`/${user.user_id}/`}>
            <UnderLine>
              <UserInfo img={user.profile_img_url} title={user.name} sub={user.user_id} />
              <BodyContainer>님이 follow 했습니다.</BodyContainer>
            </UnderLine>
          </Link>
        </Container>
      );
    return (
      <Container color={isRead ? '#CCFFFF' : undefined}>
        <TweetStateContainer tweet={tweet} />
      </Container>
    );
  }
  return <></>;
};

export default NotificationContainer;
