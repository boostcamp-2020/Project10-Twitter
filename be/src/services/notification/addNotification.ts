import { notificationModel } from '../../models';

interface Args {
  userId: string;
  type: string;
  followerId?: string;
  tweetId?: string;
}

const createNotifiaction = async ({ userId, followerId, tweetId, type }: Args) => {
  await notificationModel.create({
    user_id: userId,
    follower_id: followerId,
    tweet_id: tweetId,
    type,
  });
};

export { createNotifiaction };
