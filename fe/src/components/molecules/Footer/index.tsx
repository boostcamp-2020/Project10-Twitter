import React, { FunctionComponent } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Text from '../../atoms/Text';

const useStyles = makeStyles({
  root: {
    zIndex: 1,
    margin: '0 auto',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    '& p': {
      zIndex: 1,
      margin: '0 5px',
      paddingRight: '10px',
    },
  },
});

const Footer: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.root}>
      <Text value="소개" />
      <Text value="고객센터" />
      <Text value="이용약관" />
      <Text value="개인정보 처리방침" />
      <Text value="쿠키 정책" />
      <Text value="광고 정보" />
      <Text value="비지니스용 트위터" />
      <Text value="개발자" />
      <Text value="디렉터리" />
      <Text value="설정" />
    </Box>
  );
};

export default Footer;
