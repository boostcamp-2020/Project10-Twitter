import React, { FunctionComponent, useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import useHeartState from '../../../hooks/useHeartState';
import TitleSubText from '../../molecules/TitleSubText';
import IconButton from '../../molecules/IconButton';
import Markdown from 'react-markdown/with-html';
import {
  DetailContainer,
  TweetDetailInfoContainer,
  ButtonsContainer,
  PinkIconButton,
} from './styled';
import { Heart, Comment, Retweet } from '../../atoms/Icons';
import GET_TWEET_DETAIL from '../../../graphql/getTweetDetail.gql';
import UserInfo from '../../molecules/UserInfo';

interface Props {
  tweetId: string;
}

interface QueryVariable {
  variables: Variable;
}

interface Variable {
  tweetId: string;
}

const UserDetailContainer: FunctionComponent<Props> = ({ children, tweetId }) => {
  const queryVariable: QueryVariable = { variables: { tweetId: tweetId as string } };
  const { loading, error, data } = useQuery(GET_TWEET_DETAIL, queryVariable);
  const [isHeart, onClickHeart, onClickUnheart] = useHeartState(data?.tweet);

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
        <Link href={`/status/${tweetId}/retweets`}>
          <a>
            <TitleSubText title={tweet.retweet_user_number} sub={'Retweets'} />
          </a>
        </Link>
        <Link href={`/status/${tweetId}/likes`}>
          <a>
            <TitleSubText title={tweet.heart_user_number} sub={'Likes'} />
          </a>
        </Link>
      </TweetDetailInfoContainer>
      <ButtonsContainer>
        <IconButton icon={Comment} />
        <IconButton icon={Retweet} />
        {isHeart ? (
          <PinkIconButton icon={Heart} onClick={onClickUnheart} />
        ) : (
          <IconButton icon={Heart} onClick={onClickHeart} />
        )}
      </ButtonsContainer>
    </DetailContainer>
  );
};

export default UserDetailContainer;
