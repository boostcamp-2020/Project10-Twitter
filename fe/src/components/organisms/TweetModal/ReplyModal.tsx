/* eslint-disable camelcase */
import React, { FunctionComponent } from 'react';
import { useMutation } from '@apollo/client';
import Markdown from 'react-markdown/with-html';
import Modal from '../../molecules/Modal';
import NewTweetContainer from '../NewTweetContainer';
import TitleSubText from '../../molecules/TitleSubText';
import MainContainer from '../MainContainer';
import ADD_REPLY_TWEET from '../../../graphql/addReplyTweet.gql';

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
