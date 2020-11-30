import { AuthenticationError } from 'apollo-server-express';
import { notificationModel } from '../../models';

interface User {
  userId: String;
  profileImgUrl: String;
  name: String;
  _id: String;
}

interface Auth {
  authUser: User;
}

interface Args {
  read: boolean;
}

const getNotification = async (_: any, args: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const { userId } = authUser;
  const [count] = await notificationModel.aggregate([
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

export default getNotification;
