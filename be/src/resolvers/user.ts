import { IResolvers } from 'apollo-server-express';
import {
  getFollowingList,
  getFollowerList,
  getSearchedUserList,
  getHeartUserList,
  getRetweetUserList,
  getUserInfo,
  getMyUserInfo,
  followUser,
  unfollowUser,
  createUser,
  updateUserName,
  getFollowerCount,
} from '../services/user';

import { githubLogin, localLogin } from '../services/auth';

const userResolvers: IResolvers = {
  Query: {
    following_list: getFollowingList,
    follower_list: getFollowerList,
    heart_user_list: getHeartUserList,
    retweet_user_list: getRetweetUserList,
    search_user_list: getSearchedUserList,
    my_info: getMyUserInfo,
    user_info: getUserInfo,
    follower_count: getFollowerCount,
  },
  Mutation: {
    update_user_name: updateUserName,
    create_user: createUser,
    github_login: githubLogin,
    local_login: localLogin,
    follow_user: followUser,
    unfollow_user: unfollowUser,
  },
};

export default userResolvers;
