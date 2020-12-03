import { userModel } from '../../models';
import getHashedPassword from '../../lib/hash-password';
import { makeRandomName } from '../../lib/utilty';

interface UserInfo {
  user_id: string;
  name: string;
  github_id: number;
  password?: string;
  profile_img_url?: string;
}

const checkUnique = async (userId: string): Promise<Boolean> => {
  const user = await userModel.findOne({ user_id: userId });
  if (!user) return true;
  return false;
};

const makeUniqueUserId = async (userId: string): Promise<string> => {
  const isUnique = await checkUnique(userId);
  if (isUnique) return userId;
  return makeUniqueUserId(userId + '_' + makeRandomName(4));
};

const registerUser = async (userInfo: UserInfo) => {
  const uniqueUserId = await makeUniqueUserId(userInfo.user_id);
  const user = await userModel.create({
    user_id: uniqueUserId,
    github_id: userInfo.github_id,
    name: userInfo.name ? userInfo.name : makeRandomName(16),
    password: userInfo.password,
    following_id_list: [],
    profile_img_url: userInfo.profile_img_url,
    heart_tweet_id_list: [],
  });
  return user;
};

const createUser = async (_: any, args: UserInfo) => {
  if (!args.user_id || !args.password || !args.name) {
    throw Error('Not enough information');
  }
  args.password = await getHashedPassword(args.password);
  await registerUser(args);

  return { response: true };
};

export { registerUser, createUser };
