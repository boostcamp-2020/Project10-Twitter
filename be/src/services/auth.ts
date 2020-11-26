import axios from 'axios';
import { userModel } from '../models';
import jwt from 'jsonwebtoken';

const githubLogin = async (_: any, args: any) => {
  const { code } = args;
  const githubToken = await getGithubToken(code);
  const githubUserInfo = await getGithubUserInfo(githubToken);
  const user = await getOurUser(githubUserInfo);
  const signedToken = signToken(user);
  return { token: signedToken };
};

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
  const { data } = await axios.get('https://api.github.com/user', {
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
  for (let i = 0; i < NICKNAME_LENGTH; i++) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }
  return result;
};

const registerUser = async (githubUserInfo: any) => {
  const user = await userModel.create({
    user_id: githubUserInfo.login,
    name: githubUserInfo.name ? githubUserInfo.name : makeRandomName(),
    following_list: [],
    profile_img_url: githubUserInfo.avatar_url,
  });
  return user;
};

const getOurUser = async (githubUserInfo: any) => {
  let user = await userModel.findOne({ user_id: githubUserInfo.username });
  if (!user) {
    user = await registerUser(githubUserInfo);
  }
  return user;
};

const signToken = (user: any) => {
  const userData = {
    _id: user._id,
    name: user.name,
    user_id: user.user_id,
    profile_img_url: user.profile_img_url,
  };
  const token = jwt.sign(userData, process.env.JWT_SECRET_KEY!, { expiresIn: '24h' });
  return token;
};

const verifyToken = (token: string) => {
  if (!token) return null;
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  return user;
};

export { githubLogin, verifyToken };
