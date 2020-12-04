import { AuthenticationError } from 'apollo-server-express';
import { tweetModel } from '../../models';

interface Auth {
  authUser: { id: string };
}

interface Args {
  tweet_id?: string;
}
const deleteTweet = async (_: any, { tweet_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.id;

  const { deletedCount } = await tweetModel.deleteOne({ author_id: userId, _id: tweet_id });
  if (deletedCount === 0) {
    throw new Error('not deleted');
  }
  return { response: true };
};

export default deleteTweet;
