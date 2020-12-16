import React, { FunctionComponent, ReactChild } from 'react';
import { SideBar } from '@organisms';
import { Container, MainContainer } from './styled';

interface Props {
  children: ReactChild[];
  page?: string;
}

const PageLayout: FunctionComponent<Props> = ({ children, page }) => {
  return (
    <Container>
      <SideBar page={page} />
      <MainContainer>{children}</MainContainer>
    </Container>
  );
};

export default PageLayout;
