import { notificationModel } from '../../models';

interface Args {
  userId: String;
  type: String;
  followerId?: String;
  tweetId?: String;
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
