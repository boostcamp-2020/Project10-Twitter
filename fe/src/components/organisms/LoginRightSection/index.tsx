import React, { FunctionComponent } from 'react';
import { useMutation } from '@apollo/client';
import { LoginForm, InputContainer, Button } from '@molecules';
import { Twitter } from '@atoms';
import { useDisplay, useOnTextChange } from '@hooks';
import { SignupModal } from '@organisms';
import { LOCAL_LOGIN } from '@graphql/auth';
import { useRouter } from 'next/router';
import { Container, JoinBox, LoginFormContainer, StyledButton, StyledText } from './styled';

const LoginRightSection: FunctionComponent = () => {
  const [localLogin] = useMutation(LOCAL_LOGIN);
  const [displaySignupModal, , onClickSignupBtn] = useDisplay(false);
  const [userId, setUserId, onUserIdChange] = useOnTextChange('');
  const [password, setPassword, onPasswordChange] = useOnTextChange('');
  const router = useRouter();

  const onLoginBtnClick = async () => {
    try {
      await localLogin({ variables: { userId, password } });
      setUserId('');
      setPassword('');

      router.push('/home');
    } catch (err) {
      alert(err);
      router.push('/login');
    }
  };

  const onGithubBtnClick = () => {
    window.location.href = process.env.GITHUB_LOGIN_URL as string;
  };
  return (
    <>
      <Container component="div">
        <LoginFormContainer component="div">
          <LoginForm>
            <InputContainer
              labelValue="아이디"
              placeholder="입력!"
              type="text"
              inputValue={userId}
              onChange={onUserIdChange}
            />
            <InputContainer
              labelValue="비밀번호"
              placeholder="입력!"
              type="password"
              inputValue={password}
              onChange={onPasswordChange}
            />
            <Button
              borderRadius={50}
              text="로그인"
              color="primary"
              variant="contained"
              onClick={onLoginBtnClick}
            />
          </LoginForm>
        </LoginFormContainer>
        <JoinBox component="div">
          <Twitter width="40px" height="40px" />
          <StyledText
            value="지금 전 세계에서 무슨 일이 일어나고 있는지 알아보세요"
            size="1.5rem"
            weight={700}
          />
          <StyledButton
            text="가입하기"
            color="primary"
            variant="contained"
            borderRadius={3}
            onClick={onClickSignupBtn}
          />
          <StyledButton
            text="Sign in with GitHub"
            color="primary"
            variant="outlined"
            borderRadius={3}
            icon={Twitter({})}
            onClick={onGithubBtnClick}
          />
        </JoinBox>
      </Container>
      <SignupModal displayModal={displaySignupModal} onClickCloseBtn={onClickSignupBtn} />
    </>
  );
};

export default LoginRightSection;
