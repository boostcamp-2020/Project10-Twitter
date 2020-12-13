import { IResolvers } from 'apollo-server-express';
import {
  getNotification,
  getNotificationCount,
  updateNotification,
  getNotificationWithMention,
} from '@services/notification';

const notificationResolvers: IResolvers = {
  Query: {
    notification_list: getNotification,
    notification_mention_list: getNotificationWithMention,
    notification_count: getNotificationCount,
  },
  Mutation: {
    update_notification: updateNotification,
  },
};

export default notificationResolvers;
