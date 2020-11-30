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
} from '../services';

const resolvers = {
  Query: {
    following_tweet_list: getFollowingTweetList,
    user_tweet_list: getUserTweetList,
    user_all_tweet_list: getUserAllTweetList,
    following_list: getFollowingList,
    follower_list: getFollowerList,
    search_user_list: getSearchedUserList,
    user_info: getUserInfo,
  },
  Mutation: {
    github_login: githubLogin,
    follow_user: followUser,
    unfollow_user: unfollowUser,
    add_basic_tweet: addBasicTweet,
    add_reply_tweet: addReplyTweet,
    add_retweet: addRetweet,
    delete_tweet: deleteTweet,
  },
};

export default resolvers;
