import { AuthenticationError } from 'apollo-server-express';
import { userModel } from '../../models';
import { stringToObjectId } from '../../lib/utilty';

interface Auth {
  authUser: { id: string };
}

interface Args {
  oldest_user_id: string;
  search_word: string;
  user_id: string;
}

const getNextUsersCondition = (oldest_user_id: string): Object => {
  return oldest_user_id ? { _id: { $lt: stringToObjectId(oldest_user_id) } } : {};
};

const getFollowingList = async (_: any, { user_id, oldest_user_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const nextUsersCondition = getNextUsersCondition(oldest_user_id);

  const userInfo = await userModel.findOne({ user_id });

  const followingList: Document[] = await userModel.aggregate([
    {
      $match: {
        $and: [{ user_id: { $in: userInfo?.get('following_id_list') } }, nextUsersCondition],
      },
    },
    { $limit: 20 },
  ]);

  return followingList;
};

const getFollowerList = async (_: any, { user_id, oldest_user_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const nextUsersCondition = getNextUsersCondition(oldest_user_id);

  const followerList: Document[] = await userModel.aggregate([
    {
      $match: {
        $and: [
          {
            following_id_list: user_id,
          },
          nextUsersCondition,
        ],
      },
    },
    { $limit: 20 },
  ]);

  return followerList;
};

const getSearchedUserList = async (
  _: any,
  { search_word, oldest_user_id }: Args,
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const nextUsersCondition = getNextUsersCondition(oldest_user_id);

  const userList = await userModel
    .find({ $and: [{ user_id: { $regex: search_word } }, nextUsersCondition] })
    .limit(20);
  return userList;
};

const getUserInfo = async (_: any, __: any, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const [userInfo] = await userModel.find({ user_id: authUser.id });
  return userInfo;
};

export { getFollowerList, getFollowingList, getSearchedUserList, getUserInfo };
