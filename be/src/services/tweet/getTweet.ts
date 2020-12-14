import { AuthenticationError } from 'apollo-server-express';
import { userModel, tweetModel } from '@models';
import { stringToObjectId } from '@libs/utiltys';
import commonReadCondition from './common';

interface Auth {
  authUser: { id: string };
}
interface Args {
  oldest_tweet_id: string;
  latest_tweet_id: string;
  search_word: string;
  tweet_id: string;
  user_id: string;
  time: Date;
}

const getNextTweetsCondition = ({ oldest_tweet_id = '', latest_tweet_id = '' }) => {
  if (oldest_tweet_id) return { _id: { $lt: stringToObjectId(oldest_tweet_id) } };
  if (latest_tweet_id) return { _id: { $gt: stringToObjectId(latest_tweet_id) } };
  return {};
};

const getFollowingTweetList = async (
  _: any,
  { oldest_tweet_id, latest_tweet_id }: Args,
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;
  const userInfo = await userModel.findOne({ user_id: userId });

  const nextTweetsCondition = getNextTweetsCondition({ oldest_tweet_id, latest_tweet_id });

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
    { $sort: { createAt: -1 } },
    { $limit: 20 },
    ...commonReadCondition,
  ]);

  return tweetList;
};

const getUserTweetList = async (_: any, { user_id, oldest_tweet_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const nextTweetsCondition = getNextTweetsCondition({ oldest_tweet_id });

  const tweetList: Document[] = await tweetModel.aggregate([
    {
      $match: {
        $and: [{ author_id: user_id }, { parent_id: { $exists: false } }, nextTweetsCondition],
      },
    },
    { $sort: { createAt: -1 } },
    { $limit: 20 },
    ...commonReadCondition,
  ]);

  return tweetList;
};

const getUserAllTweetList = async (
  _: any,
  { user_id, oldest_tweet_id }: Args,
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const nextTweetsCondition = getNextTweetsCondition({ oldest_tweet_id });

  const tweetList: Document[] = await tweetModel.aggregate([
    {
      $match: { $and: [{ author_id: user_id }, nextTweetsCondition] },
    },
    { $sort: { createAt: -1 } },
    { $limit: 20 },
    ...commonReadCondition,
  ]);

  return tweetList;
};

const getDetailTweet = async (_: any, { tweet_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const [tweet]: Document[] = await tweetModel.aggregate([
    {
      $match: { _id: stringToObjectId(tweet_id) },
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

  const nextTweetsCondition = getNextTweetsCondition({ oldest_tweet_id });

  const childTweetList: Document[] = await tweetModel.aggregate([
    {
      $match: { $and: [{ parent_id: stringToObjectId(tweet_id) }, nextTweetsCondition] },
    },
    { $sort: { createAt: -1 } },
    { $limit: 20 },
    ...commonReadCondition,
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
  const nextTweetsCondition = getNextTweetsCondition({ oldest_tweet_id });

  const tweetList: Document[] = await tweetModel.aggregate([
    {
      $match: {
        $and: [{ _id: { $in: userInfo?.get('heart_tweet_id_list') } }, nextTweetsCondition],
      },
    },
    { $sort: { createAt: -1 } },
    { $limit: 20 },
    ...commonReadCondition,
  ]);

  return tweetList;
};

const getSearchedTweetList = async (
  _: any,
  { search_word, oldest_tweet_id }: Args,
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const searchTweetsCondition = search_word === '' ? {} : { content: { $regex: search_word } };

  const nextTweetsCondition = getNextTweetsCondition({ oldest_tweet_id });

  const searchedTweetList: Document[] = await tweetModel.aggregate([
    {
      $match: { $and: [searchTweetsCondition, nextTweetsCondition] },
    },
    { $sort: { createAt: -1 } },
    { $limit: 20 },
    ...commonReadCondition,
  ]);

  return searchedTweetList;
};

const getLatestTweetList = async (_: any, { latest_tweet_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;
  const userInfo = await userModel.findOne({ user_id: userId });

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
          { _id: { $gt: stringToObjectId(latest_tweet_id) } },
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
  getLatestTweetList,
};
