/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AuthProvider, useApollo } from '@libs';
import '@styles/global.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(29, 161, 242)',
      contrastText: '#fff',
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialState);

  return (
    <ApolloProvider client={apolloClient}>
      <MuiThemeProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  );
};

export default App;
