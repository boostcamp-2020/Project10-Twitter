import React, { FunctionComponent } from 'react';
import UserInfo from '../../molecules/UserInfo';
import { FullHeart } from '../../atoms/Icons';
import { Container, SubContainer, Span, Content } from './styled';

interface Props {
  user: User;
  tweet: Tweet;
}

interface User {
  user_id: string;
  name: string;
  profile_img_url?: string;
  comment?: string;
}

interface Tweet {
  _id: string;
  content: string;
}

const HeartContainer: FunctionComponent<Props> = ({ tweet, user }) => {
  return (
    <Container>
      <SubContainer>
        <FullHeart width="30px" height="30px" />
      </SubContainer>
      <SubContainer>
        <Container>
          <UserInfo img={user.profile_img_url} title={user.user_id} sub="" />
          <Span> is likes your Tweet!</Span>
        </Container>
        <Content>{tweet.content}</Content>
      </SubContainer>
    </Container>
  );
};

export default HeartContainer;
