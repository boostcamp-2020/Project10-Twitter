import React, { FunctionComponent } from 'react';
import { Search, Home, Twitter, Text } from '@atoms';
import { LogoContainer, Container, IconLabelContainer, StyledIconLabel } from './styled';

const LoginLeftSection: FunctionComponent = () => {
  const IconTextcolor = 'white';
  const IconTextsize = '20px';
  const IconTextweight = 700;

  return (
    <Container component="div">
      <LogoContainer>
        <img
          alt="logo"
          src="https://user-images.githubusercontent.com/37282087/102025958-9a8e8e80-3dde-11eb-937e-ae05015d5b71.png"
        />
      </LogoContainer>

      <IconLabelContainer component="div">
        <StyledIconLabel>
          <Search />
          &nbsp; &nbsp;
          <Text
            value="관심사를 팔로우하세요."
            color={IconTextcolor}
            size={IconTextsize}
            weight={IconTextweight}
          />
        </StyledIconLabel>
        <StyledIconLabel>
          <Home />
          &nbsp; &nbsp;
          <Text
            value="사람들이 무엇에 대해 이야기하고 있는지 알아보세요."
            color={IconTextcolor}
            size={IconTextsize}
            weight={IconTextweight}
          />
        </StyledIconLabel>
        <StyledIconLabel>
          <Twitter htmlColor="black" />
          &nbsp; &nbsp;
          <Text
            value="대화에 참여하세요."
            color={IconTextcolor}
            size={IconTextsize}
            weight={IconTextweight}
          />
        </StyledIconLabel>
      </IconLabelContainer>
    </Container>
  );
};

export default LoginLeftSection;
