/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AppProps } from 'next/app';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AuthProvider from '../libs';
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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(29, 161, 242)',
      contrastText: '#fff',
    },
  },
});

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:3001/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // api 서버 url
  cache: new InMemoryCache(),
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  );
};

export default App;
