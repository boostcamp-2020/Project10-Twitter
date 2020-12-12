import React, { FunctionComponent } from 'react';
import { UserInfo } from '@molecules';
import { FullHeart } from '@atoms';
import { TweetType, UserType } from '@types';
import { Container, SubContainer, Span, Content } from './styled';

interface Props {
  user: UserType;
  tweet: TweetType;
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
          <Span> liked your Tweet!</Span>
        </Container>
        <Content>{tweet.content}</Content>
      </SubContainer>
    </Container>
  );
};

export default HeartContainer;
