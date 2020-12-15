import React, { FunctionComponent, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { TabBar, LoadingCircle } from '@molecules';
import { PageLayout, NotificationContainer } from '@organisms';
import { useDataWithInfiniteScroll, useTypeRouter } from '@hooks';
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
  const value = type ? type[0] : 'all';
  const [mutate] = useMutation(CONFIRM_NOTIFICATION);

  const fetchMoreEl = useRef(null);

  const keyValue = {
    all: ['', '', 'id', 'notifications', GET_NOTIFICATION_LIST, fetchMoreEl],
    mention: ['', '', 'id', 'notifications', GET_MENTION_NOTIFICATION_LIST, fetchMoreEl],
  };
  const [data, setIntersecting, loadFinished, setLoadFinished] = useDataWithInfiniteScroll(
    ...keyValue[value],
  );

  const onClick = (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    let newValue = target.textContent;
    if (newValue !== value) {
      if (newValue === 'all') newValue = '';
      router.replace('/notifications/[[...type]]', `/notifications/${newValue}`, { shallow: true });
      setLoadFinished(false);
      setIntersecting(false);
    }
  };

  useEffect(() => {
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
        {data?.notifications.map((noti: NotificationType, index: number) => (
          <NotificationContainer
            key={index}
            noti={noti}
            curTabValue={value}
            updateQuery={{ query: keyValue[value][4] }}
          />
        ))}
      </>
      <LoadingCircle loadFinished={loadFinished} fetchMoreEl={fetchMoreEl} />
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
