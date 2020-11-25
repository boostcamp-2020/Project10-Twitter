import axios from 'axios';
import { userModel } from '../models';

const githubLogin = async (_: any, args: any) => {
  console.log(args);
  const { code } = args;
  const response = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      code,
      client_id: process.env.DEV_GITHUB_CLIENT_ID, // 내 APP의 정보
      client_secret: process.env.DEV_GITHUB_CLIENT_SECRET, // 내 APP의 정보
    },
    {
      headers: {
        accept: 'application/json',
      },
    },
  );
  const token = response.data.access_token;
  const { data } = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  return { token: '123' };
};

export { githubLogin };
