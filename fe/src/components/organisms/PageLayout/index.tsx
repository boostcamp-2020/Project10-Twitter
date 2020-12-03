import React, { FunctionComponent, ReactChild } from 'react';
import SideBar from '../SideBar';
import { Container, MainContainer } from './styled';

interface Props {
  children: ReactChild[];
}

const PageLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <Container>
      <SideBar />
      <MainContainer>{children}</MainContainer>
    </Container>
  );
};

export default PageLayout;
