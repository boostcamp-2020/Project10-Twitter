import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { NextPageContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import GITHUB_LOGIN from '../../graphql/github.gql';

interface Props {
  code: string | string[] | undefined;
}

const Callback: NextPage<Props> = ({ code }) => {
  const [login, { error, data }] = useMutation(GITHUB_LOGIN);
  const router = useRouter();
  useEffect(() => {
    login({ variables: { code } });
  }, []);

  if (error) router.push('/login');
  if (data) {
    localStorage.setItem('jwt_token', data.auth.token);
    router.push('/');
  }
  return <div>loading...</div>;
};

Callback.getInitialProps = ({ query: { code } }: NextPageContext) => {
  return { code };
};
export default Callback;
