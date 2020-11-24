import {
  getFollowingTweetList,
  getUserTweetList,
  getFollowingList,
  getFollowerList,
} from '../services';

const resolvers = {
  Query: {
    following_tweet_list: getFollowingTweetList,
    user_tweet_list: getUserTweetList,
    following_list: getFollowingList,
    follower_list: getFollowerList,
  },
};

export default resolvers;
