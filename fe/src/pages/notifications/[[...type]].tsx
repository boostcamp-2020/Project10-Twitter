import React, { FunctionComponent, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import TabBar from '../../components/molecules/TabBar';
import NotificationContainer from '../../components/organisms/NotificationContainer';
import PageLayout from '../../components/organisms/PageLayout';
import GET_MYINFO from '../../graphql/getMyInfo.gql';
import GET_NOTIFICATION from '../../graphql/getNotification.gql';
import GET_MENTION_NOTIFICATION from '../../graphql/getMentionNotification.gql';
import UPDATE_NOTIFICATION from '../../graphql/updateNotification.gql';

interface QueryVariable {
  variables: Variable;
}

interface Variable {
  userId: string;
}

interface Noti {
  _id: string;
  giver: User;
  tweet: Tweet;
  type: string;
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

const Notification: FunctionComponent = () => {
  const router = useRouter();
  const { type } = router.query;
  const queryArr = { all: GET_NOTIFICATION, mention: GET_MENTION_NOTIFICATION };
  const value = type ? type[0] : 'all';
  const { data } = useQuery(queryArr[value]);
  const [mutate] = useMutation(UPDATE_NOTIFICATION);

  const onClick = (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    let newValue = target.textContent;
    if (newValue !== value) {
      if (newValue === 'all') newValue = '';
      router.replace('/notifications/[[...type]]', `/notifications/${newValue}`, { shallow: true });
    }
  };

  useEffect(() => {
    const lastestNotification = data?.notifications[0];
    if (lastestNotification)
      mutate({
        variables: { id: lastestNotification._id },
        update: (cache: any) => {
          const updateData = cache.readQuery({ query: GET_MYINFO });
          cache.writeQuery({
            query: GET_MYINFO,
            data: {
              myProfile: { ...updateData, lastest_notification_id: lastestNotification._id },
            },
          });
        },
      });
  }, [data?.notifications]);

  return (
    <PageLayout>
      <TabBar value={value} handleChange={onClick} labels={['all', 'mention']} />
      {data ? (
        data.notifications?.map((noti: Noti, index: number) => (
          <NotificationContainer noti={{ ...noti, curTabValue: value }} />
        ))
      ) : (
        <>loading..</>
      )}
    </PageLayout>
  );
};

export default Notification;
