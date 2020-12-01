import { AuthenticationError } from 'apollo-server-express';
import { userModel } from '../../models';
import { createNotifiaction } from '../notification';

interface Auth {
  authUser: { user_id: string };
}

const followUser = async (_: any, args: { follow_user_id: String }, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.user_id;
  const followUserId = args.follow_user_id;

  if (followUserId === userId) throw new Error('not allow follow yourself');

  const user = await userModel.findOneAndUpdate(
    { user_id: userId },
    { $addToSet: { following_list: followUserId } },
    { new: true },
  );
  await createNotifiaction({ userId: followUserId, followerId: userId, type: 'follow' });
  return user;
};

const unfollowUser = async (_: any, args: { unfollow_user_id: String }, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.user_id;
  const unfollowUserId = args.unfollow_user_id;

  const user = await userModel.findOneAndUpdate(
    { user_id: userId },
    { $pull: { following_list: unfollowUserId } },
    { new: true },
  );
  return user;
};

const updateUserName = async (_: any, args: { name: String }, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.user_id;
  const { name } = args;
  await userModel.update({ user_id: userId }, { $set: { name } });
  return { response: true };
};

export { followUser, unfollowUser, updateUserName };
