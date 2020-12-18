import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Markdown from 'react-markdown/with-html';
import { useQuery, useMutation } from '@apollo/client';
import { TitleSubText, IconButton, ComponentLoading, UserInfo, UploadImg } from '@molecules';
import { Text, Heart, Comment, Retweet, X, FullHeart } from '@atoms';
import { useHeartState, useDisplay, useDisplayWithShallow, useUserState } from '@hooks';
import { makeTimeText } from '@libs';
import {
  HeartListModal,
  RetweetListModal,
  ReplyModal,
  RetweetModal,
  RetweetContainer,
} from '@organisms';
import { DELETE_TWEET, GET_CHILD_TWEETLIST, GET_TWEET_DETAIL } from '@graphql/tweet';
import { QueryVariableType } from '@types';
import {
  DetailContainer,
  TweetHeaderContainer,
  TimeContainer,
  TweetDetailInfoContainer,
  ButtonsContainer,
  PinkIconButton,
} from './styled';

interface Props {
  tweetId: string;
}

const TweetDetailContainer: FunctionComponent<Props> = ({ tweetId }) => {
  const router = useRouter();
  const queryVariable: QueryVariableType = { variables: { tweetId: tweetId as string } };
  const { loading, error, data } = useQuery(GET_TWEET_DETAIL, queryVariable);
  const replyQuery = { query: GET_CHILD_TWEETLIST, variables: { tweetId }, object: true };
  const retweetQuery = { query: GET_TWEET_DETAIL, variables: { tweetId }, object: true };
  const [isHeart, onClickHeart, onClickUnheart] = useHeartState(data?.tweetList, {
    ...retweetQuery,
  });
  const [userState] = useUserState(data?.tweetList.author);
  const [displayReplyModal, , onClickReplyBtn] = useDisplay(false);
  const [displayRetweetModal, , onClickRetweetBtn] = useDisplay(false);
  const [displayHeartListModal, onOpenHeartList, onCloseHeartList] = useDisplayWithShallow('likes');
  const [displayRetweetListModal, onOpenRetweetList, onCloseRetweetList] = useDisplayWithShallow(
    'retweets',
  );
  const [deleteTweet] = useMutation(DELETE_TWEET);

  const onClickDeleteBtn = async () => {
    await deleteTweet({
      variables: { tweetId: tweet._id },
    });
    router.push('/');
  };

  if (loading) return <ComponentLoading />;
  if (error)
    return (
      <div>
        Error!
        {error.message}
      </div>
    );

  const { tweetList: tweet } = data;

  return (
    <>
      <DetailContainer>
        <TweetHeaderContainer>
          <Link href={`/${tweet.author.user_id}`}>
            <UserInfo
              img={tweet.author.profile_img_url}
              title={tweet.author.name}
              sub={tweet.author.user_id}
            />
          </Link>
          {userState === 'me' ? <IconButton icon={X} onClick={onClickDeleteBtn} /> : <></>}
        </TweetHeaderContainer>
        <Markdown allowDangerousHtml>{tweet.content}</Markdown>
        {tweet.retweet?._id ? <RetweetContainer tweet={tweet.retweet} /> : <></>}
        {tweet.img_url_list && tweet.img_url_list[0] ? (
          <UploadImg img={tweet.img_url_list[0]} />
        ) : (
          ''
        )}
        <TimeContainer>
          <Text styled="sub" size="15px" value={makeTimeText(tweet.createAt)} />
        </TimeContainer>
        <TweetDetailInfoContainer>
          {tweet.retweet_user_number > 0 ? (
            <TitleSubText
              title={tweet.retweet_user_number}
              sub="Retweets"
              onClick={onOpenRetweetList}
            />
          ) : (
            <></>
          )}
          {tweet.heart_user_number > 0 ? (
            <TitleSubText title={tweet.heart_user_number} sub="Likes" onClick={onOpenHeartList} />
          ) : (
            <></>
          )}
          {tweet.retweet_user_number <= 0 && tweet.retweet_user_number <= 0 ? (
            <Text value="View Tweet Activity" styled="sub" />
          ) : (
            <></>
          )}
        </TweetDetailInfoContainer>
        <ButtonsContainer>
          <IconButton icon={Comment} onClick={onClickReplyBtn} />
          <IconButton icon={Retweet} onClick={onClickRetweetBtn} />
          {isHeart ? (
            <IconButton icon={FullHeart} onClick={onClickUnheart} />
          ) : (
            <IconButton icon={Heart} onClick={onClickHeart} />
          )}
        </ButtonsContainer>
      </DetailContainer>
      <ReplyModal
        displayModal={displayReplyModal}
        onClickCloseBtn={onClickReplyBtn}
        updateQuery={replyQuery}
        tweet={tweet}
      />
      <RetweetModal
        displayModal={displayRetweetModal}
        onClickCloseBtn={onClickRetweetBtn}
        updateQuery={retweetQuery}
        tweet={tweet}
      />
      <HeartListModal
        displayModal={displayHeartListModal}
        onClickCloseBtn={onCloseHeartList}
        tweetId={tweet._id}
      />
      <RetweetListModal
        displayModal={displayRetweetListModal}
        onClickCloseBtn={onCloseRetweetList}
        tweetId={tweet._id}
      />
    </>
  );
};

export default TweetDetailContainer;
