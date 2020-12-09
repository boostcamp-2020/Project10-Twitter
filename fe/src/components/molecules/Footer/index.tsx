import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Text from '../../atoms/Text';

const Container = styled.div`
  z-index: 1;
  margin: 0 auto;
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 10px;
  & span {
    zindex: 1;
    margin: 0 5px;
    padding-right: 10px;
  }
`;

const Footer: FunctionComponent = () => {
  return (
    <Container>
      <Text value="소개" />
      <Text value="고객센터" />
      <Text value="이용약관" />
      <Text value="개인정보 처리방침" />
      <Text value="쿠키 정책" />
      <Text value="광고 정보" />
      <Text value="비지니스용 트위터" />
      <Text value="개발자" />
      <Text value="디렉터리" />
      <Text value="설정" />
    </Container>
  );
};

export default Footer;
