import React, { FunctionComponent } from 'react';
import LoginLeftSection from '../../components/organisms/LoginLeftSection';
import LoginRightSection from '../../components/organisms/LoginRightSection';
import Footer from '../../components/molecules/Footer';
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
