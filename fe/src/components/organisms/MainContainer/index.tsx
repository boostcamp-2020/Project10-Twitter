import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { ProfileImg } from '@atoms';
import { BodyContainer, Profile, MainBox } from './styled';

interface Props {
  userId?: string;
  ProfileImgUrl?: string;
  children: React.ReactChild[];
}

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
