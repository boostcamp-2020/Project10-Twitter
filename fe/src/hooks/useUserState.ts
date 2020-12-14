import React, { useCallback, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MYINFO, FOLLOW_USER, UNFOLLOW_USER, GET_USER_DETAIL } from '@graphql/user';
import { UserType, QueryVariableType } from '@types';

const getUserType = (user: UserType, myProfile: UserType) => {
  if (myProfile?.user_id === user?.user_id) return 'me';
  if (myProfile?.following_id_list.includes(user?.user_id)) return 'followUser';
  return 'unfollowUser';
};

const useUserState = (user: UserType): [string, () => Promise<void>, () => Promise<void>] => {
  const { data } = useQuery(GET_MYINFO);
  const [userState, setUserState] = useState(getUserType(user, data?.myProfile));

  const [followUser] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  const setFollowUser = async () => {
    setUserState('followUser');
  };
  const setUnfollowUser = () => {
    setUserState('unfollowUser');
  };

  const onClickFollow = () => {
    setFollowUser();
    const handler = setTimeout(() => {
      followUser({
        variables: { follow_user_id: user.user_id },
        update: (cache) => {
          const userInfo = cache.readQuery({
            query: GET_USER_DETAIL,
            variables: { userId: user.user_id },
          });
          cache.writeQuery({
            query: GET_USER_DETAIL,
            variables: { userId: user.user_id },
            data: {
              followerCount: {
                count: userInfo.followerCount.count + 1,
              },
            },
          });
        },
      });
    });
  };

  const onClickUnfollow = () => {
    setUnfollowUser();
    const handler = setTimeout(() => {
      unfollowUser({
        variables: { unfollow_user_id: user.user_id },
        update: (cache) => {
          const userInfo = cache.readQuery({
            query: GET_USER_DETAIL,
            variables: { userId: user.user_id },
          });
          cache.writeQuery({
            query: GET_USER_DETAIL,
            variables: { userId: user.user_id },
            data: {
              followerCount: {
                count: userInfo.followerCount.count - 1,
              },
            },
          });
        },
      });
    });
  };

  useEffect(() => {
    if (user) setUserState(getUserType(user, data?.myProfile));
  }, [user]);

  return [userState, onClickFollow, onClickUnfollow];
};

export default useUserState;
