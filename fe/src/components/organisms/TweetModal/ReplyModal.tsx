/* eslint-disable camelcase */
import React, { FunctionComponent } from 'react';
import { useMutation } from '@apollo/client';
import Markdown from 'react-markdown/with-html';
import { Modal, TitleSubText } from '@molecules';
import { NewTweetContainer, MainContainer } from '@organisms';
import { ADD_REPLY_TWEET } from '@graphql/tweet';
import { TweetType } from '@types';

interface Props {
  displayModal: boolean;
  onClickCloseBtn: () => void;
  tweet: TweetType;
}

const TweetReplyModal: FunctionComponent<Props> = ({ displayModal, onClickCloseBtn, tweet }) => {
  const [addReplyTweet, { loading: mutationLoading, error: mutationError }] = useMutation(
    ADD_REPLY_TWEET,
  );
  return (
    <Modal displayModal={displayModal} onClickCloseBtn={onClickCloseBtn}>
      <MainContainer userId={tweet.author.user_id} ProfileImgUrl={tweet.author.profile_img_url}>
        <TitleSubText title={tweet.author.name} sub={tweet.author.user_id} />
        <Markdown allowDangerousHtml>{tweet.content}</Markdown>
      </MainContainer>
      <NewTweetContainer onClickQuery={addReplyTweet} parentId={tweet._id} />
    </Modal>
  );
};

export default TweetReplyModal;
