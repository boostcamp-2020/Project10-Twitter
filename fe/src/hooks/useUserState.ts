import React, { useCallback, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MYINFO, FOLLOW_USER, UNFOLLOW_USER } from '@graphql/user';

interface User {
  user_id: string;
  following_id_list: string[];
}

const getUserType = (user: User, myProfile: User) => {
  if (myProfile?.user_id === user?.user_id) return 'me';
  if (myProfile?.following_id_list.includes(user?.user_id)) return 'followUser';
  return 'unfollowUser';
};

const useUserState = (user: User): [string, () => Promise<void>, () => Promise<void>] => {
  const { data } = useQuery(GET_MYINFO);
  const [userState, setUserState] = useState(getUserType(user, data?.myProfile));

  const [followUser] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  const setFollowUser = () => {
    setUserState('followUser');
  };

  const setUnfollowUser = () => {
    setUserState('unfollowUser');
  };

  const onClickFollow = async () => {
    await followUser({ variables: { follow_user_id: user.user_id } });
    setFollowUser();
  };

  const onClickUnfollow = async () => {
    await unfollowUser({ variables: { unfollow_user_id: user.user_id } });
    setUnfollowUser();
  };

  useEffect(() => {
    if (user) setUserState(getUserType(user, data?.myProfile));
  }, [user]);

  return [userState, onClickFollow, onClickUnfollow];
};

export default useUserState;
