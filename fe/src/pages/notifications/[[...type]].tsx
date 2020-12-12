import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { TabBar } from '@molecules';
import NotificationContainer from '../../components/organisms/NotificationContainer';
import PageLayout from '../../components/organisms/PageLayout';
import GET_MYINFO from '../../graphql/getMyInfo.gql';
import GET_NOTIFICATION from '../../graphql/getNotification.gql';
import GET_MENTION_NOTIFICATION from '../../graphql/getMentionNotification.gql';
import UPDATE_NOTIFICATION from '../../graphql/updateNotification.gql';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import apolloClient from '../../libs/apolloClient';

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

const getValue = (type: string | string[] | undefined) => {
  if (!type) return 'all';
  return 'mention';
};

const Notification: FunctionComponent = () => {
  const router = useRouter();
  const { type } = router.query;
  const queryArr = { all: GET_NOTIFICATION, mention: GET_MENTION_NOTIFICATION };
  const value = getValue(type);
  // type ? type[0] : 'all';
  const { data, fetchMore } = useQuery(queryArr[value]);
  const [mutate] = useMutation(UPDATE_NOTIFICATION);

  const [notificationList, setNotificationList] = useState<Noti[]>([]);
  const { _id: bottomNotificationId } = notificationList[notificationList.length - 1] || {};
  const fetchMoreEl = useRef(null);
  const [intersecting, loadFinished, setLoadFinished] = useInfiniteScroll(fetchMoreEl);

  const onClick = (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    let newValue = target.textContent;
    if (newValue !== value) {
      if (newValue === 'all') newValue = '';
      router.replace('/notifications/[[...type]]', `/notifications/${newValue}`, { shallow: true });
    }
  };

  useEffect(() => {
    const asyncEffect = async () => {
      if (!intersecting || loadFinished || !bottomNotificationId || !fetchMore) return;
      const { data: newData } = await fetchMore({
        variables: { id: bottomNotificationId },
      });
      if (newData.notifications.length < 20) setLoadFinished(true);
    };
    asyncEffect();
  }, [intersecting]);

  useEffect(() => {
    apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: 'notification_list' });
    apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: 'notification_mention_list' });
  }, []);

  useEffect(() => {
    if (data?.notifications) {
      setNotificationList(data?.notifications);
    }
    const lastestNotification = data?.notifications[0];
    if (lastestNotification)
      mutate({
        variables: { id: lastestNotification._id },
        update: (cache: any) => {
          const updateData = cache.readQuery({ query: GET_MYINFO });
          if (lastestNotification._id > updateData.myProfile.lastest_notification_id)
            cache.writeQuery({
              query: GET_MYINFO,
              data: {
                myProfile: {
                  ...updateData.myProfile,
                  lastest_notification_id: lastestNotification._id,
                },
              },
            });
        },
      });
  }, [data?.notifications]);

  return (
    <PageLayout>
      <TabBar value={value} handleChange={onClick} labels={['all', 'mention']} />
      <>
        {notificationList?.map((noti: Noti, index: number) => (
          <NotificationContainer key={index} noti={{ ...noti, curTabValue: value }} />
        ))}
      </>
      <div ref={fetchMoreEl} />
    </PageLayout>
  );
};

export default Notification;
