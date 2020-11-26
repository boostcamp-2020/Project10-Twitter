import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Twitter } from '../../atoms/icons';
import LoginForm from '../../molecules/LoginForm';
import InputContainer from '../../molecules/InputContainer';
import Button from '../../molecules/Button';
import Text from '../../atoms/Text';

const useStyles = makeStyles({
  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50vw',
    height: '95vh',
    zIndex: 1,
    backgroundColor: 'white',
  },
  loginForm: {
    position: 'absolute',
    top: '15px',
  },
  joinBox: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    '& Button': {
      marginTop: '15px',
    },
    '& p': {
      marginTop: '15px',
    },
  },
});

const LoginRightSection: FunctionComponent = () => {
  const classes = useStyles();
  const emailLabelValue = '이메일';
  const emailPlaceholder = '입력!';
  const emailType = 'email';
  const emailVariant = 'standard';

  const passwordLabelValue = '비밀번호';
  const passwordPlaceholder = '입력!';
  const passwordType = 'password';
  const passwordVariant = 'standard';

  const content = '로그인';
  const color = 'primary';
  const variant = 'contained';
  const borderRadius = 50;

  const onClick = () => {
    window.location.href =
      'https://github.com/login/oauth/authorize?client_id=03880f7398f255239678&redirect_uri=http://localhost:3000/callback';
  };
  return (
    <Box component="div" className={classes.rightSection}>
      <Box component="div" className={classes.loginForm}>
        <LoginForm>
          <InputContainer
            labelValue={emailLabelValue}
            placeholder={emailPlaceholder}
            type={emailType}
            variant={emailVariant}
          />
          <InputContainer
            labelValue={passwordLabelValue}
            placeholder={passwordPlaceholder}
            type={passwordType}
            variant={passwordVariant}
          />
          <Button borderRadius={borderRadius} text={content} color={color} variant={variant} />
        </LoginForm>
      </Box>
      <Box component="div" className={classes.joinBox}>
        <Twitter width="40px" height="40px" />
        <Text
          value="지금 전 세계에서 무슨 일이 일어나고 있는지 알아보세요"
          size="1.5rem"
          weight={700}
        />
        <Button text="가입하기" color="primary" variant="outlined" borderRadius={3} />
        <Button
          text="Sign in with GitHub"
          color="secondary"
          variant="outlined"
          borderRadius={3}
          icon={Twitter({})}
          onClick={onClick}
        />
      </Box>
    </Box>
  );
};

export default LoginRightSection;
