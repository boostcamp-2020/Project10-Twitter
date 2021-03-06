import { AuthenticationError } from 'apollo-server-express';
import { tweetModel, userModel } from '@models';
import { createNotification } from '@services/notification';

interface Auth {
  authUser: { id: string };
}

interface Args {
  tweet_id: string;
}

const heartTweet = async (_: any, { tweet_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;
  const tweet = await tweetModel.findOneAndUpdate(
    { _id: tweet_id },
    { $addToSet: { heart_user_id_list: userId } },
    { new: true },
  );

  await userModel.findOneAndUpdate(
    { user_id: userId },
    { $addToSet: { heart_tweet_id_list: tweet_id } },
    { new: true },
  );

  await createNotification({
    userId: tweet?.get('author_id'),
    tweetId: tweet_id,
    type: 'heart',
    giverId: userId,
  });
  return tweet;
};

const unheartTweet = async (_: any, { tweet_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;

  const tweet = await tweetModel.findOneAndUpdate(
    { _id: tweet_id },
    { $pull: { heart_user_id_list: userId } },
    { new: true },
  );
  await userModel.findOneAndUpdate(
    { user_id: userId },
    { $pull: { heart_tweet_id_list: tweet_id } },
    { new: true },
  );

  return tweet;
};

export { heartTweet, unheartTweet };
