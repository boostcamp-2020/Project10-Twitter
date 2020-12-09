import React, { FunctionComponent, useState, useEffect } from 'react';
import Link from 'next/link';
import Markdown from 'react-markdown/with-html';
import { useQuery } from '@apollo/client';
import useHeartState from '../../../hooks/useHeartState';
import TitleSubText from '../../molecules/TitleSubText';
import IconButton from '../../molecules/IconButton';
import {
  DetailContainer,
  TweetDetailInfoContainer,
  ButtonsContainer,
  PinkIconButton,
} from './styled';
import { Heart, Comment, Retweet } from '../../atoms/Icons';
import GET_TWEET_DETAIL from '../../../graphql/getTweetDetail.gql';
import UserInfo from '../../molecules/UserInfo';
import useDisplay from '../../../hooks/useDisplay';
import { HeartListModal, RetweetListModal, ReplyModal, RetweetModal } from '../TweetModal';
import Text from '../../atoms/Text';

interface Props {
  tweetId: string;
}

interface QueryVariable {
  variables: Variable;
}

interface Variable {
  tweetId: string;
}

const TweetDetailContainer: FunctionComponent<Props> = ({ children, tweetId }) => {
  const queryVariable: QueryVariable = { variables: { tweetId: tweetId as string } };
  const { loading, error, data } = useQuery(GET_TWEET_DETAIL, queryVariable);
  const [isHeart, onClickHeart, onClickUnheart] = useHeartState(data?.tweet);
  const [displayReplyModal, , onClickReplyBtn] = useDisplay(false);
  const [displayRetweetModal, , onClickRetweetBtn] = useDisplay(false);
  const [displayHeartListModal, , onClickHeartList] = useDisplay(false);
  const [displayRetweetListModal, , onClickRetweetList] = useDisplay(false);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error!
        {error.message}
      </div>
    );

  const { tweet } = data;

  return (
    <>
      <DetailContainer>
        <Link href={`/${tweet.author.user_id}`}>
          <UserInfo
            img={tweet.author.profile_img_url}
            title={tweet.author.name}
            sub={tweet.author.user_id}
          />
        </Link>
        <Markdown allowDangerousHtml>{tweet.content}</Markdown>
        <TweetDetailInfoContainer>
          {/* <Link href={`/status/${tweetId}/retweets`}>
            <a>
              <TitleSubText title={tweet.retweet_user_number} sub="Retweets" />
            </a>
          </Link>
          <Link href={`/status/${tweetId}/likes`}>
            <a>
              <TitleSubText title={tweet.heart_user_number} sub="Likes" />
            </a>
          </Link> */}
          {tweet.retweet_user_number > 0 ? (
            <TitleSubText
              title={tweet.retweet_user_number}
              sub="Retweets"
              onClick={onClickRetweetList}
            />
          ) : (
            <></>
          )}
          {tweet.heart_user_number > 0 ? (
            <TitleSubText title={tweet.heart_user_number} sub="Likes" onClick={onClickHeartList} />
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
            <PinkIconButton icon={Heart} onClick={onClickUnheart} />
          ) : (
            <IconButton icon={Heart} onClick={onClickHeart} />
          )}
        </ButtonsContainer>
      </DetailContainer>
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
      <HeartListModal
        displayModal={displayHeartListModal}
        onClickCloseBtn={onClickHeartList}
        tweetId={tweet._id}
      />
      <RetweetListModal
        displayModal={displayRetweetListModal}
        onClickCloseBtn={onClickRetweetList}
        tweetId={tweet._id}
      />
    </>
  );
};

export default TweetDetailContainer;
