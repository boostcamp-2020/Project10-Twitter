import { AuthenticationError } from 'apollo-server-express';
import { notificationModel, tweetModel, userModel } from '@models';

interface Auth {
  authUser: { id: string };
}

interface Args {
  tweet_id?: string;
}
const deleteTweet = async (_: any, { tweet_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;

  const willDeletedTweet = await tweetModel.findOne({ author_id: userId, _id: tweet_id });

  const retweetId = willDeletedTweet?.get('reweet_id');

  if (retweetId) await willDeletedTweet?.updateOne({ $pull: { retweet_user_id_list: retweetId } });

  const parentId = willDeletedTweet?.get('parent_id');

  if (parentId) await willDeletedTweet?.updateOne({ parent_id: parentId });

  const heart_user_id_list = willDeletedTweet?.get('heart_user_id_list');

  if (heart_user_id_list.length !== 0)
    await userModel.update(
      { user_id: { $in: heart_user_id_list } },
      { $pull: { heart_tweet_id_list: tweet_id } },
    );

  await notificationModel.deleteMany({ tweet_id });

  const { deletedCount } = await tweetModel.deleteOne({ author_id: userId, _id: tweet_id });
  if (deletedCount === 0) {
    throw new Error('not deleted');
  }
  return { response: true };
};

export default deleteTweet;
