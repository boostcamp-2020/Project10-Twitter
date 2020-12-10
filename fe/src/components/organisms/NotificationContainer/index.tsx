import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import UserInfo from '../../molecules/UserInfo';
import TweetContainer from '../TweetContainer';
import { BodyContainer, Container, UnderLine } from './styled';
import useMyInfo from '../../../hooks/useMyInfo';

interface Props {
  noti: Noti;
}

interface Noti {
  curTabValue: string;
  giver: User;
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
  noti: { giver, tweet, type, _id, curTabValue },
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
          <Link href={`/${giver.user_id}/`}>
            <UnderLine>
              <UserInfo img={giver.profile_img_url} title={giver.name} sub={giver.user_id} />
              <BodyContainer>님이 follow 했습니다.</BodyContainer>
            </UnderLine>
          </Link>
        </Container>
      );
    return (
      <Container color={isRead ? '#rgba(29,161,242,0.1)' : undefined}>
        <TweetContainer tweet={tweet} />
      </Container>
    );
  }
  return <></>;
};

export default NotificationContainer;
