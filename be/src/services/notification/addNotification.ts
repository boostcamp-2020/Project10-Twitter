import { notificationModel } from '@models';

interface Args {
  userId: string;
  type: string;
  giverId?: string;
  tweetId?: string;
}

const createNotification = async ({ userId, giverId, tweetId, type }: Args) => {
  await notificationModel.create({
    user_id: userId,
    giver_id: giverId,
    tweet_id: tweetId,
    type,
  });
};

export default createNotification;
