/* eslint-disable camelcase */
import React, { FunctionComponent } from 'react';
import { useMutation } from '@apollo/client';
import { Modal } from '@molecules';
import { NewTweetContainer } from '@organisms';
import { ADD_RETWEET } from '@graphql/tweet';

interface Props {
  displayModal: boolean;
  onClickCloseBtn: () => void;
  tweet: Tweet;
}

interface Tweet {
  _id: string;
  content: string;
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
  author: Author;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
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
