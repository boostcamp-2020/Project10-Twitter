import {
  getFollowingTweetList,
  getUserTweetList,
  getFollowingList,
  getFollowerList,
  getSearchedUserList,
  githubLogin,
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
  },
};

export default resolvers;
