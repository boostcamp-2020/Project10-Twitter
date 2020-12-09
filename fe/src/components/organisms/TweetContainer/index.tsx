import React, { FunctionComponent, ReactElement, useState } from 'react';
import Link from 'next/link';
import Markdown from 'react-markdown/with-html';
import MainContaier from '../MainContainer';
import TitleSubText from '../../molecules/TitleSubText';
import Button from '../../molecules/Button';
import { Heart, Comment, Retweet } from '../../atoms/Icons';
import { ButtonsBox, PinkButton } from './styled';
import useHeartState from '../../../hooks/useHeartState';
import { ReplyModal, RetweetModal } from '../TweetModal';
import useDisplay from '../../../hooks/useDisplay';
import ReTweetContainer from '../ReTweetContainer';

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

const TweetContainer: FunctionComponent<Props> = ({ tweet }) => {
  const [isHeart, onClickHeart, onClickUnheart] = useHeartState(tweet);
  const [displayReplyModal, , onClickReplyBtn] = useDisplay(false);
  const [displayRetweetModal, , onClickRetweetBtn] = useDisplay(false);

  return (
    <>
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
        {tweet.retweet?._id ? <ReTweetContainer tweet={tweet.retweet} /> : <></>}
        <ButtonsBox component="div">
          <Button icon={Comment({})} text={tweet.child_tweet_number} onClick={onClickReplyBtn} />
          <Button icon={Retweet({})} text={tweet.retweet_user_number} onClick={onClickRetweetBtn} />
          {isHeart ? (
            <PinkButton icon={Heart({})} text={tweet.heart_user_number} onClick={onClickUnheart} />
          ) : (
            <Button icon={Heart({})} text={tweet.heart_user_number} onClick={onClickHeart} />
          )}
        </ButtonsBox>
      </MainContaier>
      <ReplyModal
        displayModal={displayReplyModal}
        onClickCloseBtn={onClickReplyBtn}
        tweet={tweet}
      />
      <RetweetModal
        displayModal={displayRetweetModal}
        onClickCloseBtn={onClickRetweetBtn}
        tweet={tweet}
      />
    </>
  );
};
export default TweetContainer;
