import { AuthenticationError } from 'apollo-server-express';
import { notificationModel } from '@models';
import { stringToObjectId } from '@libs/utiltys';
import commonNotificationCondition from './common';

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
    ...commonNotificationCondition,
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
    ...commonNotificationCondition,
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
  return count || { count: 0 };
};

export { getNotificationCount, getNotification, getNotificationWithMention };
