import { AuthenticationError } from 'apollo-server-express';
import { userModel } from '../../models';

interface Auth {
  authUser: { id: String };
}

interface Args {
  search_word: String;
  user_id: String;
}

const getFollowingList = async (_: any, { user_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const followingList: Document[] = await userModel.aggregate([
    {
      $match: {
        user_id,
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'following_id_list',
        foreignField: 'user_id',
        as: 'following_user',
      },
    },
    { $unwind: '$following_user' },
  ]);

  return followingList;
};

const getFollowerList = async (_: any, { user_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const followerList: Document[] = await userModel.aggregate([
    {
      $match: {
        following_id_list: user_id,
      },
    },
  ]);
  return followerList;
};

const getSearchedUserList = async (_: any, { search_word }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const userList = await userModel.find({ user_id: { $regex: search_word } });
  return userList;
};

const getUserInfo = async (_: any, __: any, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const [userInfo] = await userModel.find({ user_id: authUser.id });
  return userInfo;
};

export { getFollowerList, getFollowingList, getSearchedUserList, getUserInfo };
