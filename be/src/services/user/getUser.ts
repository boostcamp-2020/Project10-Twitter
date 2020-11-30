import { AuthenticationError } from 'apollo-server-express';
import { userModel } from '../../models';

interface User {
  userId: String;
  profileImgUrl: String;
  name: String;
  _id: String;
}

interface Auth {
  authUser: User;
}

interface Args {
  search_word: String;
  user_id: String;
}

const getFollowingList = async (_: any, args: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = args.user_id;
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

const getFollowerList = async (_: any, args: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userId = args.user_id;
  const followerList = await userModel.aggregate([
    {
      $match: {
        following_list: userId,
      },
    },
  ]);
  return followerList;
};

const getSearchedUserList = async (_: any, args: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const searchingWord = args.search_word;
  const userList = await userModel.find({ user_id: { $regex: searchingWord } });
  return userList;
};

const getUserInfo = (_: any, __: any, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');
  return authUser;
};

export { getFollowerList, getFollowingList, getSearchedUserList, getUserInfo };
