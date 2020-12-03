import { AuthenticationError } from 'apollo-server-express';
import { userModel, tweetModel } from '../../models';
import { commonReadCondition } from './common';

interface Auth {
  authUser: { id: String };
}
interface Args {
  oldest_tweet_id: String;
  latest_tweet_id: String;
  search_word: String;
  tweet_id: String;
  user_id: String;
  time: Date;
}

const getNextTweetsCondition = (oldest_tweet_id: String): Object => {
  return oldest_tweet_id ? { _id: { $lt: oldest_tweet_id } } : {};
};

const getFollowingTweetList = async (_: any, { oldest_tweet_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;
  const userInfo = await userModel.findOne({ userId });

  const nextTweetsCondition = getNextTweetsCondition(oldest_tweet_id);

  const tweetList: Document[] = await tweetModel.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [
              { author_id: { $in: userInfo?.get('following_id_list') } },
              { author_id: userId },
            ],
          },
          { parent_id: { $exists: false } },
          nextTweetsCondition,
        ],
      },
    },
    ...commonReadCondition,
    { $sort: { createAt: -1 } },
    { $limit: 20 },
  ]);

  return tweetList;
};

const getUserTweetList = async (_: any, { user_id, oldest_tweet_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const nextTweetsCondition = getNextTweetsCondition(oldest_tweet_id);

  const tweetList: Document[] = await tweetModel.aggregate([
    {
      $match: {
        $and: [{ author_id: user_id }, { parent_id: { $exists: false } }, nextTweetsCondition],
      },
    },
    ...commonReadCondition,
    { $sort: { createAt: -1 } },
    { $limit: 20 },
  ]);

  return tweetList;
};

const getUserAllTweetList = async (
  _: any,
  { user_id, oldest_tweet_id }: Args,
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const nextTweetsCondition = getNextTweetsCondition(oldest_tweet_id);

  const tweetList: Document[] = await tweetModel.aggregate([
    {
      $match: { $and: [{ author_id: user_id }, nextTweetsCondition] },
    },
    ...commonReadCondition,
    { $sort: { createAt: -1 } },
    { $limit: 20 },
  ]);

  return tweetList;
};

const getDetailTweet = async (_: any, { tweet_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const [tweet]: Document[] = await tweetModel.aggregate([
    {
      $match: { _id: tweet_id },
    },
    ...commonReadCondition,
  ]);

  return tweet;
};

const getChildTweetList = async (
  _: any,
  { tweet_id, oldest_tweet_id }: Args,
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const nextTweetsCondition = getNextTweetsCondition(oldest_tweet_id);

  const childTweetList: Document[] = await tweetModel.aggregate([
    {
      $match: { $and: [{ parent_id: tweet_id }, nextTweetsCondition] },
    },
    ...commonReadCondition,
    { $sort: { createAt: -1 } },
    { $limit: 20 },
  ]);

  return childTweetList;
};

const getHeartTweetList = async (
  _: any,
  { user_id, oldest_tweet_id }: Args,
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userInfo = await userModel.findOne({ user_id });
  const nextTweetsCondition = getNextTweetsCondition(oldest_tweet_id);

  const tweetList: Document[] = await tweetModel.aggregate([
    {
      $match: {
        $and: [{ _id: { $in: userInfo?.get('heart_tweet_id_list') } }, nextTweetsCondition],
      },
    },
    ...commonReadCondition,
    { $sort: { createAt: -1 } },
    { $limit: 20 },
  ]);

  return tweetList;
};

const getSearchedTweetList = async (
  _: any,
  { search_word, oldest_tweet_id }: Args,
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const nextTweetsCondition = getNextTweetsCondition(oldest_tweet_id);

  const searchedTweetList: Document[] = await tweetModel.aggregate([
    {
      $match: { $and: [{ content: { $regex: search_word } }, nextTweetsCondition] },
    },
    ...commonReadCondition,
    { $sort: { createAt: -1 } },
    { $limit: 20 },
  ]);

  return searchedTweetList;
};

const getLatestTweetList = async (_: any, { latest_tweet_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;
  const userInfo = await userModel.findOne({ userId });

  const latestTweetList: Document[] = await tweetModel.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [
              { author_id: { $in: userInfo?.get('following_id_list') } },
              { author_id: userId },
            ],
          },
          { parent_id: { $exists: false } },
          { _id: { $gt: latest_tweet_id } },
        ],
      },
    },
    ...commonReadCondition,
    { $sort: { createAt: -1 } },
  ]);

  return latestTweetList;
};

export {
  getFollowingTweetList,
  getUserTweetList,
  getUserAllTweetList,
  getDetailTweet,
  getChildTweetList,
  getHeartTweetList,
  getSearchedTweetList,
};
