import {
  getFollowingTweetList,
  getUserTweetList,
  getFollowingList,
  getFollowerList,
  getSearchedUserList,
} from '../services';

const resolvers = {
  Query: {
    following_tweet_list: getFollowingTweetList,
    user_tweet_list: getUserTweetList,
    following_list: getFollowingList,
    follower_list: getFollowerList,
    search_user_list: getSearchedUserList,
  },
};

export default resolvers;
