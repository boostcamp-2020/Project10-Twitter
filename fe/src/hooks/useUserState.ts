import React, { useCallback, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import GET_MYINFO from '../graphql/getMyInfo.gql';

interface User {
  user_id: string;
  following_id_list: string[];
}

const useUserState = (user: User): [string, () => void, () => void] => {
  const [userState, setUserState] = useState('unfollowUser');
  const { data } = useQuery(GET_MYINFO);

  const getUserType = (user: User, myProfile: User) => {
    if (myProfile.user_id === user.user_id) return 'me';
    if (myProfile.following_id_list.includes(user.user_id)) return 'followUser';
    return 'unfollowUser';
  };

  const setFollowUser = () => {
    setUserState('followUser');
  };

  const setUnfollowUser = () => {
    setUserState('unfollowUser');
  };

  useEffect(() => {
    if (data && user) setUserState(getUserType(user, data.myProfile));
  }, [data, user]);

  return [userState, setFollowUser, setUnfollowUser];
};

export default useUserState;
