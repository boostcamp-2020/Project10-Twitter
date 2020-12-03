/* eslint-disable camelcase */
import React, { FunctionComponent, ReactElement, useState } from 'react';
import Markdown from 'react-markdown/with-html';
import MainContaier from '../MainContainer';
import TitleSubText from '../../molecules/TitleSubText';
import Button from '../../molecules/Button';
import { Heart, Comment, Retweet } from '../../atoms/Icons';
import ButtonsBox from './styled';

interface Props {
  tweet: Tweet;
}

interface Tweet {
  content: string;
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
  author: Author;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const TweetContainer: FunctionComponent<Props> = ({ tweet }) => {
  return (
    <MainContaier ProfileImgUrl={tweet.author.profile_img_url}>
      <TitleSubText title={tweet.author.name} sub={tweet.author.user_id} />
      <Markdown allowDangerousHtml>{tweet.content}</Markdown>
      <ButtonsBox component="div">
        <Button icon={Comment({})} text={tweet.child_tweet_number} />
        <Button icon={Retweet({})} text={tweet.retweet_user_number} />
        <Button icon={Heart({})} text={tweet.heart_user_number} />
      </ButtonsBox>
    </MainContaier>
  );
};
export default TweetContainer;
