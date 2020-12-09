import React, { FunctionComponent, ReactElement } from 'react';
import { Box } from '@material-ui/core';
import styled from 'styled-components';
import Link from 'next/link';
import ProfileImg from '../../atoms/ProfileImg';
import { BodyContainer, MainBox } from './styled';

interface Props {
  userId?: string;
  ProfileImgUrl?: string;
  children: React.ReactChild[];
}

const Profile = styled(Box)`
  margin: 0 auto;
`;

const MainContaier: FunctionComponent<Props> = ({ userId = '', ProfileImgUrl = '', children }) => {
  return (
    <MainBox>
      <Link href={`/${userId}`}>
        <a>
          <Profile>
            <ProfileImg img={ProfileImgUrl} />
          </Profile>
        </a>
      </Link>
      <BodyContainer>{children}</BodyContainer>
    </MainBox>
  );
};

export default MainContaier;
