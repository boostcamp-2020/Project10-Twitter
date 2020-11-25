import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Search, Home, Twitter } from '../components/atoms/icons';
import IconLabel from '../components/molecules/IconLabel';
import LoginForm from '../components/molecules/LoginForm';
import InputContainer from '../components/molecules/InputContainer';
import Button from '../components/molecules/Button';
import Text from '../components/atoms/Text';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50vw',
    height: '95vh',
    backgroundColor: 'rgb(122, 204, 254)',
    '& Box': {
      marginBottom: '1rem',
    },
    rightSection: {
      display: 'relative',
    },
  },
});

const Login: FunctionComponent = () => {
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

  const IconTextcolor = 'white';
  const IconTextsize = '20px';
  const IconTextweight = 700;

  return (
    <Box component="section" className={classes.root}>
      <Box component="div" className={classes.leftSection}>
        <IconLabel>
          <Search />
          &nbsp; &nbsp;
          <Text
            value="관심사를 팔로우하세요."
            color={IconTextcolor}
            size={IconTextsize}
            weight={IconTextweight}
          />
        </IconLabel>
        <IconLabel>
          <Home />
          &nbsp; &nbsp;
          <Text
            value="사람들이 무엇에 대해 이야기하고 있는지 알아보세요."
            color={IconTextcolor}
            size={IconTextsize}
            weight={IconTextweight}
          />
        </IconLabel>
        <IconLabel>
          <Twitter />
          &nbsp; &nbsp;
          <Text
            value="대화에 참여하세요."
            color={IconTextcolor}
            size={IconTextsize}
            weight={IconTextweight}
          />
        </IconLabel>
      </Box>
      <Box component="div">
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

        <Box component="div">
          <Twitter />
          <Text
            value="지금 전 세계에서 무슨 일이 일어나고 있는지 알아보세요"
            size="2rem"
            weight={700}
          />
        </Box>

        <Box component="div">
          <Button text="가입하기" color="primary" variant="outlined" borderRadius={3} />
          <Button
            text="Sign in with GitHub"
            color="secondary"
            variant="outlined"
            borderRadius={3}
            icon={Twitter({})}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
