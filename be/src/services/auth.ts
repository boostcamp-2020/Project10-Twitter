import axios from 'axios';
import { signToken } from '../lib/jwt-token';
import { userModel } from '../models';
import { registerUser } from '../services/user/addUser';
import getHashedPassword from '../lib/hash-password';

interface UserInfo {
  user_id: string;
  name: string;
  profile_img_url?: string;
}

interface GithubUserInfo {
  login: string;
  avatar_url: string;
  name?: string;
}

const getGithubToken = async (code: string) => {
  const githubClientId =
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_GITHUB_CLIENT_ID
      : process.env.PRO_GITHUB_CLIENT_ID;
  const githubClientSecret =
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_GITHUB_CLIENT_SECRET
      : process.env.PRO_GITHUB_CLIENT_SECRET;

  const { data } = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      code,
      client_id: githubClientId,
      client_secret: githubClientSecret,
    },
    {
      headers: {
        accept: 'application/json',
      },
    },
  );
  return data.access_token;
};

const getGithubUserInfo = async (githubToken: string) => {
  const { data }: { data: GithubUserInfo } = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  });
  return data;
};

const makeRandomName = () => {
  let result = '';
  const NICKNAME_LENGTH = 15;
  const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < NICKNAME_LENGTH; i += 1) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }
  return result;
};

const getOurUser = async (userInfo: UserInfo) => {
  let user = await userModel.findOne({ user_id: userInfo.user_id });
  if (!user) {
    user = await registerUser(userInfo);
  }
  return user;
};

const githubLogin = async (_: any, args: { code: string }) => {
  const { code } = args;
  const githubToken = await getGithubToken(code);
  const githubUserInfo = await getGithubUserInfo(githubToken);
  const user = await getOurUser({
    user_id: githubUserInfo.login,
    name: githubUserInfo.name ? githubUserInfo.name : makeRandomName(),
    profile_img_url: githubUserInfo.avatar_url,
  });

  const signedToken = signToken({ id: user.get('user_id') });
  return { token: signedToken };
};

const localLogin = async (_: any, { user_id, password }: { user_id: string; password: string }) => {
  password = await getHashedPassword(password);
  const userInfo = await userModel.findOne({ user_id, password });
  if (userInfo) {
    const signedToken = signToken({ id: userInfo?.get('user_id') });
    return { token: signedToken };
  }
  throw new Error('Not Found User');
};

export { githubLogin, localLogin };
