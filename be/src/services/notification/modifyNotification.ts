import { AuthenticationError } from 'apollo-server-express';
import { userModel } from '../../models';

interface Auth {
  authUser: { id: string };
}

const updateNotification = async (_: any, { id }: { id: string }, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;
  await userModel.updateOne({ user_id: userId }, { $set: { lastest_notification_id: id } });

  return { response: true };
};

export default updateNotification;
