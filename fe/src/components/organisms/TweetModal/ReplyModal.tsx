/* eslint-disable camelcase */
import React, { FunctionComponent } from 'react';
import Modal from '../../molecules/Modal';
import NewTweetContainer from '../NewTweetContainer';
import TweetContainer from '../TweetContainer';

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

const TweetModal: FunctionComponent<Props> = ({ displayModal, onClickCloseBtn, tweet }) => (
  <Modal displayModal={displayModal} onClickCloseBtn={onClickCloseBtn}>
    <TweetContainer tweet={tweet} />
    <NewTweetContainer />
  </Modal>
);

export default TweetModal;
