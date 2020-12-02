import { IResolvers } from 'apollo-server-express';
import {
  getFollowingList,
  getFollowerList,
  getSearchedUserList,
  getUserInfo,
  githubLogin,
  localLogin,
  followUser,
  unfollowUser,
  createUser,
  updateUserName,
} from '../services';

const userResolvers: IResolvers = {
  Query: {
    following_list: getFollowingList,
    follower_list: getFollowerList,
    search_user_list: getSearchedUserList,
    user_info: getUserInfo,
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
