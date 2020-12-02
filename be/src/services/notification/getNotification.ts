import { AuthenticationError } from 'apollo-server-express';
import { notificationModel } from '../../models';

interface Auth {
  authUser: { id: String };
}

const getNotification = async (_: any, __: any, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;
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

  const userId = authUser.id;
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

export { getNotificationCount, getNotification };
