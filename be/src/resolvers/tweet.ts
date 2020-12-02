import { IResolvers } from 'apollo-server-express';
import {
  getFollowingTweetList,
  getUserTweetList,
  getUserAllTweetList,
  addBasicTweet,
  addReplyTweet,
  addRetweet,
  deleteTweet,
} from '../services';

const tweetResolvers: IResolvers = {
  Query: {
    following_tweet_list: getFollowingTweetList,
    user_tweet_list: getUserTweetList,
    user_all_tweet_list: getUserAllTweetList,
  },
  Mutation: {
    add_basic_tweet: addBasicTweet,
    add_reply_tweet: addReplyTweet,
    add_retweet: addRetweet,
    delete_tweet: deleteTweet,
  },
};

export default tweetResolvers;
