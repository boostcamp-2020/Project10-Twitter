/* eslint-disable camelcase */
import React, { FunctionComponent } from 'react';
import { useMutation } from '@apollo/client';
import { Modal } from '@molecules';
import { NewTweetContainer } from '@organisms';
import { ADD_RETWEET } from '@graphql/tweet';
import { TweetType } from '@types';

interface Props {
  displayModal: boolean;
  onClickCloseBtn: () => void;
  tweet: TweetType;
}

const RetweetModal: FunctionComponent<Props> = ({ displayModal, onClickCloseBtn, tweet }) => {
  const [addRetweet, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_RETWEET);
  return (
    <Modal displayModal={displayModal} onClickCloseBtn={onClickCloseBtn}>
      <NewTweetContainer tweet={tweet} onClickQuery={addRetweet} />
    </Modal>
  );
};

export default RetweetModal;
