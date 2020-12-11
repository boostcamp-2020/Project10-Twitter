import React, { FunctionComponent, ReactElement, useState } from 'react';
import Link from 'next/link';
import Markdown from 'react-markdown/with-html';
import { ApolloCache, useMutation } from '@apollo/client';
import { DocumentNode } from 'graphql';
import MainContaier from '../MainContainer';
import Text from '../../atoms/Text';
import IconButton from '../../molecules/IconButton';
import Button from '../../molecules/Button';
import { Heart, Comment, Retweet, X } from '../../atoms/Icons';
import { ButtonsBox, PinkButton, TweetHeaderContainer, HeaderInfoContainer } from './styled';
import useHeartState from '../../../hooks/useHeartState';
import { ReplyModal, RetweetModal } from '../TweetModal';
import useDisplay from '../../../hooks/useDisplay';
import ReTweetContainer from '../ReTweetContainer';
import UploadImg from '../../molecules/UploadImg';
import useUserState from '../../../hooks/useUserState';
import DELETE_TWEET from '../../../graphql/deleteTweet.gql';
import { makeTimeText } from '../../../libs/utility';

interface Props {
  tweet: Tweet;
  updateQuery: DocumentNode;
}

interface Tweet {
  _id: string;
  content: string;
  img_url_list: [string];
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
  author: Author;
  retweet: Tweet;
  createAt: string;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
  following_id_list: string[];
}

const TweetContainer: FunctionComponent<Props> = ({ tweet, updateQuery }) => {
  const [isHeart, onClickHeart, onClickUnheart] = useHeartState(tweet);
  const [userState] = useUserState(tweet.author);
  const [displayReplyModal, , onClickReplyBtn] = useDisplay(false);
  const [displayRetweetModal, , onClickRetweetBtn] = useDisplay(false);
  const [deleteTweet] = useMutation(DELETE_TWEET);

  const onClickDeleteBtn = async () => {
    await deleteTweet({
      variables: { tweetId: tweet._id },
      update: (cache, { data }) => {
        cacheUpdate(cache, data);
      },
    });
  };

  const cacheUpdate = (cache: ApolloCache<any>, data: any) => {
    const { result } = data;
    if (result.response) {
      const tweetCache = cache.readQuery<{ tweetList: Tweet[] }>({ query: updateQuery });
      if (tweetCache) {
        cache.writeQuery({
          query: updateQuery,
          data: { tweetList: tweetCache.tweetList.filter((b) => b._id !== tweet._id) },
        });
      }
    }
  };

  return (
    <>
      <MainContaier userId={tweet.author.user_id} ProfileImgUrl={tweet.author.profile_img_url}>
        <TweetHeaderContainer>
          <HeaderInfoContainer>
            <Link href={`/${tweet.author.user_id}`}>
              <a>
                <Text styled="title" size="15px" value={tweet.author.name} />
                <Text styled="sub" size="15px" value={tweet.author.user_id} />
                <Text styled="sub" size="11px" value={makeTimeText(tweet.createAt)} />
              </a>
            </Link>
          </HeaderInfoContainer>
          {userState === 'me' ? <IconButton icon={X} onClick={onClickDeleteBtn} /> : <></>}
        </TweetHeaderContainer>
        <Link href={`/status/${tweet._id}`}>
          <a>
            <Markdown allowDangerousHtml>{tweet.content}</Markdown>
          </a>
        </Link>
        {tweet.retweet?._id ? <ReTweetContainer tweet={tweet.retweet} /> : <></>}
        {tweet.img_url_list && tweet.img_url_list[0] ? (
          <UploadImg img={tweet.img_url_list[0]} />
        ) : (
          ''
        )}
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
