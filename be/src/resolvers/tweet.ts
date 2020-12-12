import { IResolvers } from 'apollo-server-express';
import {
  getFollowingTweetList,
  getUserTweetList,
  getUserAllTweetList,
  addBasicTweet,
  addReplyTweet,
  addRetweet,
  deleteTweet,
  heartTweet,
  unheartTweet,
  getDetailTweet,
  getChildTweetList,
  getHeartTweetList,
  getSearchedTweetList,
  getLatestTweetList,
} from '@services/tweet';

const tweetResolvers: IResolvers = {
  Query: {
    following_tweet_list: getFollowingTweetList,
    user_tweet_list: getUserTweetList,
    user_all_tweet_list: getUserAllTweetList,
    child_tweet_list: getChildTweetList,
    detail_tweet: getDetailTweet,
    heart_tweet_list: getHeartTweetList,
    search_tweet_list: getSearchedTweetList,
    latest_tweet_list: getLatestTweetList,
  },
  Mutation: {
    add_basic_tweet: addBasicTweet,
    add_reply_tweet: addReplyTweet,
    add_retweet: addRetweet,
    delete_tweet: deleteTweet,
    heart_tweet: heartTweet,
    unheart_tweet: unheartTweet,
  },
};

export default tweetResolvers;
