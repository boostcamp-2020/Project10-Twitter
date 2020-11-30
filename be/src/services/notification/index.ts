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
  userId: String;
  type: String;
  followerId?: String;
  tweetId?: String;
}

const getNotification = async (_: any, __: any, { authUser }: Auth) => {
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

const createNotifiaction = async ({ userId, followerId, tweetId, type }: Args) => {
  await notificationModel.create({
    user_id: userId,
    follower_id: followerId,
    tweet_id: tweetId,
    type,
  });
};

export { getNotification, createNotifiaction };
