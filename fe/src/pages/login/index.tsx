import React, { FunctionComponent } from 'react';
import { Footer } from '@molecules';
import LoginLeftSection from '../../components/organisms/LoginLeftSection';
import LoginRightSection from '../../components/organisms/LoginRightSection';
import Container from './styled';

const Login: FunctionComponent = () => {
  return (
    <>
      <Container component="section">
        <LoginLeftSection />
        <LoginRightSection />
      </Container>
      <Footer />
    </>
  );
};

export default Login;
