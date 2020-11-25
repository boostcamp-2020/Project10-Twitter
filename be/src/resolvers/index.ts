import {
  getFollowingTweetList,
  getUserTweetList,
  getFollowingList,
  getFollowerList,
  getSearchedUserList,
  githubLogin,
  followUser,
  unfollowUser,
  addBasicTweet,
  addReplyTweet,
} from '../services';

const resolvers = {
  Query: {
    following_tweet_list: getFollowingTweetList,
    user_tweet_list: getUserTweetList,
    following_list: getFollowingList,
    follower_list: getFollowerList,
    search_user_list: getSearchedUserList,
  },
  Mutation: {
    github_login: githubLogin,
    follow_user: followUser,
    unfollow_user: unfollowUser,
    add_basic_tweet: addBasicTweet,
    add_reply_tweet: addReplyTweet,
  },
};

export default resolvers;
