/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { FunctionComponent, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import TabBar from '../../components/molecules/TabBar';
import NotificationContainer from '../../components/organisms/NotificationContainer';
import PageLayout from '../../components/organisms/PageLayout';
import GET_NOTIFICATION from '../../graphql/getNotification.gql';
import UPDATE_NOTIFICATION from '../../graphql/updateNotification.gql';
import useOnTabChange from '../../hooks/useOnTabChange';

interface QueryVariable {
  variables: Variable;
}

interface Variable {
  userId: string;
}

interface Noti {
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

const Notification: FunctionComponent = () => {
  const router = useRouter();
  const { type } = router.query;
  const [value, , onChange] = useOnTabChange(type);
  const { data } = useQuery(GET_NOTIFICATION);
  const [mutate] = useMutation(UPDATE_NOTIFICATION);

  useEffect(() => {
    router.replace('/notifications/[type]', `/notifications/${value}`, { shallow: true });
  }, [value]);

  useEffect(() => {
    setTimeout(() => {
      mutate({
        update: (cache) => {
          const newData = data?.notifications.map((noti: Noti) => {
            return { ...noti, is_read: true };
          });
          cache.writeQuery({
            query: GET_NOTIFICATION,
            data: { notifications: newData },
          });
        },
      });
    }, 3000);
  }, [data]);

  return (
    <PageLayout>
      <TabBar value={value} handleChange={onChange} labels={['all', 'mention']} />
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
