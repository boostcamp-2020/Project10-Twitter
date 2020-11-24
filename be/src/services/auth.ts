import axios from 'axios';
import { userModel } from '../models';

const githubLogin = async (_: any, args: any) => {
  const { code } = args;
  const response = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      code,
      client_id: 'e7e296232c02f15bc3ff', // 내 APP의 정보
      client_secret: 'e70bb812ee09775f4100553b1a57e6166c72a602', // 내 APP의 정보
    },
    {
      headers: {
        accept: 'application/json',
      },
    },
  );

  const token = response.data.access_token;
  const data = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  });
};

export { githubLogin };
