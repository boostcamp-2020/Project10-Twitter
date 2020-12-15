import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { TabBar } from '@molecules';
import { PageLayout, NotificationContainer } from '@organisms';
import { useInfiniteScroll, useTypeRouter } from '@hooks';
import { initializeApollo, getJWTFromBrowser } from '@libs';
import { GET_MYINFO } from '@graphql/user';
import { NotificationType } from '@types';
import {
  GET_NOTIFICATION_LIST,
  GET_MENTION_NOTIFICATION_LIST,
  CONFIRM_NOTIFICATION,
} from '@graphql/notification';

const Notification: FunctionComponent = () => {
  const apolloClient = initializeApollo();
  const { type, router } = useTypeRouter();
  const queryArr = { all: GET_NOTIFICATION_LIST, mention: GET_MENTION_NOTIFICATION_LIST };
  const value = type ? type[0] : 'all';
  const { data, fetchMore } = useQuery(queryArr[value]);
  const [mutate] = useMutation(CONFIRM_NOTIFICATION);

  const [notificationList, setNotificationList] = useState<NotificationType[]>([]);
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
        {notificationList?.map((noti: NotificationType, index: number) => (
          <NotificationContainer
            key={index}
            noti={noti}
            curTabValue={value}
            updateQuery={queryArr[value]}
          />
        ))}
      </>
      <div ref={fetchMoreEl} />
    </PageLayout>
  );
};

export default Notification;

export const getServerSideProps: GetServerSideProps<{}, {}> = async (ctx) => {
  const apolloClient = initializeApollo();
  const jwt = getJWTFromBrowser(ctx.req, ctx.res);
  const result = await apolloClient.query({
    query: GET_NOTIFICATION_LIST,
    context: {
      headers: { cookie: `jwt=${jwt}` },
    },
  });
  const initialState = apolloClient.cache.extract();

  return {
    props: {
      initialState,
    },
  };
};
