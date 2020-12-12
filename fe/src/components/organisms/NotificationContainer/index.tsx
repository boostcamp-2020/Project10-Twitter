import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { useMyInfo } from '@hooks';
import { TweetContainer } from '@organisms';
import { NotificationType } from '@types';
import HeartContainer from './HeartContainer';
import { Container, UnderLine } from './styled';
import FollowContainer from './FollowContainer';

interface Props {
  noti: NotificationType;
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
            <FollowContainer user={giver} />
          </Link>
          <UnderLine />
        </Container>
      );
    if (type === 'heart')
      return (
        <Container color={isRead ? 'rgba(29,161,242,0.1)' : undefined}>
          <HeartContainer tweet={tweet} user={giver} />
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
