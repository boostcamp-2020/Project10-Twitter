import { AuthenticationError } from 'apollo-server-express';
import { userModel } from '../../models';
import { createNotifiaction } from '../notification';

const followUser = async (_: any, args: any, { authUser }: any) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.user_id;
  const followUserId = args.follow_user_id;
  const user = await userModel.findOneAndUpdate(
    { user_id: userId },
    { $addToSet: { following_list: followUserId } },
    { new: true },
  );
  await createNotifiaction({ userId: followUserId, followerId: userId, type: 'follow' });
  return user;
};

const unfollowUser = async (_: any, args: any, { authUser }: any) => {
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

export { followUser, unfollowUser };
