import React, { FunctionComponent, ReactChild } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Loading } from '@molecules';
import { GET_MYINFO } from '@graphql/user';

interface Props {
  children: ReactChild;
}

const AuthProvider: FunctionComponent<Props> = ({ children }) => {
  const router = useRouter();
  if (router.pathname.includes('login') || router.pathname.includes('callback'))
    return <>{children}</>;

  const { data, error } = useQuery(GET_MYINFO);
  if (data) return <>{children}</>;
  if (error) router.push('/login');
  return <Loading message="Loading" />;
};

export default AuthProvider;
