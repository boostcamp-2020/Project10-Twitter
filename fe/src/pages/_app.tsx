/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AppProps } from 'next/app';
import '../styles/global.css';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:3001/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // api 서버 url
  cache: new InMemoryCache(),
});

const App = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);

// App.getInitialProps = ({ Component, pageProps }: AppProps) => {
//   const user;
//   return { ...Component, ...pageProps, user };
// };

export default App;
