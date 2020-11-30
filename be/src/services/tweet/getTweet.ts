import { AuthenticationError } from 'apollo-server-express';
import { userModel, tweetModel } from '../../models';

interface User {
  user_id: String;
  profile_img_url: String;
  name: String;
  _id: String;
}

interface Auth {
  authUser: User;
}

interface Args {
  user_id: String;
}

const getFollowingTweetList = async (_: any, args: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.user_id;
  const userInfo = await userModel.findOne({ user_id: userId });

  const tweetList: Document[] = await tweetModel.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [{ author_id: { $in: userInfo?.get('following_list') } }, { author_id: userId }],
          },
          { parent_id: { $exists: false } },
        ],
      },
    },
    {
      $project: {
        author_id: 1,
        content: 1,
        img_url_list: 1,
        parent_id: 1,
        retweet_id: 1,
        child_tweet_list: 1,
        child_tweet_number: { $size: '$child_tweet_list' },
        retweet_user_list: 1,
        retweet_user_number: { $size: '$retweet_user_list' },
        heart_user_list: 1,
        heart_user_number: { $size: '$heart_user_list' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'author_id',
        foreignField: 'user_id',
        as: 'author',
      },
    },
    { $unwind: '$author' },
    {
      $lookup: {
        from: 'tweets',
        localField: 'retweet_id',
        foreignField: '_id',
        as: 'retweet',
      },
    },
    { $unwind: { path: '$retweet', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'users',
        localField: 'retweet.author_id',
        foreignField: 'user_id',
        as: 'retweet.author',
      },
    },
    { $unwind: { path: '$retweet.author', preserveNullAndEmptyArrays: true } },
  ]);

  return tweetList;
};

const getUserTweetList = async (_: any, args: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = args.user_id;
  const tweetList: Document[] = await tweetModel.aggregate([
    {
      $match: {
        $and: [{ author_id: userId }, { parent_id: { $exists: false } }],
      },
    },
    {
      $project: {
        author_id: 1,
        content: 1,
        img_url_list: 1,
        parent_id: 1,
        retweet_id: 1,
        child_tweet_list: 1,
        child_tweet_number: { $size: '$child_tweet_list' },
        retweet_user_list: 1,
        retweet_user_number: { $size: '$retweet_user_list' },
        heart_user_list: 1,
        heart_user_number: { $size: '$heart_user_list' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'author_id',
        foreignField: 'user_id',
        as: 'author',
      },
    },
    { $unwind: '$author' },
    {
      $lookup: {
        from: 'tweets',
        localField: 'retweet_id',
        foreignField: '_id',
        as: 'retweet',
      },
    },
    { $unwind: { path: '$retweet', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'users',
        localField: 'retweet.author_id',
        foreignField: 'user_id',
        as: 'retweet.author',
      },
    },
    { $unwind: { path: '$retweet.author', preserveNullAndEmptyArrays: true } },
  ]);

  return tweetList;
};

const getUserAllTweetList = async (_: any, args: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = args.user_id;
  const tweetList: Document[] = await tweetModel.aggregate([
    {
      $match: { author_id: userId },
    },
    {
      $project: {
        author_id: 1,
        content: 1,
        img_url_list: 1,
        parent_id: 1,
        retweet_id: 1,
        child_tweet_list: 1,
        child_tweet_number: { $size: '$child_tweet_list' },
        retweet_user_list: 1,
        retweet_user_number: { $size: '$retweet_user_list' },
        heart_user_list: 1,
        heart_user_number: { $size: '$heart_user_list' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'author_id',
        foreignField: 'user_id',
        as: 'author',
      },
    },
    { $unwind: '$author' },
    {
      $lookup: {
        from: 'tweets',
        localField: 'retweet_id',
        foreignField: '_id',
        as: 'retweet',
      },
    },
    { $unwind: { path: '$retweet', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'users',
        localField: 'retweet.author_id',
        foreignField: 'user_id',
        as: 'retweet.author',
      },
    },
    { $unwind: { path: '$retweet.author', preserveNullAndEmptyArrays: true } },
  ]);

  return tweetList;
};

export { getFollowingTweetList, getUserTweetList, getUserAllTweetList };
