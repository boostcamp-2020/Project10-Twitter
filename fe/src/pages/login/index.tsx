import React, { FunctionComponent } from 'react';
import { Footer } from '@molecules';
import { LoginLeftSection, LoginRightSection } from '@organisms';
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
