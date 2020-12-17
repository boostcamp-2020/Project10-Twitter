import { AuthenticationError } from 'apollo-server-express';
import { userModel, tweetModel } from '@models';
import { stringToObjectId } from '@libs/utiltys';

interface Auth {
  authUser: { id: string };
}

interface Args {
  oldest_user_id: string;
  search_word: string;
  user_id: string;
  tweet_id: string;
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
    { $sort: { _id: -1 } },
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
    { $sort: { _id: -1 } },
    { $limit: 20 },
  ]);

  return followerList;
};

const getFollowerCount = async (_: any, { user_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const [followerCount]: Document[] = await userModel.aggregate([
    {
      $match: {
        following_id_list: user_id,
      },
    },
    { $count: 'count' },
  ]);
  return followerCount || { count: 0 };
};

const getHeartUserList = async (_: any, { tweet_id, oldest_user_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const nextUsersCondition = getNextUsersCondition(oldest_user_id);

  const tweet = await tweetModel.findOne({ _id: tweet_id });

  const heartUserList: Document[] = await userModel.aggregate([
    {
      $match: {
        $and: [{ user_id: { $in: tweet?.get('heart_user_id_list') } }, nextUsersCondition],
      },
    },
    { $limit: 20 },
  ]);

  return heartUserList;
};

const getRetweetUserList = async (
  _: any,
  { tweet_id, oldest_user_id }: Args,
  { authUser }: Auth,
) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const nextUsersCondition = getNextUsersCondition(oldest_user_id);

  const tweet = await tweetModel.findOne({ _id: tweet_id });

  const retweetUserList: Document[] = await userModel.aggregate([
    {
      $match: {
        $and: [{ user_id: { $in: tweet?.get('retweet_user_id_list') } }, nextUsersCondition],
      },
    },
    { $limit: 20 },
  ]);

  return retweetUserList;
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
    .sort({ _id: -1 })
    .limit(20);
  return userList;
};

const getMyUserInfo = async (_: any, __: any, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const [userInfo] = await userModel.find({ user_id: authUser.id });
  return userInfo;
};

const getUserInfo = async (_: any, { user_id }: Args, { authUser }: Auth) => {
  if (!authUser) throw new AuthenticationError('not authenticated');

  const [userInfo] = await userModel.find({ user_id });
  return userInfo;
};

export {
  getFollowerList,
  getFollowingList,
  getHeartUserList,
  getRetweetUserList,
  getSearchedUserList,
  getMyUserInfo,
  getUserInfo,
  getFollowerCount,
};
