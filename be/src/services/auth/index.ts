import bcrypt from 'bcrypt';
import axios from 'axios';
import { signToken } from '@libs/jwt-token';
import { userModel } from '@models';
import { registerUser } from '@services/user/addUser';

interface UserInfo {
  user_id: string;
  github_id: number;
  name: string;
  profile_img_url?: string;
}

interface GithubUserInfo {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
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
    process.env.GITHUB_GET_TOKEN_URL as string,
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
  const { data }: { data: GithubUserInfo } = await axios.get(
    process.env.GITHUB_GET_USER_URL as string,
    {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    },
  );
  return data;
};

const getOurUser = async (userInfo: UserInfo) => {
  let user = await userModel.findOne({ github_id: userInfo.github_id });
  if (!user) {
    user = await registerUser(userInfo);
  }
  return user;
};

const githubLogin = async (_: any, { code }: { code: string }, { res }: any) => {
  const githubToken = await getGithubToken(code);
  const githubUserInfo = await getGithubUserInfo(githubToken);
  const user = await getOurUser({
    user_id: githubUserInfo.login,
    github_id: githubUserInfo.id,
    name: githubUserInfo.name,
    profile_img_url: githubUserInfo.avatar_url,
  });
  const signedToken = signToken({ id: user.get('user_id') });
  res.cookie('jwt', signedToken);
  return { token: signedToken };
};

const localLogin = async (
  _: any,
  { user_id, password }: { user_id: string; password: string },
  { res }: any,
) => {
  const userInfo = await userModel.findOne({ user_id });

  if (!userInfo) throw new Error('Not Found User');

  const dbPassword = userInfo?.get('password');
  const isLogined = await bcrypt.compare(password, dbPassword);

  if (!isLogined) throw new Error('Wrong Password');

  const signedToken = signToken({ id: userInfo?.get('user_id') });
  res.cookie('jwt', signedToken);
  return { token: signedToken };
};

export { githubLogin, localLogin };
