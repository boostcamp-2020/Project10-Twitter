import { AuthenticationError } from 'apollo-server-express';
import { notificationModel } from '../../models';
import { stringToObjectId } from '../../lib/utilty';

interface Auth {
  authUser: { id: string };
}

const getNextnotificationsCondition = (oldest_notification_id: string): Object => {
  return oldest_notification_id ? { _id: { $lt: stringToObjectId(oldest_notification_id) } } : {};
};

const getNotification = async (_: any, { oldest_notification_id }: any, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;

  const nextNotificationcondition = getNextnotificationsCondition(oldest_notification_id);

  const notifiactions: Document[] = await notificationModel.aggregate([
    {
      $match: {
        $and: [{ user_id: userId }, nextNotificationcondition],
      },
    },
    {
      $project: {
        tweet_id: 1,
        follower_id: 1,
        type: 1,
        is_read: 1,
        createAt: 1,
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
    { $sort: { createAt: -1 } },
    { $limit: 20 },
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
