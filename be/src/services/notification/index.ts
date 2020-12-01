import { AuthenticationError } from 'apollo-server-express';
import { notificationModel } from '../../models';

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
  userId: String;
  type: String;
  followerId?: String;
  tweetId?: String;
}

const getNotification = async (_: any, __: any, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.user_id;
  const notifiactions: Document[] = await notificationModel.aggregate([
    {
      $match: {
        $and: [{ user_id: userId }],
      },
    },
    {
      $project: {
        tweet_id: 1,
        follower_id: 1,
        type: 1,
        is_read: 1,
      },
    },
    {
      $lookup: {
        from: 'tweets',
        localField: 'tweet_id',
        foreignField: '_id',
        as: 'tweet',
      },
    },
    { $unwind: { path: '$tweet', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'users',
        localField: 'tweet.author_id',
        foreignField: 'user_id',
        as: 'tweet.author',
      },
    },
    { $unwind: { path: '$tweet.author', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'users',
        localField: 'follower_id',
        foreignField: 'user_id',
        as: 'user',
      },
    },
    { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
  ]);

  return notifiactions;
};

const getNotificationCount = async (_: any, __: any, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.user_id;
  const [count]: Document[] = await notificationModel.aggregate([
    {
      $match: {
        $and: [{ user_id: userId }, { is_read: false }],
      },
    },
    {
      $count: 'count',
    },
  ]);

  return count;
};

const createNotifiaction = async ({ userId, followerId, tweetId, type }: Args) => {
  await notificationModel.create({
    user_id: userId,
    follower_id: followerId,
    tweet_id: tweetId,
    type,
  });
};

const updateNotification = async (_: any, __: any, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.user_id;
  await notificationModel.updateMany({ user_id: userId }, { $set: { is_read: true } });

  return { response: true };
};

export { getNotificationCount, createNotifiaction, getNotification, updateNotification };