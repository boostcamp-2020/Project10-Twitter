import axios from 'axios';
import { userModel } from '../models';
import jwt from 'jsonwebtoken';

const githubLogin = async (_: any, args: any) => {
  const { code } = args;
  const githubToken = await getGithubToken(code);
  const githubUserInfo = await getGithubUserInfo(githubToken);
  const user = await getOurUser(githubUserInfo);
  const signedToken = signToken(user);
  return signedToken;
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

const getOurUser = async (githubUserInfo: any) => {
  let user = await userModel.findOne({ user_id: githubUserInfo.username });
  if (!user) {
    user = await userModel.create({
      user_id: githubUserInfo.username,
      name: 'test100',
      following_list: [],
      profile_img_url: githubUserInfo.avatar_url,
    });
  }
  return user;
};

const signToken = (user: any) => {
  const token = jwt.sign(user, process.env.JWT_SECRET_KEY!, { expiresIn: '24h' });
  return token;
};

const verifyToken = (token: string) => {
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  return user;
};

export { githubLogin, verifyToken };
