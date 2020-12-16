import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { NextPageContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Loading } from '@molecules';
import { GITHUB_LOGIN } from '@graphql/auth';
import { recreateApollo } from '@libs';

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
    recreateApollo();
    router.push('/home');
  }
  return <Loading message="loading" />;
};

Callback.getInitialProps = ({ query: { code } }: NextPageContext) => {
  return { code };
};
export default Callback;
