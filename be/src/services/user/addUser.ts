import { userModel } from '../../models';
import getHashedPassword from '../../lib/hash-password';
import { makeRandomName } from '../../lib/utilty';

interface UserInfo {
  user_id: string;
  name: string;
  github_id: number;
  password?: string;
  profile_img_url?: string;
  background_img_url?: string;
}

const checkUnique = async (userId: string): Promise<Boolean> => {
  const user = await userModel.findOne({ user_id: userId });
  if (!user) return true;
  return false;
};

const makeUniqueUserId = async (userId: string): Promise<string> => {
  const isUnique = await checkUnique(userId);
  if (isUnique) return userId;
  return makeUniqueUserId(`${userId} ${makeRandomName(4)}`);
};

const registerUser = async (userInfo: UserInfo) => {
  const uniqueUserId = await makeUniqueUserId(userInfo.user_id);
  const user = await userModel.create({
    user_id: uniqueUserId,
    github_id: userInfo.github_id,
    name: userInfo.name ? userInfo.name : makeRandomName(10),
    password: userInfo.password,
    following_id_list: [],
    profile_img_url: userInfo.profile_img_url,
    background_img_url:
      'https://images.homedepot-static.com/productImages/fc91cb23-b6db-4d32-b02a-f1ed61dd39a8/svn/folkstone-matte-formica-laminate-sheets-009271258408000-64_400_compressed.jpg',
    heart_tweet_id_list: [],
  });
  return user;
};

const createUser = async (_: any, args: UserInfo) => {
  if (!args.user_id || !args.password || !args.name) {
    throw Error('Not enough information');
  }
  const isUnique = await checkUnique(args.user_id);
  if (!isUnique) throw Error('not unique user id');

  args.password = await getHashedPassword(args.password);
  args.profile_img_url =
    'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';
  args.background_img_url =
    'https://images.homedepot-static.com/productImages/fc91cb23-b6db-4d32-b02a-f1ed61dd39a8/svn/folkstone-matte-formica-laminate-sheets-009271258408000-64_400_compressed.jpg';
  await registerUser(args);

  return { response: true };
};

export { registerUser, createUser };
