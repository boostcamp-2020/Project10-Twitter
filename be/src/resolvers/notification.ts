import { IResolvers } from 'apollo-server-express';
import {
  getNotification,
  getNotificationCount,
  updateNotification,
} from '../services/notification';

const notificationResolvers: IResolvers = {
  Query: {
    notification: getNotification,
    notification_count: getNotificationCount,
  },
  Mutation: {
    update_notification: updateNotification,
  },
};

export default notificationResolvers;
