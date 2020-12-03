import { userModel } from '../../models';
import getHashedPassword from '../../lib/hash-password';

interface UserInfo {
  user_id: string;
  name: string;
  password?: string;
  profile_img_url?: string;
}

const registerUser = async (userInfo: UserInfo) => {
  const user = await userModel.create({
    user_id: userInfo.user_id,
    name: userInfo.name,
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
