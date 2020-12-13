import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { TabBar, TitleSubText, Loading } from '@molecules';
import { PageLayout, UserCard } from '@organisms';
import { useInfiniteScroll } from '@hooks';
import { GET_FOLLOWING_LIST, GET_FOLLOWER_LIST } from '@graphql/user';
import { UserType, QueryVariableType } from '@types';
import UserBox from './styled';

const Follow: FunctionComponent = () => {
  const router = useRouter();
  const { userId, type } = router.query;
  const queryArr = { follower: GET_FOLLOWER_LIST, following: GET_FOLLOWING_LIST };
  const queryVariable: QueryVariableType = { variables: { userId: userId as string } };
  const value = type ? type[0] : 'follower';
  const [userList, setUserList] = useState<UserType[]>([]);
  const { loading, error, data, fetchMore } = useQuery(queryArr[value], queryVariable);
  const fetchMoreEl = useRef(null);
  const [intersecting] = useInfiniteScroll(fetchMoreEl);
  const { _id: bottomUserId } = userList[userList.length - 1] || {};

  useEffect(() => {
    if (data?.list) setUserList(data?.list);
  }, [data?.list]);

  useEffect(() => {
    const asyncEffect = async () => {
      if (intersecting || !bottomUserId || !fetchMore) return;
      const { data: fetchMoreData } = await fetchMore({
        variables: { userId: userId as string, oldestUserId: bottomUserId },
      });
    };
    asyncEffect();
  }, [intersecting]);

  const onClick = (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    let newValue = target.textContent;
    if (newValue !== value) {
      if (newValue === 'follower') newValue = '';
      router.replace(`/[userId]/follow/[[...type]]`, `/${userId}/follow/${newValue}`, {
        shallow: true,
      });
    }
  };

  return (
    <PageLayout>
      <UserBox>
        <TitleSubText title={userId as string} sub={userId as string} />
      </UserBox>
      <TabBar value={value} handleChange={onClick} labels={['follower', 'following']} />
      <div>
        {data ? (
          data.list?.map((user: UserType, index: number) =>
            user.following_user ? (
              <UserCard key={index} user={user.following_user} />
            ) : (
              <UserCard key={index} user={user} />
            ),
          )
        ) : (
          <Loading message="Loading" />
        )}
      </div>
      <div ref={fetchMoreEl} />
    </PageLayout>
  );
};

export default Follow;
