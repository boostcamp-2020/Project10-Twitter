import { getFollowerList, getFollowingList, getSearchedUserList, getUserInfo } from './getUser';
import {
  followUser,
  unfollowUser,
  updateUserName,
  updateUserComment,
  updateUserProfileImg,
  updateUserBackgroundImg,
} from './modifyUser';
import { createUser } from './addUser';

export {
  getFollowerList,
  getFollowingList,
  getSearchedUserList,
  getUserInfo,
  followUser,
  unfollowUser,
  createUser,
  updateUserName,
  updateUserComment,
  updateUserProfileImg,
  updateUserBackgroundImg,
};
