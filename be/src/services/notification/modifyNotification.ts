import { AuthenticationError } from 'apollo-server-express';
import { notificationModel } from '../../models';

interface Auth {
  authUser: { id: string };
}

const updateNotification = async (_: any, __: any, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;
  await notificationModel.updateMany({ user_id: userId }, { $set: { is_read: true } });

  return { response: true };
};

export { updateNotification };
