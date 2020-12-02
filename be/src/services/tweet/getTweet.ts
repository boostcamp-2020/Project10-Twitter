import { AuthenticationError } from 'apollo-server-express';
import { userModel, tweetModel } from '../../models';
import { commonReadCondition } from './common';

interface Auth {
  authUser: { id: String };
}
interface Args {
  tweet_id: String;
  user_id: String;
  time: Date;
}

const getFollowingTweetList = async (_: any, { time }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;
  const userInfo = await userModel.findOne({ user_id: userId });

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
          { createAt: { $lte: new Date(time) } },
        ],
      },
    },
    ...commonReadCondition,
    { $sort: { createAt: -1 } },
    { $limit: 20 },
  ]);

  return tweetList;
};

const getUserTweetList = async (_: any, { user_id, time }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const tweetList: Document[] = await tweetModel.aggregate([
    {
      $match: {
        $and: [
          { author_id: user_id },
          { parent_id: { $exists: false } },
          { createAt: { $lte: new Date(time) } },
        ],
      },
    },
    ...commonReadCondition,
    { $sort: { createAt: -1 } },
    { $limit: 20 },
  ]);

  return tweetList;
};

const getUserAllTweetList = async (_: any, { user_id, time }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const tweetList: Document[] = await tweetModel.aggregate([
    {
      $match: { $and: [{ author_id: user_id }, { createAt: { $lte: new Date(time) } }] },
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

const getChildTweetList = async (_: any, { tweet_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const childTweetList: Document[] = await tweetModel.aggregate([
    {
      $match: { parent_id: tweet_id },
    },
    ...commonReadCondition,
  ]);

  return childTweetList;
};

export {
  getFollowingTweetList,
  getUserTweetList,
  getUserAllTweetList,
  getDetailTweet,
  getChildTweetList,
};
