import { IResolvers } from 'apollo-server-express';
import {
  getFollowingTweetList,
  getUserTweetList,
  getUserAllTweetList,
  getFollowingList,
  getFollowerList,
  getSearchedUserList,
  getUserInfo,
  githubLogin,
  followUser,
  unfollowUser,
  addBasicTweet,
  addReplyTweet,
  addRetweet,
  deleteTweet,
  getNotification,
  getNotificationCount,
  updateNotification,
} from '../services';

const resolvers: IResolvers = {
  Query: {
    following_tweet_list: getFollowingTweetList,
    user_tweet_list: getUserTweetList,
    user_all_tweet_list: getUserAllTweetList,
    following_list: getFollowingList,
    follower_list: getFollowerList,
    search_user_list: getSearchedUserList,
    user_info: getUserInfo,
    get_notification: getNotification,
    get_notification_count: getNotificationCount,
  },
  Mutation: {
    github_login: githubLogin,
    follow_user: followUser,
    unfollow_user: unfollowUser,
    add_basic_tweet: addBasicTweet,
    add_reply_tweet: addReplyTweet,
    add_retweet: addRetweet,
    delete_tweet: deleteTweet,
    update_notification: updateNotification,
  },
};

export default resolvers;
