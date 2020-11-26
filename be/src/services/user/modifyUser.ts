import { userModel } from '../../models';
import { AuthenticationError } from 'apollo-server-express';

const followUser = async (_: any, args: any, { authUser }: any) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = authUser.user_id;
  const followUserId = args.follow_user_id;
  const user = await userModel.findOneAndUpdate(
    { user_id: userId },
    { $addToSet: { following_list: followUserId } },
    { new: true },
  );
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
