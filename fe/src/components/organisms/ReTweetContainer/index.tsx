import React, { FunctionComponent, ReactElement, useState } from 'react';
import Link from 'next/link';
import Markdown from 'react-markdown/with-html';
import MainContaier from '../MainContainer';
import TitleSubText from '../../molecules/TitleSubText';
import Button from '../../molecules/Button';
import { Heart, Comment, Retweet } from '../../atoms/Icons';
import ProfileImg from '../../atoms/ProfileImg';
import useHeartState from '../../../hooks/useHeartState';
import { RetweetBox, ButtonsBox, BodyContainer, HeaderContainer, PinkButton } from './styled';

interface Props {
  tweet: Tweet;
}

interface Tweet {
  _id: string;
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
  const [isHeart, onClickHeart, onClickUnheart] = useHeartState(tweet);

  return (
    <MainContaier userId={tweet.author.user_id} ProfileImgUrl={tweet.author.profile_img_url}>
      <Link href={`/${tweet.author.user_id}`}>
        <a>
          <TitleSubText title={tweet.author.name} sub={tweet.author.user_id} />
        </a>
      </Link>
      <Link href={`/status/${tweet._id}`}>
        <a>
          <Markdown allowDangerousHtml>{tweet.content}</Markdown>
        </a>
      </Link>
      <RetweetBox>
        <Link href={`/status/${tweet.retweet._id}`}>
          <a>
            <HeaderContainer>
              <ProfileImg img={tweet.author.profile_img_url} size={30} />
              <TitleSubText title={tweet.retweet.author.name} sub={tweet.retweet.author.user_id} />
            </HeaderContainer>
            <BodyContainer>
              <Markdown allowDangerousHtml>{tweet.retweet.content}</Markdown>
            </BodyContainer>
          </a>
        </Link>
      </RetweetBox>
      <ButtonsBox component="div">
        <Button icon={Comment({})} text={tweet.child_tweet_number} />
        <Button icon={Retweet({})} text={tweet.retweet_user_number} />
        {isHeart ? (
          <PinkButton icon={Heart({})} text={tweet.heart_user_number} onClick={onClickUnheart} />
        ) : (
          <Button icon={Heart({})} text={tweet.heart_user_number} onClick={onClickHeart} />
        )}
      </ButtonsBox>
    </MainContaier>
  );
};
export default ReTweetContainer;
