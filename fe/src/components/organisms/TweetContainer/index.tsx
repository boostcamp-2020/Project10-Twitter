/* eslint-disable camelcase */
import React, { FunctionComponent, ReactElement, useState } from 'react';
import Markdown from 'react-markdown';
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
      <TitleSubText title={tweet.author.user_id} sub={tweet.author.name} />
      <Markdown source={tweet.content} />
      <ButtonsBox component="div">
        <Button icon={Comment({})} text="0" />
        <Button icon={Retweet({})} text="0" />
        <Button icon={Heart({})} text="0" />
      </ButtonsBox>
    </MainContaier>
  );
};
export default TweetContainer;
