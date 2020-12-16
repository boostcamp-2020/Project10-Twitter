import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, ApolloCache, DocumentNode } from '@apollo/client';
import { GET_MYINFO, FOLLOW_USER, UNFOLLOW_USER, GET_USER_DETAIL } from '@graphql/user';
import { UserType } from '@types';

const getUserType = (user: UserType, myProfile: UserType) => {
  if (myProfile?.user_id === user?.user_id) return 'me';
  if (myProfile?.following_id_list.includes(user?.user_id)) return 'followUser';
  return 'unfollowUser';
};

const useUserState = (
  user: UserType,
  updateQuery?: { query: DocumentNode; variables?: {} },
): [string, () => void, () => void] => {
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

  const updateCache = (cache: ApolloCache<any>, type: string) => {
    if (updateQuery) {
      const userInfo = cache.readQuery({
        query: updateQuery.query,
        variables: updateQuery.variables,
      });

      let number;
      if (type === 'follow') number = userInfo.followerCount.count + 1;
      else number = userInfo.followerCount.count - 1;
      cache.writeQuery({
        query: updateQuery.query,
        variables: updateQuery.variables,
        data: {
          followerCount: {
            count: number,
          },
        },
      });
    }
  };

  const onClickFollow = () => {
    setFollowUser();
    setTimeout(() => {
      followUser({
        variables: { follow_user_id: user.user_id },
        update: (cache) => {
          updateCache(cache, 'follow');
        },
      });
    });
  };

  const onClickUnfollow = () => {
    setUnfollowUser();
    setTimeout(() => {
      unfollowUser({
        variables: { unfollow_user_id: user.user_id },
        update: (cache) => {
          updateCache(cache, 'unfollow');
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
