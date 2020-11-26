import { userModel } from '../../models';

const followUser = async (_: any, args: any) => {
  const userId = 'test3';
  const followUserId = args.follow_user_id;
  const user = await userModel.findOneAndUpdate(
    { user_id: userId },
    { $addToSet: { following_list: followUserId } },
    { new: true },
  );
  return user;
};

const unfollowUser = async (_: any, args: any) => {
  const userId = 'test3';
  const unfollowUserId = args.unfollow_user_id;
  const user = await userModel.findOneAndUpdate(
    { user_id: userId },
    { $pull: { following_list: unfollowUserId } },
    { new: true },
  );
  return user;
};

export { followUser, unfollowUser };
