import React, { FunctionComponent, ReactChild } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import GET_MYINFO from '../graphql/getMyInfo.gql';

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
  return <div>loading</div>;
};

export default AuthProvider;
