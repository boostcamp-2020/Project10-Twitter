import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import Markdown from 'react-markdown/with-html';
import { ApolloCache, useMutation } from '@apollo/client';
import { IconButton, Button, UploadImg } from '@molecules';
import { useHeartState, useDisplay, useUserState } from '@hooks';
import { DocumentNode } from 'graphql';
import { Text, Heart, Comment, Retweet, X, FullHeart } from '@atoms';
import { makeTimeText } from '@libs';
import { RetweetContainer, ReplyModal, RetweetModal, MainContainer } from '@organisms';
import { DELETE_TWEET } from '@graphql/tweet';
import { TweetType } from '@types';
import { ButtonsBox, PinkButton, TweetHeaderContainer, HeaderInfoContainer } from './styled';

interface Props {
  tweet: TweetType;
  updateQuery: { query: DocumentNode; variables?: {} };
}

const TweetContainer: FunctionComponent<Props> = ({ tweet, updateQuery }) => {
  const [isHeart, onClickHeart, onClickUnheart] = useHeartState(tweet, updateQuery);
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
      const tweetCache = cache.readQuery<{ tweetList: TweetType[] }>({ query: updateQuery.query });
      if (tweetCache) {
        cache.writeQuery({
          query: updateQuery.query,
          data: { tweetList: tweetCache.tweetList.filter((b) => b._id !== tweet._id) },
        });
      }
    }
  };

  return (
    <>
      <MainContainer userId={tweet.author.user_id} ProfileImgUrl={tweet.author.profile_img_url}>
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
        {tweet.retweet?._id ? <RetweetContainer tweet={tweet.retweet} /> : <></>}
        {tweet.img_url_list && tweet.img_url_list[0] ? (
          <UploadImg img={tweet.img_url_list[0]} />
        ) : (
          ''
        )}
        <ButtonsBox component="div">
          <Button icon={Comment({})} text={tweet.child_tweet_number} onClick={onClickReplyBtn} />
          <Button icon={Retweet({})} text={tweet.retweet_user_number} onClick={onClickRetweetBtn} />
          {isHeart ? (
            <Button icon={FullHeart({})} text={tweet.heart_user_number} onClick={onClickUnheart} />
          ) : (
            <Button icon={Heart({})} text={tweet.heart_user_number} onClick={onClickHeart} />
          )}
        </ButtonsBox>
      </MainContainer>
      <ReplyModal
        displayModal={displayReplyModal}
        onClickCloseBtn={onClickReplyBtn}
        updateQuery={updateQuery}
        tweet={tweet}
      />
      <RetweetModal
        displayModal={displayRetweetModal}
        onClickCloseBtn={onClickRetweetBtn}
        updateQuery={updateQuery}
        tweet={tweet}
      />
    </>
  );
};
export default TweetContainer;
