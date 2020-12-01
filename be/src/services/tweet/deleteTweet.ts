import { AuthenticationError } from 'apollo-server-express';
import { tweetModel } from '../../models';

interface User {
  user_id: String;
  profile_img_url: String;
  name: String;
  _id: String;
}

interface Auth {
  authUser: User;
}

interface Args {
  tweet_id?: String;
}
const deleteTweet = async (_: any, args: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.user_id;
  const tweetId = args.tweet_id;

  const { deletedCount } = await tweetModel.deleteOne({ author_id: userId, _id: tweetId });
  if (deletedCount === 0) {
    throw new AuthenticationError('not authenticated');
  }
  return { response: true };
};

export default deleteTweet;