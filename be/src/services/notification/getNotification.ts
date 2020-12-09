import { AuthenticationError } from 'apollo-server-express';
import { notificationModel } from '../../models';
import { stringToObjectId } from '../../lib/utilty';

interface Auth {
  authUser: { id: string };
}

const getNextnotificationsCondition = (oldest_notification_id: string): Object => {
  return oldest_notification_id ? { _id: { $lt: stringToObjectId(oldest_notification_id) } } : {};
};

const getNotification = async (
  _: any,
  { oldest_notification_id }: { oldest_notification_id: string },
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;

  const nextNotificationcondition = getNextnotificationsCondition(oldest_notification_id);

  const notifications: Document[] = await notificationModel.aggregate([
    {
      $match: {
        $and: [{ user_id: userId }, nextNotificationcondition],
      },
    },
    { $sort: { createAt: -1 } },
    { $limit: 20 },
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
  ]);

  return notifications;
};

const getNotificationWithMention = async (
  _: any,
  { oldest_notification_id }: { oldest_notification_id: string },
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;

  const nextNotificationcondition = getNextnotificationsCondition(oldest_notification_id);

  const notifications: Document[] = await notificationModel.aggregate([
    {
      $match: {
        $and: [{ user_id: userId }, { type: 'mention' }, nextNotificationcondition],
      },
    },
    { $sort: { createAt: -1 } },
    { $limit: 20 },
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
  ]);

  return notifications;
};

const getNotificationCount = async (
  _: any,
  { lastest_notification_id }: { lastest_notification_id: string },
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;

  const condition = lastest_notification_id
    ? { _id: { $gt: stringToObjectId(lastest_notification_id) } }
    : {};
  const [count]: Document[] = await notificationModel.aggregate([
    {
      $match: {
        $and: [{ user_id: userId }, condition],
      },
    },
    {
      $count: 'count',
    },
  ]);
  return count;
};

export { getNotificationCount, getNotification, getNotificationWithMention };
