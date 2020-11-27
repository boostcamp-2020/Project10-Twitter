import { userModel } from '../../models';
import { AuthenticationError } from 'apollo-server-express';

const getFollowingList = async (_: any, args: any, { authUser }: any) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

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

const getFollowerList = async (_: any, args: any, { authUser }: any) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

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

const getSearchedUserList = async (_: any, args: any, { authUser }: any) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const searchingWord = args.word;
  const followerList = await userModel.find({ user_id: { $regex: searchingWord } });
  return followerList;
};

const getUserInfo = (_: any, args: any, { authUser }: any) => {
  if (!authUser) throw new AuthenticationError('not authenticated');
  return authUser;
};

export { getFollowerList, getFollowingList, getSearchedUserList, getUserInfo };
