import React, { FunctionComponent } from 'react';
import { LoginForm, InputContainer, Button } from '@molecules';
import { Twitter } from '../../atoms/Icons';

import SignupModal from '../SignupModal';
import useDisplay from '../../../hooks/useDisplay';
import { Container, JoinBox, LoginFormContainer, StyledButton, StyledText } from './styled';

const LoginRightSection: FunctionComponent = () => {
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

  const [displaySignupModal, , onClickSignupBtn] = useDisplay(false);

  const onClick = () => {
    window.location.href =
      'https://github.com/login/oauth/authorize?client_id=5ca42b21f33b23cc53e8&redirect_uri=http://localhost:3000/callback';
  };
  return (
    <>
      <Container component="div">
        <LoginFormContainer component="div">
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
            onClick={onClick}
          />
        </JoinBox>
      </Container>
      <SignupModal displayModal={displaySignupModal} onClickCloseBtn={onClickSignupBtn} />
    </>
  );
};

export default LoginRightSection;
