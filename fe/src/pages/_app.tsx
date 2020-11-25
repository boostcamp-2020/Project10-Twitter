/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import '../styles/global.css';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:8080/graphql', // api 서버 url
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
