import React, { FunctionComponent, ReactChild } from 'react';
import { SideBar } from '@organisms';
import { DocumentNode } from 'graphql';
import { Container, MainContainer } from './styled';

interface Props {
  children: ReactChild[];
  page?: string;
  updateQuery?: { query: DocumentNode; variables?: {} };
}

const PageLayout: FunctionComponent<Props> = ({ children, page, updateQuery }) => {
  return (
    <Container>
      <SideBar page={page} updateQuery={updateQuery} />
      <MainContainer>{children}</MainContainer>
    </Container>
  );
};

export default PageLayout;
