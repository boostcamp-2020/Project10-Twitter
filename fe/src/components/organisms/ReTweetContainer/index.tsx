/* eslint-disable camelcase */
import React, { FunctionComponent, ReactElement, useState } from 'react';
import Markdown from 'react-markdown/with-html';
import MainContaier from '../MainContainer';
import TitleSubText from '../../molecules/TitleSubText';
import Button from '../../molecules/Button';
import { Heart, Comment, Retweet } from '../../atoms/Icons';
import ProfileImg from '../../atoms/ProfileImg';
import { RetweetBox, ButtonsBox, BodyContainer, HeaderContainer } from './styled';

interface Props {
  tweet: Tweet;
}

interface Tweet {
  content: string;
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
  author: Author;
  retweet: Tweet;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const ReTweetContainer: FunctionComponent<Props> = ({ tweet }) => {
  return (
    <MainContaier ProfileImgUrl={tweet.author.profile_img_url}>
      <TitleSubText title={tweet.author.name} sub={tweet.author.user_id} />
      <Markdown allowDangerousHtml>{tweet.content}</Markdown>
      <RetweetBox>
        <HeaderContainer>
          <ProfileImg img={tweet.author.profile_img_url} size={30} />
          <TitleSubText title={tweet.retweet.author.name} sub={tweet.retweet.author.user_id} />
        </HeaderContainer>
        <BodyContainer>
          <Markdown allowDangerousHtml>{tweet.retweet.content}</Markdown>
        </BodyContainer>
      </RetweetBox>
      <ButtonsBox component="div">
        <Button icon={Comment({})} text={tweet.child_tweet_number} />
        <Button icon={Retweet({})} text={tweet.retweet_user_number} />
        <Button icon={Heart({})} text={tweet.heart_user_number} />
      </ButtonsBox>
    </MainContaier>
  );
};
export default ReTweetContainer;
