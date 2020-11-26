import React, { FunctionComponent } from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import LoginLeftSection from '../components/organisms/LoginLeftSection';
import LoginRightSection from '../components/organisms/LoginRightSection';
import Footer from '../components/molecules/Footer';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});
const QUERY = gql`
  query {
    list: following_tweet_list(id: "test1") {
      content
    }
  }
`;
const Login: FunctionComponent = () => {
  const { data, loading, error } = useQuery(QUERY);
  console.log(data);
  const classes = useStyles();

  return (
    <>
      <Box component="section" className={classes.root}>
        <LoginLeftSection />
        <LoginRightSection />
      </Box>
      <Footer />
    </>
  );
};

export default Login;
