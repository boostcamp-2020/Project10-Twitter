import { userModel } from '../models';

const getFollowingList = async (_: any, args: any) => {
  const userId = args.id;
  const followingList = await userModel.aggregate([
    {
      $match: {
        user_id: userId,
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'following_list',
        foreignField: 'user_id',
        as: 'following_user',
      },
    },
    { $unwind: '$following_user' },
  ]);

  return followingList;
};

const getFollowerList = async (_: any, args: any) => {
  const userId = args.id;
  const followerList = await userModel.aggregate([
    {
      $match: {
        following_list: userId,
      },
    },
  ]);
  return followerList;
};

const getSearchedUserList = async (_: any, args: any) => {
  const searchingWord = args.word;
  const followerList = await userModel.find({ user_id: { $regex: searchingWord } });
  return followerList;
};

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

export { getFollowerList, getFollowingList, getSearchedUserList, followUser, unfollowUser };
