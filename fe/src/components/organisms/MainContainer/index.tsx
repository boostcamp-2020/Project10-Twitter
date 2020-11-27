import React, { FunctionComponent, ReactElement } from 'react';
import { Box } from '@material-ui/core';
import styled from 'styled-components';
import ProfileImg from '../../atoms/ProfileImg';
import { BodyContainer, MainBox } from './styled';

interface Props {
  ProfileImgUrl?: string;
  children: React.ReactChild[];
}

const Profile = styled(Box)`
  margin: 0 auto;
`;

const MainContaier: FunctionComponent<Props> = ({ ProfileImgUrl = '', children }) => {
  return (
    <MainBox>
      <Profile>
        <ProfileImg img={ProfileImgUrl} />
      </Profile>
      <BodyContainer>{children}</BodyContainer>
    </MainBox>
  );
};

export default MainContaier;
